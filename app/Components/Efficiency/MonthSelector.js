// THIS VIEW WRAPS THE MONTHE PICKER FOR THE MENSUAL CARD
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {MonthPickerEF} from './index';
import moment from 'moment/min/moment-with-locales';

export default class MonthSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.newDate,
    };
  }

  changeValue(months, years, mess) {
    //validations to select the correct month
    const oldDate = moment()
      .startOf('month')
      .format('YYYY-MM-DD');
    const newDate = moment(this.props.newDate)
      .add(months, 'month')
      .add(years, 'year')
      .format('YYYY-MM-DD');
    let goodDate = moment(newDate).isAfter(oldDate) ? oldDate : newDate;
    let newdateEnd = moment(goodDate)
      .endOf('month')
      .format('YYYY-MM-DD');
    let mes = moment(goodDate)
      .locale('es')
      .format('MMMM');
    let año = moment(goodDate).format('YYYY');
    let customDates = {
      from: `${goodDate}`,
      until: `${newdateEnd}`,
    };
    let goodMonth = mes.charAt(0).toUpperCase() + mes.slice(1);
    let mesNum = moment(goodDate).format('MM');
    this.props.functionValue(
      goodDate,
      newdateEnd,
      año,
      customDates,
      goodMonth,
      mesNum,
    );
  }

  render() {
    return (
      <View style={styles.monthPicker}>
        <MonthPickerEF
          fecha={this.props.date}
          function={this.changeValue.bind(this)}
          mes={this.props.mesesito}
          año={this.props.añito}
          mesNum={moment(this.props.date).format('MM')}
        />
        <TouchableOpacity onPress={this.props.allFunctions} style={styles.btn}>
          <Text style={styles.btnTxt}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  monthPicker: {
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 40,
    margin: 20,
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
});
