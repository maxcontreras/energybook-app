import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native';
import {connect} from 'react-redux';
import {Card} from 'react-native-elements';
import {MonthCardTitle, MonthTextCard} from './index';
import {monthlyData} from './data';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getCardWidth,
  isPortrait,
  screenHeight,
  screenWidth,
  headers,
  date,
  n,
  mes,
} from '../../Assets/constants';
import {Load} from '../Global';
const mapStateToProps = state => ({
  readings: state.dailyReducer,
  prices: state.costReducer,
  adminIds: state.adminReducer,
});
const cardWidth = getCardWidth(2.2);

class Monthly extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      url: '',
      monthlyTCC: 0,
      meterId: '',
      values: [],
      indicator: false,
      data: [],
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        this.setState(
          {
            values: JSON.parse(value),
          },
          () => {
            this.getMeterId();
          },
        );
      }
    } catch (error) {}
  };
  getMeterId = async () => {
    try {
      const value = await AsyncStorage.getItem('meterId');
      if (value !== null) {
        this.setState(
          {
            meterId: JSON.parse(value).meterId,
          },
          () => {
            this.getData();
          },
        );
      }
    } catch (error) {}
  };
  getData() {
    this.setState({indicator: true});

    fetch(
      `http://api.ienergybook.com/api/Meters/getConsumptionCostsByFilter?access_token=${
        this.state.values.accesToken
      }`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          id: this.state.meterId,
          device: '',
          service: 'Servicio 1',
          filter: 3,
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
        var jsonResponse = json[1];
        var response = 0.0;
        for (var i = 0; i < jsonResponse.length; i++) {
          response += jsonResponse[i].cost;
        }
        this.setState({
          monthlyTCC: response.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          indicator: false,
        });
      })
      .catch(err => {
        this.setState({
          monthlyTCC: 0,
        });
      });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  render() {
    var fecha = date + ' ' + n + ' ' + 'de' + ' ' + mes;
    let width =
      this.state.orientation == 'portrait'
        ? Math.min(screenWidth, screenHeight) - 20
        : cardWidth;

    return (
      <View
        style={[
          styles.container,
          this.state.orientation == 'landscape' ? styles.pLandscape : null,
        ]}>
        <Card
          title={<MonthCardTitle fecha={fecha} />}
          containerStyle={[styles.containerCard, {width: width}]}
          titleStyle={styles.titleStyle}
          wrapperStyle={{borderRadius: 10}}>
          <View style={styles.innerCard}>
            {this.state.indicator && this.state.monthlyTCC == 0 && <Load />}
            {!this.state.indicator && (
              <View>
                {monthlyData(
                  this.props.prices,
                  this.props.readings,
                  this.state.monthlyTCC,
                ).map((datos, index) => (
                  <MonthTextCard
                    key={index}
                    value={datos.value}
                    price={datos.price}
                    title={datos.title}
                    Icon={datos.Icon}
                    width={width}
                  />
                ))}
              </View>
            )}
          </View>
        </Card>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Monthly);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'normal',
    margin: 10,
    textAlign: 'right',
    height: 'auto',
    justifyContent: 'center',
  },
  containerCard: {
    height: 320,
    padding: 0,
    width: screenWidth - 20,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  innerCard: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 270,
    borderRadius: 10,
    paddingTop: 10,
  },
  pLandscape: {
    paddingBottom: 20,
  },
});
