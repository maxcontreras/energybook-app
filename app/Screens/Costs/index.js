import React, {Component, PropTypes} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {
  FilterButtons,
  IntervalButtons,
  Part1,
  Colors,
} from '../../Components/Cost/index';
import {jsonResponse} from '../../Assets/Functions/costs';
import {isPortrait, filtersCharts} from '../../Assets/constants';
import {ChartView} from '../../Components/Global/index';
import AsyncStorage from '@react-native-community/async-storage';
import {alert} from '../../Assets/Functions/setAlert';

const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  adminIds: state.adminReducer,
});

class Costs extends Component {
  constructor(props) {
    isPortrait();
    super(props);
    this.state = {
      pickerValue: 'Servicio 1',
      pickerFValue: 'Hoy',
      pickerIValue: '15 minutos',
      newInterval: 'Cada hora',
      porDia: false,
      indicator: false,
      calendar: false,
      numSteps: '1',
      hourArray: [],
      dayArray: [],
      arrayPicker: [],
      device: '',
      service: 'Servicio 1',
      filter: 0,
      timeCustomButtons: false,
      interval: 3600,
      customdates: null,
      values: [],
      initialDate: '',
      endDate: '',
      numberOfServices: this.props.readings.numberOfServices,
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
    this.libraryPath = Platform.select({
      ios: require('../../../assets/fusioncharts.html'),
      android: {uri: 'file:///android_asset/fusioncharts.html'},
    });
    this.setFilter = this.setFilter.bind(this);
    this.Calendario = this.Calendario.bind(this);
    this.setDevice = this.setDevice.bind(this);
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
            this.getChartData();
          },
        );
        console.log(this.state.values);
      }
    } catch (error) {}
  };

  UNSAFE_componentWillMount() {
    this._retrieveData();
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  getChartData() {
    this.setState({
      indicator: true,
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
          device: this.state.device,
          service: this.state.service,
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
        if (this.state.statusCode == 504) {
          alert('Hubo un error al obtener los datos del medidor.');
        }
        let data = jsonResponse(json[1]);
        this.setState({
          hourArray: data.newData,
          dayArray: data.perDay,
          indicator: false,
        });
      })
      .catch(err => {});
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
  setFilter(value) {
    var newI = value == 0 || value == 1 ? 'Cada hora' : this.state.newInterval;
    var steps = this.state.numSteps;
    if (value == -1) {
      steps = steps;
    } else if (value == 0 || value == 1) {
      steps = '1';
    } else if (value == 2 || value == 3) {
      steps = newI == 'Cada hora' ? '24' : '1';
    }
    this.setState(
      {
        filter: value,
        customdates: null,
        calendar: false,
        porDia: value == 0 || value == 1 ? false : true,
        newInterval: newI,
        numSteps: steps,
      },
      () => {
        this.getChartData();
      },
    );
  }
  setNewInterval(filter, texto) {
    this.setState({
      newInterval: texto,
      numSteps: texto == 'Cada hora' ? '24' : '1',
    });
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
        <ScrollView style={{backgroundColor: 'white'}}>
          <View style={[styles.container]}>
            <View
              style={[
                this.state.orientation == 'portrait'
                  ? styles.topView1
                  : styles.topView2,
              ]}>
              <Part1
                functionDevice={this.setDevice.bind(this)}
                pickerValue={this.state.pickerValue}
                porDia={this.state.porDia}
                functionInterval={this.setNewInterval.bind(this)}
                newInterval={this.state.newInterval}
                devices={this.props.readings.devices}
              />
              <FilterButtons
                filter={this.state.filter}
                filtersCharts={filtersCharts}
                setFilter={this.setFilter.bind(this)}
                Calendario={this.Calendario.bind(this)}
              />
            </View>
            {this.state.orientation == 'landscape' && this.state.porDia && (
              <IntervalButtons
                setNewInterval={this.setNewInterval.bind(this)}
                newInterval={this.state.newInterval}
              />
            )}
            <ChartView
              indicator={this.state.indicator}
              setDates={this.setDates.bind(this)}
              calendar={this.state.calendar}
              type={'column2d'}
              caption={'Consumo'}
              data={
                this.state.newInterval == 'Cada hora'
                  ? this.state.hourArray
                  : this.state.dayArray
              }
              numSteps={this.state.numSteps}
            />
            {!this.state.indicator && <Colors color={this.state.newInterval} />}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(Costs);
const styles = StyleSheet.create({
  topView1: {
    height: 'auto',
    width: '100%',
    padding: 10,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  topView2: {
    height: 'auto',
    width: '100%',
    padding: 10,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  chart: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
  },
});
