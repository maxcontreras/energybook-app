//VIEW FOR HEADER IN MENSUAL CARD
import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {getFontSize} from '../../Assets/constants';
import {CalendarIcon} from '../../Assets/Svg/Design/index';
const fontSize = getFontSize('large');
export default class MensualDates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mesesito: this.props.mes,
      calendar: false,
    };
  }

  sendActiveCalendar() {
    this.setState({calendar: !this.state.calendar}, () => {
      this.props.setCalendar(this.state.calendar);
    });
  }

  render() {
    return (
      <View style={styles.titleContainer}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: fontSize.title + 5}}>
            {this.state.mesesito}
          </Text>
        </View>
        <TouchableOpacity
          style={{width: 'auto', height: 'auto'}}
          onPress={() => {
            this.sendActiveCalendar();
          }}>
          <CalendarIcon />
        </TouchableOpacity>
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
