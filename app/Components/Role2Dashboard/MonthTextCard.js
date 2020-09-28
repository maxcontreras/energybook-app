//ROW OF INFORMATION AND ICON INSIDE MONTHLY CARD IN DASHBOARD
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getFontSize} from '../../Assets/constants';
const fontSize = getFontSize('large');
export default class MonthTextCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.viewDatos, {width: this.props.width}]}>
        <View style={styles.view1}>
          <this.props.Icon style={styles.icon} />
        </View>
        <View style={styles.view2}>
          <Text style={[styles.middleText, styles.titleWeightt]}>
            {this.props.title}
          </Text>
          <Text style={styles.middleText}>{this.props.value}</Text>
        </View>
        <View style={styles.view3}>
          <Text style={styles.priceText}>{this.props.price}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  middleText: {fontSize: fontSize.title, marginBottom: 10},
  icon: {
    height: 35,
    width: 35,
  },
  priceText: {
    fontSize: fontSize.normal,
    marginBottom: 10,
    textAlign: 'right',
  },
  titleWeightt: {
    fontWeight: 'bold',
  },
  view1: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view2: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  view3: {
    flex: 0.75,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  viewDatos: {
    flex: 1,
    flexDirection: 'row',
  },
});
