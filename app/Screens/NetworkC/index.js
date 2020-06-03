import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {alert} from '../../Assets/Functions/setAlert';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {jsonResponse} from '../../Components/Code/chartData';
import {isPortrait} from '../../Assets/constants';
import {
  TopPickers,
  VariableView,
  TopView2,
  Chartview,
  IntervalView,
  Cards,
} from '../../Components/Code';
const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  adminIds: state.adminReducer,
});
class Codes extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      minValue: 0,
      maxValue: 0,
      promedio: 0,
      cardVariable: 'V',
      propsData: [],
      dataSource: [],
      numSteps: '1',
      indicator: false,
      pickerFValue: 'Hoy',
      pickerValue: this.props.readings.devices
        ? this.props.readings.devices[1].description
        : null,
      device: this.props.readings.devices
        ? this.props.readings.devices[1].name
        : null,
      filter: 0,
      variables: ['Vab', 'Vbc', 'Vca'],
      caption: 'Voltaje',
      interval: 3600,
      custom_dates: {from: null, until: null},
      initialDate: '',
      endDate: '',
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
    this.setInterval = this.setInterval.bind(this);
    this.Calendario = this.Calendario.bind(this);
    this.setVariabe = this.setVariabe.bind(this);
    this.setInitial = this.setInitial.bind(this);
    this.setDevice = this.setDevice.bind(this);
    this.setEnd = this.setEnd.bind(this);
  }

  UNSAFE_componentWillMount() {
    console.log(this.props);
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
      `http://api.ienergybook.com/api/Meters/getNetCodeReadings?access_token=${
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
          filter: this.state.filter,
          variables: this.state.variables,
          interval: this.state.interval,
          custom_dates: this.state.custom_dates,
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
        let data = jsonResponse(
          json[1],
          this.state.caption,
          this.state.numSteps,
          this.state.cardVariable,
        );

        this.setState({
          maxValue: data.maxValue1,
          minValue: data.minValue1,
          promedio: data.average,
          propsData: data.propsData,
          dataSource: data.dataSource,
          indicator: false,
        });
      })
      .catch(err => {
        this.setState({
          indicator: false,
        });
      });
  }
  setInitial(date) {
    this.setState({
      initialDate: date,
    });
  }
  setEnd(date) {
    this.setState(
      {
        endDate: date,
        calendar: false,
      },
      () => {
        if (this.state.initialDate && this.state.endDate) {
          this.setState(
            {
              custom_dates: {
                from: `${this.state.initialDate}`,
                until: `${this.state.endDate}`,
              },
              filter: -1,
            },
            () => {
              this.getChartData();
            },
          );
        }
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
  setInterval(interval, steps) {
    this.setState(
      {
        interval: interval,
        numSteps: steps,
      },
      () => {
        this.getChartData();
      },
    );
  }
  setVariabe(value, texto, vari) {
    this.setState(
      {
        variables: value,
        caption: texto,
        cardVariable: vari,
      },
      () => {
        this.getChartData();
      },
    );
  }
  setFilter(filtro, texto, steps) {
    this.setState(
      {
        filter: filtro,
        customdates: null,
        calendar: filtro == -1 ? true : false,
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
  setDevice(device, itemValue) {
    this.setState(
      {
        device: device,
        pickerValue: itemValue,
      },
      () => {
        this.getChartData();
      },
    );
  }

  render() {
    var key = 0;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
          <View style={[styles.container]}>
            <View style={[styles.topView]}>
              <View style={[styles.calendarView]}>
                <View style={[styles.pickers]}>
                  <TopPickers
                    devices={this.props.readings.devices}
                    functionDevice={this.setDevice.bind(this)}
                    functionFilter={this.setFilter.bind(this)}
                    selectedService={this.state.pickerValue}
                    selectedFilter={this.state.pickerFValue}
                    numSteps={this.state.numSteps}
                    interval={this.state.interval}
                  />
                  {this.state.orientation == 'landscape' && (
                    <VariableView
                      caption={this.state.caption}
                      functionVariable={this.setVariabe.bind(this)}
                    />
                  )}
                </View>
                <TopView2
                  caption={this.state.caption}
                  filter={this.state.filter}
                  functionVariable={this.setVariabe.bind(this)}
                  functionFilter={this.setFilter.bind(this)}
                  Calendario={this.Calendario.bind(this)}
                  numSteps={this.state.numSteps}
                  interval={this.state.interval}
                />
              </View>
            </View>
            <Chartview
              calendar={this.state.calendar}
              libraryPath={this.libraryPath}
              initialDate={this.state.initialDate}
              endDate={this.state.endDate}
              setInitial={this.setInitial}
              setEnd={this.setEnd}
              dataSource={this.state.dataSource}
              indicator={this.state.indicator}
            />
            <IntervalView
              filter={this.state.filter}
              interval={this.state.interval}
              numSteps={this.state.numSteps}
              functionInterval={this.setInterval.bind(this)}
            />
            {this.state.propsData.length != 0 && (
              <Cards
                indicator={this.state.indicator}
                propsData={this.state.propsData}
                cardVariable={this.state.cardVariable}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default connect(mapStateToProps)(Codes);
const styles = StyleSheet.create({
  topView: {
    height: 'auto',
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pickers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  container: {
    flex: 1,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
});
