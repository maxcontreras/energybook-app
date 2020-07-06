import React, {Component, PropTypes} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {ChartView} from '../../Components/Global/index';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {isPortrait} from '../../Assets/constants';
import {jsonResponse} from '../../Assets/Functions/charts';
import {alert} from '../../Assets/Functions/setAlert';
import {TopView1, TopView2, Cards} from '../../Components/Charts/index.js';
const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  adminIds: state.adminReducer,
});

class ChartScreen extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      maxValue: 0,
      minValue: 0,
      promedio: 0,
      cardVariable: 'kWh',
      pickerValue: 'Servicio 1',
      pickerFValue: 'Hoy',
      pickerIValue: '15 minutos',
      indicator: false,
      calendar: false,
      numSteps: '4',
      arrayWithData: [],
      device: '',
      service: 'Servicio 1',
      variable: 'EPimp',
      filter: 0,
      timeCustomButtons: true,
      interval: 900,
      customdates: null,
      values: [],
      initialDate: '',
      propsData: [],
      endDate: '',
      caption: 'Consumo',
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
    this.setFilter = this.setFilter.bind(this);
    this.setInterval = this.setInterval.bind(this);
    this.Calendario = this.Calendario.bind(this);
    this.setVariabe = this.setVariabe.bind(this);
  }
  UNSAFE_componentWillMount() {
    this._retrieveData();
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
          },
          () => {
            if (this.props.readings.meterId) {
              this.getChartData();
            }
          },
        );
      }
    } catch (error) {}
  };
  getChartData() {
    this.setState({
      indicator: true,
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
          device: this.state.device,
          service: this.state.service,
          variable: this.state.variable,
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
        console.log(json);
        if (this.state.statusCode == 504) {
          alert('Hubo un error al obtener los datos del medidor.');
        }
        let dataChida = jsonResponse(
          json[1],
          this.state.caption,
          this.state.cardVariable,
        );

        this.setState({
          arrayWithData: dataChida.newData,
          maxValue: dataChida.maxValue,
          minValue: dataChida.minValue,
          promedio: dataChida.promedio,
          indicator: false,
          propsData: dataChida.propsData,
        });
      })
      .catch(err => {
        console.log('no se pudo');
      });
  }
  setDates(calendar, initial, end, custom, filter) {
    this.setState(
      {
        initialDate: initial,
        endDate: end,
        calendar: calendar,
        customdates: custom,
        filter: filter,
      },
      () => {
        this.getChartData();
      },
    );
  }
  Calendario() {
    this.state.calendar
      ? this.setState({
          calendar: false,
        })
      : this.setState({
          calendar: true,
          filter: -1,
        });
  }
  setVariabe(value) {
    this.setState(
      {
        variable: value,
      },
      () => {
        if (value == 'DP') {
          this.setState(
            {
              caption: 'Demanda',
              cardVariable: 'kW',
              interval: 900,
              pickerIValue: '15 minutos',
              numSteps:
                this.state.filter == 0 || this.state.filter == 1 ? '4' : '96',
            },
            () => {
              this.getChartData();
            },
          );
        } else if (value == 'EPimp') {
          this.setState(
            {
              caption: 'Consumo',
              cardVariable: 'kWh',
            },
            () => {
              this.getChartData();
            },
          );
        }
      },
    );
  }
  setInterval(intervalo, texto, steps) {
    this.setState(
      {
        interval: intervalo,
        pickerIValue: texto,
        numSteps: steps,
      },
      () => {
        this.getChartData();
      },
    );
  }
  setFilter(filtro, date, calendar, picker, steps) {
    this.setState(
      {
        filter: filtro,
        customdates: date,
        calendar: calendar,
        pickerFValue: picker,
        numSteps: steps,
      },
      () => {
        if (filtro != -1) {
          this.getChartData();
        }
      },
    );
  }
  setDevice(value, service, device) {
    this.setState(
      {
        service: service,
        device: device,
        pickerValue: value,
      },
      () => {
        this.getChartData();
      },
    );
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps="never" style={styles.scroll}>
          <KeyboardAvoidingView enabled>
            <View style={[styles.container]}>
              <View style={styles.topView}>
                {this.props.readings && (
                  <TopView1
                    functionDevice={this.setDevice.bind(this)}
                    selectedService={this.state.pickerValue}
                    selectedVar={this.state.caption}
                    setIntervals={this.setInterval}
                    selectedInterval={this.state.pickerIValue}
                    interval={this.state.interval}
                    filter={this.state.filter}
                    devices={this.props.readings.devices}
                    numSteps={this.state.numSteps}
                  />
                )}
                <TopView2
                  functionVariable={this.setVariabe}
                  selectedVar={this.state.caption}
                  functionFilter={this.setFilter.bind(this)}
                  selectedFilter={this.state.pickerFValue}
                  functionCalendar={this.Calendario}
                  interval={this.state.interval}
                  numSteps={this.state.numSteps}
                />
              </View>
              <ChartView
                indicator={this.state.indicator}
                setDates={this.setDates.bind(this)}
                calendar={this.state.calendar}
                type={'line'}
                caption={this.state.caption}
                data={this.state.arrayWithData}
                numSteps={this.state.numSteps}
              />
              <View style={styles.cards}>
                {this.state.propsData.length != 0 && (
                  <Cards
                    indicator={this.state.indicator}
                    propsData={this.state.propsData}
                    cardVariable={this.state.cardVariable}
                  />
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default connect(mapStateToProps)(ChartScreen);
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  topView: {
    height: 'auto',
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cards: {
    height: 'auto',
    width: '100%',
  },
});
