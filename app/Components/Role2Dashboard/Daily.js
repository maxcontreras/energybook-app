import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {SecondDaily} from './index';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import {Load} from '../../Components/Global/index';
import {connect} from 'react-redux';
import {getDailyReadings, getPrices} from '../../../Actions/Actions.js';
import Swiper from 'react-native-web-swiper';
import {isPortrait, swiperDaily} from '../../Assets/constants';
import {dailyData} from './data';

const mapStateToProps = state => ({
  readings: state.dailyReducer,
  meterId: state.dailyReducer.meterId,
  prices: state.costReducer,
  adminIds: state.adminReducer,
});

class Daily extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      swiper: false,
      url: '',
      dailyTCC: '',
      values: [],
      prices: [],
      readings: [],
      data: [],
      valueConsumo: '0 kWh',
      priceConsumo: '$00.00',
      valueDist: '0 kW',
      priceDist: '$00.00',
      valueCapacity: '0 kW',
      priceCapacity: '$00.00',
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        this.setState(
          {
            values: JSON.parse(value),
            readings: this.props.readings,
          },
          () => {
            fetch(
              `http://api.ienergybook.com/api/DesignatedMeters/?filter={"include":["services"],"where":{"company_id":"${
                this.props.companyId != ''
                  ? this.props.companyId
                  : this.state.values.companyId
              }"}}`,
              {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              },
            )
              .then(res => {
                this.state.statusCode = res.status;
                const data = res.json();
                return Promise.all([this.state.statusCode, data]);
              })
              .then(json => {
                this.props.dispatch(getDailyReadings(json));
                this.getData();
              })
              .catch(err => {});
          },
        );
      }
    } catch (error) {}
  };

  UNSAFE_componentWillMount() {
    this._retrieveData();
  }
  getData() {
    var newDate = `${moment()
      .startOf('month')
      .format('YYYY-MM-DD')}T00:00:00.000Z`;
    fetch(
      `http://api.ienergybook.com/api/AdminValues/findByDate?access_token=${
        this.state.values.accesToken
      }`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: newDate,
          division:
            this.props.Division != ''
              ? this.props.Division
              : this.state.values.Division,
        }),
      },
    )
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        console.log(json);
        this.props.dispatch(
          getPrices(
            this.state.values.tipoTarifa == 'GDMTH'
              ? json[1].cfeValue.GDMTH
              : json[1].cfeValue.GDMTO,
          ),
        );
        this.getDCP();
      })
      .catch(err => {
        console.log('no se pudo');
      });
  }
  getDCP() {
    this._storeData();
    fetch(
      `http://api.ienergybook.com/api/Meters/getConsumptionCostsByFilter?access_token=${
        this.state.values.accesToken
      }`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:
            this.props.adminMeterId != ''
              ? this.props.adminMeterId
              : this.props.meterId,
          device: '',
          service: 'Servicio 1',
          filter: 0,
          interval: 86400,
          customdates: null,
        }),
      },
    )
      .then(res => {
        let statusCode = res.status;
        const data = res.json();
        return Promise.all([statusCode, data]);
      })
      .then(json => {
        var response = 0.0;
        for (var i = 0; i < json[1].length; i++) {
          response += json[1][i].cost;
        }
        let data = dailyData(this.props.prices, this.props.readings, response);
        this.setState({
          swiper: true,
          data: data,
        });
      })
      .catch(err => {
        console.log('no se pudo');
        this.setState({swiper: true});
      });
  }
  _storeData = async () => {
    let datos = {
      meterId: this.props.meterId,
      devices: this.props.readings.devices,
    };
    try {
      await AsyncStorage.setItem('meterId', JSON.stringify(datos), () => {
        console.log(datos);
      });
    } catch (error) {}
  };
  render() {
    return (
      <View style={styles.container}>
        {!this.state.swiper && <Load />}
        {this.state.swiper && (
          <Swiper controlsProps={swiperDaily}>
            {this.state.data.map((datos, index) => (
              <SecondDaily
                key={index}
                title={datos.title}
                valuekwh={datos.valuekwh}
                valuePrice={datos.valuePrice}
                ultima={datos.ultima}
              />
            ))}
          </Swiper>
        )}
      </View>
    );
  }
}

export default connect(mapStateToProps)(Daily);
const styles = StyleSheet.create({
  container: {
    height: 170,
  },
  slideContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});
