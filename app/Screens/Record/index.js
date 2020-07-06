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
import {connect} from 'react-redux';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getEPEXP,
  getEPIMP,
  getHISTORY,
  setValues,
} from '../../Assets/Functions/record';
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
      EPexp: 0.0,
      EPimp: 0.0,
      history: [],
      cardData: setValues(),
    };
  }

  UNSAFE_componentWillMount() {
    this._retrieveData();
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  epexp_value = async () => {
    let meterID =
      this.props.adminIds.meter_id != ''
        ? this.props.adminIds.meter_id
        : this.state.meterId;
    let companyID =
      this.props.adminIds.company_id != ''
        ? this.props.adminIds.company_id
        : this.state.values.companyId;
    this.setState({
      indicator: true,
    });
    try {
      const epexp = await getEPEXP(
        this.state.values.accesToken,
        meterID,
        this.state.pickerValue,
        this.state.newDate,
      );
      if (epexp != null) {
        this.setState(
          {
            EPexp: epexp,
          },
          () => {
            this.epimp_value(meterID, companyID);
          },
        );
      } else {
        this.setState({
          cardData: setValues(),
          indicator: false,
        });
      }
    } catch (error) {}
  };
  epimp_value = async (meterID, companyID) => {
    try {
      const epimp = await getEPIMP(
        this.state.values.accesToken,
        meterID,
        this.state.pickerValue,
        this.state.newDate,
      );
      if (epimp != null) {
        this.setState(
          {
            EPimp: epimp,
          },
          () => {
            this.history_value(companyID);
          },
        );
      } else {
        this.setState({
          cardData: setValues(),
          indicator: false,
        });
      }
    } catch (error) {}
  };
  history_value = async companyID => {
    try {
      const history = await getHISTORY(
        this.state.values.accesToken,
        companyID,
        this.state.newDate,
        this.state.pickerValue,
      );
      if (history != null) {
        this.setState(
          {
            history: history,
            indicator: false,
          },
          () => {
            this.set_values();
          },
        );
      } else {
        this.setState({
          cardData: setValues(),
          indicator: false,
        });
      }
    } catch (error) {}
  };
  set_values() {
    let all = setValues(
      this.state.EPexp,
      this.state.EPimp,
      this.state.history,
      this.props.prices,
    );
    this.setState({
      cardData: all,
    });
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
    this.setState({
      newDate: moment(newDate).isAfter(oldDate) ? oldDate : newDate,
    });
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
                    onPress={() => this.epexp_value()}
                    style={styles.btn}>
                    <Text style={styles.btnTxt}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardView}>
                  {this.state.indicator && <Load />}
                  {!this.state.indicator && (
                    <RecordCard cardData={this.state.cardData} />
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
