import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import MonthPicker from '../../Components/RecordC/MonthPicker.js';
import {CCPicker, Load} from '../../Components/Global/index';
import RecordCard from '../../Components/RecordC/RecordCard.js';
import {alert} from '../../Assets/Functions/setAlert';
import {connect} from 'react-redux';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import 'moment/min/moment-with-locales';
const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  prices: state.costReducer,
  adminIds: state.adminReducer,
});
class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValue: 'Servicio 1',
      newDate: moment()
        .startOf('month')
        .add(-1, 'month')
        .format(),
      values: [],
      indicator: false,
      meterId: '',
      consumptionPrice: 0.0,
    };
  }

  UNSAFE_componentWillMount() {
    this._retrieveData();
  }
  confirmar() {
    this.setState({
      indicator: true,
    });
    fetch(
      `http://api.ienergybook.com/api/Services/monthlyHistory?access_token=${
        this.state.values.accesToken
      }`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: this.state.pickerValue,
          companyId:
            this.props.adminIds.company_id != ''
              ? this.props.adminIds.company_id
              : this.state.values.companyId,
          period: this.state.newDate,
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
        this.setState({
          cardData: json[1].data,
          indicator: false,
        });
        this.getPrices();
      })
      .catch(err => {
        this.setState({
          indicator: false,
        });
        alert('Error', 'Hubo un error al obtener los datos.');
      });
  }
  getPrices() {
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
              : this.state.meterId,
          service: this.state.pickerValue,
          filter: -1,
          interval: 86400,
          custom_dates: {
            from: `${moment(this.state.newDate).format('YYYY-MM-DD')}`,
            until: `${moment(this.state.newDate)
              .endOf('month')
              .format('YYYY-MM-DD')}`,
          },
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
          consumptionPrice: response
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        });
      })
      .catch(err => {
        console.log('no se pudo');
      });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  setService(itemValue) {
    this.setState({
      pickerValue: itemValue,
    });
  }
  changeValue(months, years) {
    const oldDate = moment()
      .startOf('month')
      .add(-1, 'month')
      .format();
    const newDate = moment(this.state.newDate)
      .add(months, 'month')
      .add(years, 'year')
      .format();
    this.setState(
      {
        newDate: moment(newDate).isAfter(oldDate) ? oldDate : newDate,
      },
      () => {
        console.log(this.state.newDate);
      },
    );
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
        this.setState({
          meterId: JSON.parse(value).meterId,
        });
      }
    } catch (error) {}
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          <KeyboardAvoidingView enabled>
            <View style={styles.container}>
              <View style={styles.title}>
                <Text style={styles.titleText}>Historial de mediciones</Text>
              </View>
              <View>
                <View style={styles.monthContainer}>
                  <CCPicker
                    function={this.setService.bind(this)}
                    selectedValue={this.state.pickerValue}
                    type={'services'}
                  />
                  <MonthPicker function={this.changeValue.bind(this)} />
                  <TouchableOpacity
                    onPress={() => this.confirmar()}
                    style={styles.btn}>
                    <Text style={styles.btnTxt}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardView}>
                  {this.state.indicator && <Load />}
                  {!this.state.indicator && (
                    <RecordCard
                      cardData={this.state.cardData}
                      consumptionPrice={this.state.consumptionPrice}
                    />
                  )}
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(Record);

const styles = StyleSheet.create({
  scroll: {
    flex: 0,
    height: '100%',
    flexGrow: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  btn: {
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    backgroundColor: '#586365',
  },
  btnTxt: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  monthContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    width: '100%',
    height: 40,
    borderBottomWidth: 0.2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  titleText: {
    fontWeight: 'bold',
    color: '#586365',
    fontSize: 13,
  },
  cardView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
});
