//RETURNS CARD HEADERS (DAILY, MONTHLY)
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {DailyDates, MensualDates} from './index';
export default class TitleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.type == 'diario' ? (
      <DailyDates
        data={this.props.data}
        date={this.props.date}
        setDayDates={this.props.setDayDates}
        dayFunctions={this.props.dayFunctions}
      />
    ) : (
      <MensualDates
        data={this.props.data}
        setCalendar={this.props.setCalendar}
        mes={this.props.mes}
      />
    );
  }
}
