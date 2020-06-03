import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment/min/moment-with-locales';
import {getFontSize} from '../../Assets/constants';
let fontSize = getFontSize('large');
export default class DailyDates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
    };
  }

  enviarFecha(date) {
    this.setState({date: date}, () => {
      this.props.setDayDates(this.state.date);
    });
  }

  render() {
    var fecha1 =
      moment(this.props.date)
        .locale('es')
        .format('dddd')
        .charAt(0)
        .toUpperCase() +
      moment(this.props.date)
        .locale('es')
        .format('dddd')
        .slice(1);

    var fecha2 = `${moment(this.props.date).format('DD')} de ${moment(
      this.props.date,
    )
      .locale('es')
      .format('MMMM')
      .charAt(0)
      .toUpperCase() +
      moment(this.props.date)
        .locale('es')
        .format('MMMM')
        .slice(1)}`;

    return (
      <View style={styles.titleContainer}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: fontSize.normal}}>{fecha1}</Text>
          <Text style={{fontSize: fontSize.title + 5}}>{fecha2}</Text>
        </View>
        <DatePicker
          style={{width: 'auto'}}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          androidMode="spinner"
          hideText="true"
          format="YYYY-MM-DD"
          minDate="2000-01-01"
          maxDate="3000-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 0,
            },
          }}
          onDateChange={date => {
            this.enviarFecha(date);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    height: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    height: 60,
    borderBottomColor: '#CDCBCB',
  },
});
