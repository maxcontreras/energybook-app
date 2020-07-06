//0 generation 1 selfconsumption 2 networkinjection
import React, {Component, PropTypes} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {isPortrait, screenHeight, screenWidth} from '../../Assets/constants';
import {jsonChartData, jsonCardData} from '../../Assets/Functions/generation';
import {
  CardView,
  VariableView,
  PickersView,
  FiltersView,
} from '../../Components/Generation/index';
import {ChartView} from '../../Components/Global/index';

const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  adminIds: state.adminReducer,
});
class Generation extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      indicator: false,
      calendar: false,
      cards: false,
      cardService: 'Servicio 1',
      cService: true,
      cardDevice: null,
      cDevice: false,
      arrayWithData: [],
      device: '',
      service: 'Servicio 1',
      variable: 0,
      filter: 0,
      interval: 3600,
      customdates: {from: null, until: null},
      values: [],
      response: [],
      caption: 'Generación',
      pickerValue: 'Servicio 1',
      pickerFValue: 'Hoy',
      responseChart: [],
    };
    this.setFilter = this.setFilter.bind(this);
    this.setVariabe = this.setVariabe.bind(this);
    this.Calendario = this.Calendario.bind(this);
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
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
            this.chartAxisData();
          },
        );
      }
    } catch (error) {}
  };
  getCardsData = async () => {
    this.setState({
      indicator: true,
    });
    try {
      const card = await jsonCardData(
        this.props.adminIds.company_id,
        this.state.values.companyId,
        this.state.cService,
        this.state.cDevice,
        this.state.cardService,
        this.state.cardDevice,
        this.state.values.accesToken,
      );
      if (card != null) {
        this.setState(
          {
            response: card,
            indicator: false,
            cards: true,
          },
          () => {
            console.log(this.state.response);
          },
        );
      }
    } catch (error) {}
  };
  chartAxisData = async () => {
    this.setState({
      indicator: true,
    });
    try {
      const chart = await jsonChartData(
        this.state.values.accesToken,
        {
          id:
            this.props.adminIds.meter_id != ''
              ? this.props.adminIds.meter_id
              : this.props.readings.meterId,
          device: this.state.device,
          service: this.state.service,
          filter: this.state.filter,
          interval: this.state.interval,
          variable: this.state.variable,
          custom_dates: this.state.customdates,
        },
        this.state.caption,
      );
      if (chart != null) {
        this.setState(
          {
            arrayWithData: chart,
            indicator: false,
          },
          () => {
            this.getCardsData();
          },
        );
      }
    } catch (error) {}
  };
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
        this.chartAxisData();
      },
    );
  }
  Calendario() {
    if (!this.state.calendar) {
      this.setState({
        calendar: true,
        filter: -1,
      });
    } else if (this.state.calendar) {
      this.setState({
        calendar: false,
      });
    }
  }
  setDevice(picker, cards, cdevice, csrevice, service, device) {
    this.setState(
      {
        pickerValue: picker,
        cardService: cards,
        cDevice: cdevice,
        cService: csrevice,
        service: service,
        device: device,
      },
      () => {
        this.chartAxisData();
      },
    );
  }
  setFilter(filtro, dates, calendar, texto, steps) {
    this.setState(
      {
        filter: filtro,
        customdates: dates,
        calendar: calendar,
        pickerFValue: texto,
        numSteps: steps,
      },
      () => {
        if (filtro != -1) {
          this.chartAxisData();
        }
      },
    );
  }
  setVariabe(value, texto) {
    this.setState(
      {
        variable: value,
        caption: texto,
      },
      () => {
        this.chartAxisData();
      },
    );
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          <View style={styles.container}>
            <View
              style={[
                this.state.orientation == 'portrait'
                  ? styles.topViewP
                  : styles.topViewL,
              ]}>
              <View style={[styles.calendarView]}>
                <PickersView
                  functionDevice={this.setDevice.bind(this)}
                  selectedDevice={this.state.pickerValue}
                  functionFilter={this.setFilter.bind(this)}
                  selectedFilter={this.state.pickerFValue}
                  devices={this.props.readings.devices}
                  numSteps={this.state.numSteps}
                />
                {this.state.orientation == 'landscape' && (
                  <FiltersView
                    numSteps={this.state.numSteps}
                    functionFilter={this.setFilter.bind(this)}
                    filter={this.state.filter}
                    Calendario={this.Calendario}
                  />
                )}
              </View>
              <VariableView
                functionVariable={this.setVariabe}
                caption={this.state.caption}
              />
            </View>
            <ChartView
              indicator={this.state.indicator}
              setDates={this.setDates.bind(this)}
              calendar={this.state.calendar}
              type={'column2d'}
              caption={this.state.caption}
              data={this.state.arrayWithData}
              numSteps={this.state.numSteps}
            />
            {this.state.cards && !this.state.indicator && (
              <CardView
                response={this.state.response}
                id={
                  this.props.adminIds.meter_id != ''
                    ? this.props.adminIds.meter_id
                    : this.props.readings.meterId
                }
                device={this.state.device}
                service={this.state.service}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default connect(mapStateToProps)(Generation);
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 'auto',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  calendarView: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 5,
  },
  topViewL: {
    height: 'auto',
    justifyContent: 'center',
    width: '100%',
  },
  topViewP: {
    width: Math.min(screenWidth, screenHeight),
    height: 'auto',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
    backgroundColor: 'white',
  },
});
