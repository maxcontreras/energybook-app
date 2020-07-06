import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Platform, Text} from 'react-native';
import FusionCharts from 'react-native-fusioncharts';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {
  screenHeight,
  screenWidth,
  getCardWidth,
  isPortrait,
} from '../../Assets/constants';
import {pieData} from '../../Assets/Functions/role2';
import {Load} from '../Global/index';
const mapStateToProps = state => ({
  readings: state.dailyReducer.devices,
  adminIds: state.adminReducer,
});
const cardWidth = getCardWidth(2.2);

class PieChart extends Component {
  constructor(props) {
    isPortrait();
    super(props);
    this.state = {
      values: [],
      valores: [],
      totalito: {},
      indicator: true,
      meterId: '',
      noData: false,
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
    this._getdata = this._getdata.bind(this);
  }
  UNSAFE_componentWillMount() {
    this._retrieveData();
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        this.setState(
          {
            values: JSON.parse(value),
          },
          () => {
            this._getdata();
          },
        );
      }
    } catch (error) {}
  };
  _getdata = async () => {
    let array = [];
    let PieChart = [];
    for (var i = 1; i < this.props.devices.length; i++) {
      array.push(this.props.devices[i]);
    }

    for (var j in array) {
      console.log(array[j]);
      let res = await axios({
        method: 'POST',
        url: `http://api.ienergybook.com/api/Meters/standardReadings?access_token=${
          this.state.values.accesToken
        }`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          id:
            this.props.adminIds.meter_id != ''
              ? this.props.adminIds.meter_id
              : this.props.meterId,
          device: array[j].name,
          service: '',
          variable: 'EPimp',
          filter: 3,
          interval: 3600,
          custom_dates: null,
        },
      }).catch(function(error) {
        if (error.response) {
          this.setState({
            noData: true,
          });
        }
      });
      let consumo = 0.0;
      for (i in res.data) {
        consumo += res.data[i].value;
      }
      PieChart.push({
        label: array[j].description,
        value: consumo.toFixed(2),
      });
      this.setState({
        totalito: PieChart,
        indicator: false,
      });
    }
  };

  render() {
    let chartData = pieData(this.state.totalito);
    console.log(chartData);

    return (
      <Card
        containerStyle={[
          styles.cardStyle,
          this.state.orientation == 'portrait'
            ? {width: Math.min(screenWidth, screenHeight) - 20}
            : {width: cardWidth},
        ]}>
        <View style={styles.chartContainer}>
          {this.state.indicator && <Load />}
          {!this.state.indicator && this.state.noData && (
            <Text style={styles.error}>
              Error al obtener lecturas del medidor
            </Text>
          )}
          {!this.state.indicator && !this.state.noData && (
            <FusionCharts
              style={{borderRadius: 10}}
              showNames={'0'}
              showValues={'0'}
              type={chartData.type}
              width={chartData.width}
              height={chartData.height}
              dataFormat={chartData.dataFormat}
              dataSource={chartData}
              libraryPath={this.libraryPath}
            />
          )}
        </View>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(PieChart);

const styles = StyleSheet.create({
  chartContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    paddingTop: 10,
  },
  cardStyle: {
    padding: 0,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  error: {
    color: 'black',
    fontSize: 10,
  },
});
