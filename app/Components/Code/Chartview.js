//VIEW FOR CALENDAR PICKER AND SCREEN CHART IN NETWORK CODE

import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Load} from '../../Components/Global/index';
import DatesPicker from '../../Components/Pickers/DatePicker';
import FusionCharts from 'react-native-fusioncharts';
import {isPortrait} from '../../Assets/constants';

export default class ChartView extends Component {
  constructor(props) {
    isPortrait();
    super(props);
    this.state = {
      pickerValue: this.props.pickerValue,
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
      <View style={[styles.container]}>
        {this.props.calendar && (
          <DatesPicker
            initialDate={this.props.initialDate}
            endDate={this.props.endDate}
            setInitial={this.props.setInitial}
            setEnd={this.props.setEnd}
          />
        )}
        {this.props.indicator && <Load />}
        {this.props.dataSource.length != 0 && !this.props.indicator && (
          <FusionCharts
            type={'msline'}
            dataFormat={'json'}
            dataSource={this.props.dataSource}
            libraryPath={this.props.libraryPath}
            width={'100%'}
            height={520}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    padding: 10,
    minHeight: 500,
    paddingTop: 20,
    overflow: 'hidden',
    marginBottom: 5,
  },
});
