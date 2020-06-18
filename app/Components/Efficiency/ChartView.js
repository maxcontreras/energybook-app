import React, {Component} from 'react';
import {View, Text, Dimensions, Platform, StyleSheet} from 'react-native';
import {Load} from '../../Components/Global/index';
import FusionCharts from 'react-native-fusioncharts';
import {isPortrait, screenHeight, screenWidth} from '../../Assets/constants';
export default class ChartView extends Component {
  constructor(props) {
    isPortrait();
    super(props);
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
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

  render() {
    return (
      <View
        style={[
          styles.container,
          {height: this.props.indicator ? 'auto' : 500},
        ]}>
        {this.props.error && (
          <Text>Error al obtener los datos del medidor</Text>
        )}
        {this.props.indicator && <Load />}
        {this.props.isConsumption && !this.props.error && (
          <FusionCharts
            type={'column2d'}
            width={'100%'}
            height={520}
            dataFormat={'json'}
            dataSource={this.props.dataSource}
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
    height: 500,
    paddingTop: 20,
    overflow: 'hidden',
  },
});
