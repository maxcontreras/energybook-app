import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {DashboardChart, PieChart} from './index';
import {
  screenHeight,
  screenWidth,
  isPortrait,
  getCardWidth,
} from '../../Assets/constants';
const cardWidth = getCardWidth(2);
export default class MainCharts extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }

  render() {
    let realDP = Math.sign(this.props.dp) == -1 ? 0 : this.props.dp;
    return (
      <View
        style={[
          this.state.orientation == 'portrait'
            ? styles.chartsP
            : styles.chartsL,
        ]}>
        <DashboardChart
          progressColor={'green'}
          dp={realDP}
          maxVal={this.props.maxVal}
          minVal={this.props.minVal}>
          <Text style={{fontSize: 10}}>kW</Text>
        </DashboardChart>
        <View style={styles.pieView}>
          {this.props.adminMeterId != null && this.props.meterId != '' && (
            <PieChart
              adminMeterId={this.props.adminMeterId}
              devices={this.props.devices}
              meterId={this.props.meterId}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chartsL: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'space-between',
    width: cardWidth,
  },
  chartsP: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: Math.min(screenHeight, screenWidth),
  },
  pieView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
});
