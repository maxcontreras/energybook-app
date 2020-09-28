//CHARTS FOR DASHBOARD
import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {MainCharts, PrecioCFEPeriodo} from './index';
import {
  isPortrait,
  screenHeight,
  screenWidth,
  getCardWidth,
} from '../../Assets/constants';
const cardWidth = getCardWidth(2);

export default class Part2 extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      values: [],
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  static navigationOptions = {
    header: null,
  };

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  render() {
    return (
      <View
        style={[
          this.state.orientation == 'portrait'
            ? styles.containerP
            : styles.containerL,
        ]}>
        <MainCharts
          dp={this.props.dp}
          maxVal={this.props.maxVal}
          minVal={this.props.minVal}
          adminMeterId={this.props.adminMeterId}
          devices={this.props.devices}
          meterId={this.props.meterId}
        />
        {this.state.orientation == 'portrait' && <PrecioCFEPeriodo />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerP: {
    justifyContent: 'center',
    width: Math.min(screenHeight, screenWidth),
  },
  containerL: {
    width: cardWidth,
  },
});
