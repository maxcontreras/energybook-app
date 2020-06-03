import React, {Component, PropTypes} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import {jsonChartData, jsonDP} from '../../Components/Efficiency/Data';
import {alert} from '../../Assets/Functions/setAlert';
import {
  isPortrait,
  screenHeight,
  screenWidth,
  mes,
} from '../../Assets/constants';
import {
  ChartView,
  MonthSelector,
  SwiperView,
} from '../../Components/Efficiency/index';
const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  adminIds: state.adminReducer,
  prices: state.costReducer,
});
const zeroVal = '0.0 kWh';
const zeroValD = '0.0 kWh';
const zeroPrice = '$00.00';
class Efficiency2 extends Component {
  constructor(props) {
    isPortrait();
    super(props);
    this.state = {
      isConsumption: false,
      isDP: false,
      isEPimp: false,
      isProd: false,
      monthCalendar: false,
      mesesito: mes,
      añito: moment().format('YYYY'),
      mesNum: moment().format('MM'),
      dayFecha: {
        from: `${moment().format('YYYY-MM-DD')}`,
        until: `${moment().format('YYYY-MM-DD')}`,
      },
      newDate: moment()
        .startOf('month')
        .format('YYYY-MM-DD'),
      newdateEnd: moment()
        .endOf('month')
        .format('YYYY-MM-DD'),
      indicator: false,
      indicatorCards: false,
      error: false,
      dataSource: [],
      totalConsumo: zeroPrice,
      totalDemanda: zeroPrice,
      readingConsumo: zeroVal,
      readingDemanda: zeroValD,
      inputProduccion: '0',
      valorProduccion: '0',
      filter: -1,
      interval: 3600,
      customdates: {
        from: `${moment()
          .startOf('month')
          .format('YYYY-MM-DD')}`,
        until: `${moment()
          .endOf('month')
          .format('YYYY-MM-DD')}`,
      },
      values: [],
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    this._retrieveData();
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
    this.setMonthCalendar = this.setMonthCalendar.bind(this);
    this.setDayDates = this.setDayDates.bind(this);
  }
  allFunctions() {
    this.setState({
      isConsumption: false,
      isDP: false,
      isEPimp: false,
      isProd: false,
    });
    this.getChartData();
    this.getDP();
    this.recieveMensualProd();
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
            this.allFunctions();
          },
        );
      }
    } catch (error) {}
  };
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  setDayDates(custom, dayfecha, mesesito, año, mesnum) {
    this.setState(
      {
        customdates: custom,
        dayFecha: dayfecha,
        mesesito: mesesito,
        añito: año,
        mesNum: mesnum,
      },
      () => {
        this.allFunctions();
      },
    );
  }
  getChartData() {
    this.setState({
      indicator: true,
      indicatorCards: true,
      error: false,
      monthCalendar: false,
      totalConsumo: zeroPrice,
      readingConsumo: 0,
    });
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
            this.props.adminIds.meter_id != ''
              ? this.props.adminIds.meter_id
              : this.props.readings.meterId,
          device: '',
          service: 'Servicio 1',
          filter: this.state.filter,
          interval: this.state.interval,
          custom_dates: this.state.customdates,
        }),
      },
    )
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        let data = jsonChartData(json[1]);
        console.log(json);
        if (json[0] != 200) {
          alert('Hubo un error al obtener los datos del medidor.');
          this.setState({
            indicator: false,
            error: true,
            totalConsumo: zeroPrice,
            isConsumption: true,
            readingConsumo: zeroVal,
            isEPimp: true,
          });
        }
        this.setState({
          isConsumption: true,
          error: false,
          readingConsumo: `${data.finalConsumption} kWh`,
          isEPimp: true,
          dataSource: data.chart,
          totalConsumo: `$${data.finalCost}`,
          totalDemanda: `$ 0`,
          indicator: false,
        });
      })
      .catch(err => {
        console.log('No se pudo');
        this.setState({
          indicator: false,
          error: true,
          totalConsumo: zeroPrice,
          isConsumption: true,
          readingConsumo: zeroVal,
          isEPimp: true,
        });
      });
  }
  getDP() {
    this.setState({
      readingDemanda: 0,
    });
    fetch(
      `http://api.ienergybook.com/api/Meters/standardReadings?access_token=${
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
            this.props.adminIds.meter_id != ''
              ? this.props.adminIds.meter_id
              : this.props.readings.meterId,
          device: '',
          service: 'Servicio 1',
          variable: 'DP',
          filter: this.state.filter,
          interval: this.state.interval,
          custom_dates: this.state.customdates,
        }),
      },
    )
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        let data = jsonDP(json[1]);
        this.setState({
          readingDemanda: `${data} kW`,
          isDP: true,
        });
      })
      .catch(err => {
        console.log('no se pudo');
        this.setState({
          readingDemanda: zeroValD,
          isDP: true,
        });
      });
  }
  recieveMensualProd() {
    this.setState({
      valorProduccion: 0,
    });
    fetch(
      `http://api.ienergybook.com/api/eficiencia/ProduccionUsuarioMensual?access_token=${
        this.state.values.accesToken
      }`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserId: this.state.values.userId,
          MesyAno: this.state.customdates.from,
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
        this.setState(
          {
            valorProduccion: json[1].Resultado,
          },
          () => {
            this.setState({
              indicatorCards: false,
              isProd: true,
            });
          },
        );
      })
      .catch(err => {
        this.setState({
          indicatorCards: false,
          isProd: true,
        });
      });
  }
  setMonthCalendar(value) {
    this.setState({
      monthCalendar: value,
    });
  }
  changeValue(newdate, newdateend, año, custom, mes, mesnum) {
    this.setState({
      newDate: newdate,
      newdateEnd: newdateend,
      customdates: custom,
      mesesito: mes,
      añito: año,
      mesNum: mesnum,
    });
  }
  render() {
    var cardData = {
      readingEPimp: this.state.readingConsumo,
      readingDP: this.state.readingDemanda,
      priceEPimp: this.state.totalConsumo,
      priceDP: this.state.totalDemanda,
    };
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={[styles.container]}>
          {(!this.state.isConsumption ||
            !this.state.isDP ||
            !this.state.isEPimp ||
            !this.state.isProd) && (
            <View style={styles.cargando}>
              <Text>Cargando datos ...</Text>
            </View>
          )}
          {this.state.isConsumption &&
            this.state.isDP &&
            this.state.isEPimp &&
            this.state.isProd && (
              <SwiperView
                functionDayDates={this.setDayDates}
                setMonthCalendar={this.setMonthCalendar}
                dayFecha={this.state.dayFecha}
                cardData={cardData}
                mesesito={this.state.mesesito}
                ref={this.myRef}
                valorProduccion={this.state.valorProduccion}
              />
            )}
          <View style={[styles.chart]}>
            {this.state.monthCalendar && (
              <MonthSelector
                functionValue={this.changeValue.bind(this)}
                date={this.state.date}
                mesesito={this.state.mesesito}
                añito={this.state.añito}
                newDate={this.state.newDate}
                allFunctions={this.allFunctions.bind(this)}
              />
            )}
            <ChartView
              isConsumption={this.state.isConsumption}
              indicator={this.state.indicator}
              error={this.state.error}
              dataSource={this.state.dataSource}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(Efficiency2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  chart: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
  },
  cargando: {
    width: Math.min(screenWidth, screenHeight) - 40,
    height: 350,
    borderRadius: 10,
    marginVertical: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
