// MONTHE SELECTOR FOR MENSUAL CARD

import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {mesesito, n} from '../../Assets/constants';
import {Back, Fordward} from '../../Assets/Svg/Design/index';
import moment from 'moment/min/moment-with-locales';
import {screenHeight, screenWidth} from '../../Assets/constants';
export default class MonthPickerEF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexM: new Date().getMonth(),
      indexA: moment().format('YYYY'),
    };
  }

  increase(valor, months, years) {
    if (valor == 'mes') {
      this.setState(
        {
          indexM: this.state.indexM + months,
        },
        () => {
          if (this.state.indexM == 12) {
            if (this.state.indexA < moment().format('YYYY') - 1) {
              this.setState({
                indexM: 0,
                indexA: this.state.indexA + 1,
              });
            }
            this.setState({
              indexM: 0,
              indexA: this.state.indexA + 1,
            });
          } else if (
            this.state.indexM == new Date().getMonth() &&
            this.state.indexA == moment().format('YYYY')
          ) {
            this.setState({
              indexM: new Date().getMonth(),
            });
          }
        },
      );
    } else if (valor == 'año') {
      if (
        new Date().getMonth() == 0 &&
        this.state.indexA == moment().format('YYYY') - 1
      ) {
        this.setState({
          indexA: this.state.indexA,
        });
      } else if (this.state.indexA < moment().format('YYYY')) {
        this.setState({
          indexA: this.state.indexA + years,
        });
      } else if (
        this.state.indexA == moment().format('YYYY') - 1 &&
        this.state.indexM == new Date().getMonth()
      ) {
      }
    }

    this.props.function(months, years, mesesito[this.state.indexM]);
  }
  decrease(valor, months, years) {
    if (valor == 'mes') {
      this.setState(
        {
          indexM: this.state.indexM + months,
        },
        () => {
          if (this.state.indexM == -1) {
            this.setState({
              indexM: 11,
              indexA: this.state.indexA - 1,
            });
          }
        },
      );
    } else if (valor == 'año') {
      this.setState({
        indexA: this.state.indexA + years,
      });
    }
    this.props.function(months, years, mesesito[this.state.indexM]);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Pcontainer}>
          <TouchableOpacity onPress={() => this.decrease('mes', -1, 0)}>
            <Back style={{width: 30, height: 30}} />
          </TouchableOpacity>
          <View style={styles.textView}>
            <Text style={styles.infoText}>{this.props.mes}</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.increase('mes', 1, 0)}
            disabled={false}>
            <Fordward style={{width: 30, height: 30}} />
          </TouchableOpacity>
        </View>
        <View style={styles.Pcontainer}>
          <TouchableOpacity onPress={() => this.decrease('año', 0, -1)}>
            <Back style={{width: 30, height: 30}} />
          </TouchableOpacity>
          <View style={styles.textView}>
            <Text style={styles.infoText}>{this.props.año}</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.increase('año', 0, 1)}
            disabled={false}>
            <Fordward style={{width: 30, height: 30}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Math.min(screenHeight, screenWidth) - 40,
    height: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
  infoText: {
    color: 'black',
    fontSize: 13,
    textAlign: 'center',
  },
  textView: {
    borderRadius: 10,
    marginBottom: 5,
    height: 'auto',
    backgroundColor: '#E8ECEF',
    width: 150,
    justifyContent: 'center',
    padding: 10,
    margin: 10,
  },
  Pcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
