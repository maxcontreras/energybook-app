import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native';
import {connect} from 'react-redux';
import {Card} from 'react-native-elements';
import {MonthCardTitle, MonthTextCard} from './index';
import {monthlyData, getJson} from '../../Assets/Functions/role2';
import {getEPEXP} from '../../Assets/Functions/record';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getCardWidth,
  isPortrait,
  screenHeight,
  screenWidth,
  date,
  n,
  mes,
} from '../../Assets/constants';
import moment from 'moment/min/moment-with-locales';
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
      monthlyData: [],
      meterId: '',
      values: [],
      indicator: true,
      data: [],
      EPexp: 0.0,
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  UNSAFE_componentWillMount() {
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
  getMeterId() {
    setTimeout(async () => {
      try {
        const value = await AsyncStorage.getItem('meterId');
        if (value !== null) {
          this.setState(
            {
              meterId: JSON.parse(value).meterId,
            },
            () => {
              this.epexp_value();
            },
          );
        }
      } catch (error) {}
    }, 1000);
  }
  epexp_value = async () => {
    this.setState({
      indicator: true,
    });
    try {
      const epexp = await getEPEXP(
        this.state.values.accesToken,
        this.state.meterId,
        'Servicio 1',
        moment()
          .startOf('month')
          .format(),
      );
      if (epexp != null) {
        this.setState(
          {
            EPexp: epexp,
          },
          () => {
            this.getData();
          },
        );
      } else {
        this.setState(
          {
            EPexp: 0.0,
          },
          () => {
            this.getData();
          },
        );
      }
    } catch (error) {}
  };

  getData = async () => {
    try {
      //Gets total consumption price for the month
      const data = await getJson(
        this.state.values.accesToken,
        this.state.meterId,
      );
      if (data != null) {
        this.setState(
          {
            monthlyTCC: data,
            indicator: false,
          },
          () => {
            setTimeout(() => {
              //Gets the array of data for the month card.
              this.setState({
                monthlyData: monthlyData(
                  this.props.prices,
                  this.props.readings,
                  this.state.monthlyTCC,
                  this.state.EPexp,
                ),
              });
            }, 1000);
          },
        );
      } else {
        this.setState(
          {
            monthlyTCC: 0,
            indicator: false,
          },
          () => {
            setTimeout(() => {
              //Gets the array of data for the month card.
              this.setState({
                monthlyData: monthlyData(
                  this.props.prices,
                  this.props.readings,
                  this.state.monthlyTCC,
                  this.state.EPexp,
                ),
              });
            }, 1000);
          },
        );
      }
    } catch (error) {}
  };

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
        {this.state.indicator && (
          <View style={[styles.loadCard, {width: width}]}>
            <Load />
          </View>
        )}
        {!this.state.indicator && (
          <Card
            title={<MonthCardTitle fecha={fecha} />}
            containerStyle={[styles.containerCard, {width: width}]}
            titleStyle={styles.titleStyle}
            wrapperStyle={{borderRadius: 10}}>
            <View style={styles.innerCard}>
              <View>
                {this.state.monthlyData.map((datos, index) => (
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
            </View>
          </Card>
        )}
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
  loadCard: {
    height: 320,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
});
