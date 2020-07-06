import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import AsyncStorage from '@react-native-community/async-storage';
import {jsonChartData, returnArrayD} from '../../Assets/Functions/efficiency';
import {BottomCard, RowText, DailyDates} from './index';
import {isPortrait, screenHeight, screenWidth} from '../../Assets/constants';
const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  adminIds: state.adminReducer,
  prices: state.costReducer,
});
const zeroVal = '0.0 kWh';
const zeroPrice = '$00.00';
const zeroValD = '0.0 kW';

class CardChida extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      isProd: false,
      isDP: false,
      isEPIMP: false,
      error: false,
      inputProduccion: 0,
      valorProduccion: '0',
      totalConsumo: zeroPrice,
      totalDemanda: zeroPrice,
      readingConsumo: zeroVal,
      readingDemanda: zeroValD,
      arrayPicker: [],
      filter: -1,
      interval: 3600,
      customdates: {
        from: `${moment().format('YYYY-MM-DD')}`,
        until: `${moment().format('YYYY-MM-DD')}`,
      },
      values: [],
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
            if (this.props.type == 'diario') {
              this.allDayFunctions();
            }
          },
        );
      }
    } catch (error) {}
  };
  allDayFunctions() {
    this.setState(
      {
        customdates: {
          from: `${this.props.fecha.from}`,
          until: `${this.props.fecha.until}`,
        },
        //All flags to false
        isDP: false,
        isEPIMP: false,
        isProd: false,
      },
      () => {
        this.getChartData();
        this.mostrarProduction();
      },
    );
  }
  getChartData = async () => {
    this.setState({
      totalConsumo: 0,
      readingConsumo: 0,
    });
    try {
      //Gets chart data and consumption values
      const data = await jsonChartData(
        this.state.values.accesToken,
        {
          id:
            this.props.adminIds.meter_id != ''
              ? this.props.adminIds.meter_id
              : this.props.readings.meterId,
          device: '',
          service: 'Servicio 1',
          filter: this.state.filter,
          interval: this.state.interval,
          custom_dates: this.state.customdates,
        },
        'diaria',
      );
      if (data != null) {
        this.setState({
          readingConsumo: data.readingConsumo,
          isEPimp: data.isEPimp,
          totalConsumo: data.totalConsumo,
          totalDemanda: data.totalDemanda,
          readingDemanda: data.readingDemanda,
          isDP: data.isDP,
        });
      } else {
        this.setState({
          totalConsumo: zeroPrice,
          readingConsumo: zeroVal,
          isEPIMP: true,
          readingDemanda: zeroValD,
          isDP: true,
        });
      }
    } catch (error) {}
  };
  changeInput(text) {
    //Changes inputProduction (controlled by DayInput.js)
    this.setState({
      inputProduccion: text,
    });
  }
  mostrarProduction() {
    //For daily production
    //Shows production after the user saves it.
    //Triggered by button (Bottom Card.js).
    this.setState({
      isProd: false,
    });
    //Checks if there is an existing value for the day.
    fetch(
      `http://api.ienergybook.com/api/eficiencia?access_token=${
        this.state.values.accesToken
      }`,
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
        console.log('AQUI LOS VALORES');
        console.log(json);

        let value = 0;
        for (i in json[1]) {
          //If there is a matching day and user Id
          if (
            json[1][i].UserId == this.state.values.userId &&
            json[1][i].Dia == this.props.fecha.from
          ) {
            //Set Production value in state.
            value = json[1][i].valor;
          }
        }
        this.setState({
          valorProduccion: value,
          isProd: true,
          //formula1: this.props.data.readingEPimp / datos.data[j].valor,
        });
      })
      .catch(err => {
        console.log('no se pudo');
        this.setState({
          isProd: true,
        });
      });
  }

  render() {
    let dataDiaria = returnArrayD({
      readingConsumo: this.state.readingConsumo,
      totalConsumo: this.state.totalConsumo,
      readingDemanda: this.state.readingDemanda,
      totalDemanda: this.state.totalDemanda,
    });
    return (
      <View style={styles.extrenalView}>
        <Card
          title={
            <DailyDates
              data={this.props.data}
              date={this.props.fecha.from}
              setDayDates={this.props.setDayDates}
              dayFunctions={this._retrieveData.bind(this)}
            />
          }
          containerStyle={[styles.containerCard]}
          titleStyle={styles.titleStyle}
          wrapperStyle={styles.wrapperStyle}>
          <View style={styles.innerView}>
            {this.state.isProd && (
              <View style={styles.innerView}>
                <RowText
                  data={dataDiaria}
                  type={this.props.type}
                  dayProduction={this.state.inputProduccion}
                  valueDayProd={this.state.valorProduccion}
                  changeInput={this.changeInput.bind(this)}
                  showDayProd={this.mostrarProduction.bind(this)}
                />
                <BottomCard
                  type={this.props.type}
                  inputProduccion={this.state.inputProduccion}
                  date={this.props.fecha.from}
                  userId={this.state.values.userId}
                  accesToken={this.state.values.accesToken}
                  showDayProd={this.mostrarProduction.bind(this)}
                />
              </View>
            )}
          </View>
        </Card>
      </View>
    );
  }
}
export default connect(mapStateToProps)(CardChida);
const styles = StyleSheet.create({
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
    height: 350,
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
    width: Math.min(screenWidth, screenHeight) - 20,
  },
  titleView: {
    color: 'black',
  },
  extrenalView: {
    flex: 1,
    width: '100%',
    height: 400,
    alignItems: 'center',
  },
  innerView: {
    flex: 1,
    paddingBottom: 10,
  },
  wrapperStyle: {
    borderRadius: 10,
    flex: 1,
  },
});
