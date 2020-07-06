import React, {Component, PropTypes} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {
  CardView,
  PickersView,
  FiltersView,
} from '../../Components/Carbon/index';
import {chartData, buttonsData} from '../../Assets/Functions/carbon';
import AsyncStorage from '@react-native-community/async-storage';
import {isPortrait, screenHeight, screenWidth} from '../../Assets/constants';
import {alert} from '../../Assets/Functions/setAlert';
import {ChartView} from '../../Components/Global/index';

const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  adminIds: state.adminReducer,
});
class Carbon extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      indicator: false,
      calendar: false,
      cards: false,
      cService: true,
      cardDevice: null,
      cDevice: false,
      response: [],
      arrayWithData: [],
      values: [],
      device: '',
      cardService: 'Servicio 1',
      service: 'Servicio 1',
      pickerFValue: 'Hoy',
      numSteps: '1',
      caption: 'CO2e',
      pickerValue: 'Servicio 1',
      filter: 0,
      interval: 3600,
      customdates: {from: null, until: null},
    };
    this.setFilter = this.setFilter.bind(this);
    this.Calendario = this.Calendario.bind(this);
    this.setDevice = this.setDevice.bind(this);
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
    const url = `http://api.ienergybook.com/api/DesignatedMeters/carbonFootprint?company_id=${
      this.props.adminIds.company_id != ''
        ? this.props.adminIds.company_id
        : this.state.values.companyId
    }&service_name=${
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
        this.setState({
          indicator: false,
          response: json[1].response,
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
      `http://api.ienergybook.com/api/Meters/co2e?access_token=${
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
        let data = chartData(json[1]);
        this.setState({
          arrayWithData: this.state.filter == 4 ? data.perMonth : data.newData,
          indicator: false,
        });
        this.getCardsData();
      })
      .catch(err => {
        console.log('no  se pudo');
        this.setState({
          indicator: false,
        });
        alert('Hubo un error al obtener los datos del medidor.');
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
    !this.state.calendar
      ? this.setState({
          calendar: true,
          filter: -1,
        })
      : this.setState({
          calendar: false,
        });
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
  render() {
    let data1 = buttonsData(this.state.filter);
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{backgroundColor: 'white', flex: 1}}>
          <View style={styles.container}>
            <View
              style={[
                this.state.orientation == 'portrait'
                  ? styles.topViewP
                  : styles.topViewL,
              ]}>
              <PickersView
                functionDevice={this.setDevice}
                selectedDevice={this.state.pickerValue}
                functionFilter={this.setFilter}
                selectedFilter={this.state.pickerFValue}
                devices={this.props.readings.devices}
                numSteps={this.state.numSteps}
              />
              {this.state.orientation == 'landscape' && (
                <FiltersView
                  numSteps={this.state.numSteps}
                  functionFilter={this.setFilter}
                  filter={this.state.filter}
                  Calendario={this.Calendario}
                  data={data1}
                />
              )}
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

export default connect(mapStateToProps)(Carbon);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 'auto',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  topViewP: {
    height: 60,
    alignItems: 'flex-start',
    width: Math.min(screenWidth, screenHeight),
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'space-between',
  },
  topViewL: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: null,
    flexDirection: 'row',
  },
  chart: {
    justifyContent: 'center',
    height: 'auto',
  },
});
