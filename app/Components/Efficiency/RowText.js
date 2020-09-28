// VIEW FOR TEXT DATA ROWS INSIDE EFFICIENCY CARDS
import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {getFontSize} from '../../Assets/constants';
import AsyncStorage from '@react-native-community/async-storage';
let fontSize = getFontSize('large');
import {DayInput} from './index';
export default class RowText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      formula1: 0.0,
    };
  }

  UNSAFE_componentWillMount() {
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        this.setState(
          {
            values: JSON.parse(value),
          },
          () => {},
        );
      }
    } catch (error) {}
  };

  render() {
    var key = 0;
    return (
      <View style={styles.container}>
        {this.props.data.map(datos => (
          <View key={key++} style={styles.dataView}>
            <View style={[styles.third]}>
              <Text style={styles.titleView1}>{datos.title}</Text>
            </View>
            <View style={styles.third}>
              {datos.value == 0 && datos.title != 'Producción' && (
                <ActivityIndicator size="small" color="#586365" />
              )}
              {datos.value != 0 && datos.title != 'Producción' && (
                <Text style={styles.valueView}>{datos.value}</Text>
              )}
            </View>
            <View style={[styles.third]}>
              {datos.price == 0 && datos.title != 'Producción' && (
                <ActivityIndicator size="small" color="#586365" />
              )}
              {datos.price != 0 && datos.title != 'Producción' && (
                <Text style={styles.priceView}>{datos.price}</Text>
              )}
              {this.props.type != 'mensual' && datos.title == 'Producción' && (
                <DayInput
                  changeInput={this.props.changeInput}
                  dayProduction={this.props.dayProduction}
                  showDayProd={this.props.showDayProd}
                  valueDayProd={this.props.valueDayProd}
                />
              )}
              {this.props.type == 'mensual' && datos.title == 'Producción' && (
                <Text style={styles.priceView}>{this.props.monthProd} tnl</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    flex: 2.5,
  },
  dataView: {
    height: 'auto',
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#D5D5D5',
    marginHorizontal: 10,
  },
  third: {
    flex: 1,
    height: 'auto',
    padding: 10,
    justifyContent: 'center',
  },
  titleView1: {
    fontSize: fontSize.title,
    color: 'black',
  },
  valueView: {
    fontSize: fontSize.normal,
    color: 'black',
  },
  priceView: {
    fontSize: fontSize.normal,
    textAlignVertical: 'bottom',
    color: 'black',
  },
  inputView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    padding: 10,
    height: 40,
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#F1F2F4',
    marginRight: 10,
  },
});
