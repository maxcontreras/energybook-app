import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getFontSize} from '../../Assets/constants';

const fontSize = getFontSize('mid');

export default class MonthCardTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.titleContainer}>
        <Text style={{fontSize: fontSize.normal}}>Periodo de facturación</Text>
        <Text style={{fontSize: fontSize.normal}}>{this.props.fecha}</Text>
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
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#CDCBCB',
  },
});
