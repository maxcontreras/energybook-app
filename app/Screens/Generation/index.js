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
import {alert} from '../../Assets/Functions/setAlert';
import {isPortrait, screenHeight, screenWidth} from '../../Assets/constants';
import {chartData} from '../../Components/Generation/Data';
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
            this.getChartData();
          },
        );
      }
    } catch (error) {}
  };
  getCardsData() {
    this.setState({
      indicator: true,
      cards: false,
    });
    const url = `http://api.ienergybook.com/api/DesignatedMeters/generation?company_id=${
      this.props.adminIds.company_id != ''
        ? this.props.adminIds.company_id
        : this.state.values.companyId
    }&${this.state.cService ? 'service' : 'device'}_name=${
      this.state.cDevice
        ? this.state.cardDevice
        : this.state.cardService.replace(' ', '%20')
    }&access_token=${this.state.values.accesToken}`;
    console.log(url);
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        console.log(json);
        this.setState({
          response: json[1].response,
          indicator: false,
          cards: true,
        });
      })
      .catch(err => {
        console.log('no  se pudo');
        this.setState({
          cards: true,
        });
      });
  }
  getChartData() {
    this.setState({
      indicator: true,
    });
    fetch(
      `http://api.ienergybook.com/api/Meters/generationReadings?access_token=${
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
          variable: this.state.variable,
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
        let data = chartData(json[1], this.state.caption);
        this.setState(
          {
            arrayWithData:
              this.state.filter == 4 ? data.perMonth : data.newData,
            indicator: false,
          },
          () => {
            this.getCardsData();
          },
        );
      })
      .catch(err => {
        this.setState({
          indicator: false,
        });
        console.log('no  se pudo');
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
        this.getChartData();
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
          this.getChartData();
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
        this.getChartData();
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
              <CardView response={this.state.response} />
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
