import React, {Component} from 'react';
import DatePicker from 'react-native-datepicker';
import {View, StyleSheet} from 'react-native';

var today = new Date();
var date =
  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

const defaultStyle = {
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    marginLeft: 0,
  },
  dateInput: {
    marginLeft: 36,
  },
};

export default class DatesPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: date,
      endDate: this.props.endDate,
      initialDate: this.props.initialDate,
    };
  }
  initial(date) {
    this.setState(
      {
        initialDate: date,
      },
      () => {
        this.props.setInitial(date);
      },
    );
  }
  end(date) {
    this.setState(
      {
        endDate: date,
      },
      () => {
        this.props.setEnd(date);
      },
    );
  }

  render() {
    return (
      <View style={[styles.container]}>
        <DatePicker
          style={{width: 150, margin: 10}}
          date={this.state.initialDate}
          mode="date"
          placeholder="Desde"
          androidMode="spinner"
          format="YYYY-MM-DD"
          minDate="2000-01-01"
          maxDate="3000-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={defaultStyle}
          onDateChange={date => {
            this.initial(date);
          }}
        />
        <DatePicker
          style={{width: 150}}
          date={this.state.endDate}
          mode="date"
          placeholder="Hasta"
          androidMode="spinner"
          format="YYYY-MM-DD"
          minDate="2000-01-01"
          maxDate="3000-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={defaultStyle}
          onDateChange={date => {
            this.end(date);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    flexDirection: 'row',
    width: '100%',
    height: 70,
    backgroundColor: 'white',
  },
});
