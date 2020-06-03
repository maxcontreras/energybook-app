import React, {Component} from 'react';
import {StyleSheet, Dimensions, Platform, View} from 'react-native';
import {isPortrait} from '../../Assets/constants';
import {ActivityIndicator, Chart} from '../../Components/Global/index';
export default class ChartView extends Component {
  constructor(props) {
    isPortrait();
    super(props);
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  render() {
    return (
      <View style={[styles.chart]}>
        {this.props.indicator && <ActivityIndicator />}
        {this.props.arrayWithData && !this.props.indicator && (
          <Chart
            type={'column2d'}
            caption={this.props.caption}
            data={this.props.arrayWithData}
            numSteps={this.props.numSteps}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chart: {
    justifyContent: 'center',
    height: 'auto',
  },
});
