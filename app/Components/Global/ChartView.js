import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Platform} from 'react-native';
import FusionCharts from 'react-native-fusioncharts';
import {Load} from './index';
import DatesPicker from '../Pickers/DatePicker';
import {screenHeight, screenWidth, isPortrait} from '../../Assets/constants';

export default class ChartView extends Component {
  constructor(props) {
    isPortrait();
    super(props);
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      calendar: false,
      initialDate: '',
      endDate: '',
    };
    this.libraryPath = Platform.select({
      ios: require('../../../assets/fusioncharts.html'),
      android: {uri: 'file:///android_asset/fusioncharts.html'},
    });
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  setInitial(date) {
    this.setState({
      initialDate: date,
    });
  }
  setEnd(date) {
    let customdates = {
      from: `${this.state.initialDate}`,
      until: `${date}`,
    };

    this.props.setDates(false, this.state.initialDate, date, customdates, -1);
  }
  render() {
    return (
      <View
        style={[
          styles.container,
          this.props.indicator ? {height: 500} : {height: 'auto'},
        ]}>
        {this.props.calendar && (
          <DatesPicker
            initialDate={this.props.initialDate}
            endDate={this.props.endDate}
            setInitial={this.setInitial.bind(this)}
            setEnd={this.setEnd.bind(this)}
          />
        )}
        {this.props.indicator && <Load />}
        {!this.props.indicator && (
          <FusionCharts
            type={this.props.type}
            width={'100%'}
            height={500}
            dataFormat={'json'}
            dataSource={{
              chart: {
                caption:
                  this.props.caption == `Inyección${'\n'}a la red`
                    ? 'Inyección a la red'
                    : this.props.caption,
                numberprefix: ' ',
                yAxisValueFontSize: '9',
                theme: Platform.OS == 'ios' ? 'ocean' : 'fusion',
                labelDisplay: 'rotate',
                labelStep: this.props.numSteps,
                setAdaptiveYMin: '1',
                showValues: '0',
                labelFontSize: '9',
              },
              data: this.props.data,
            }}
            libraryPath={this.libraryPath}
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
    padding: 10,
  },
});
