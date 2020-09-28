/* @flow */
/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {mesesito, n} from '../../Assets/constants';
import {Back, Fordward} from '../../Assets/Svg/Design/index';
import moment from 'moment';
export default class MonthPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexM: new Date().getMonth() - 1 == -1 ? 11 : new Date().getMonth() - 1,
      indexA:
        new Date().getMonth() == 0
          ? moment().format('YYYY') - 1
          : moment().format('YYYY'),
    };
  }

  increase(valor, months, years) {
    //validations to increase month
    if (valor == 'mes') {
      this.setState(
        {
          //sets the value in state and validates it after
          indexM: this.state.indexM + months,
        },
        () => {
          // if month is bigger than december
          if (this.state.indexM == 12) {
            // and if year is lower than the actual year - 1
            if (this.state.indexA < moment().format('YYYY') - 1) {
              // month will be set to 0 (january)
              //the year will be increased
              this.setState({
                indexM: 0,
                indexA: this.state.indexA + 1,
              });
            }
            //same here
            this.setState({
              indexM: 0,
              indexA: this.state.indexA + 1,
            });
            // if month is equal to the actual month - 1 and the year is equal to the actual year
          } else if (
            this.state.indexM == new Date().getMonth() - 1 &&
            this.state.indexA == moment().format('YYYY')
          ) {
            //month can no longer be increased
            this.setState({
              indexM: new Date().getMonth() - 1,
            });
          }
        },
      );
    } else if (valor == 'año') {
      //if actual month is january  and year is equal to actual year - 1
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
              indexA: parseInt(this.state.indexA) - 1,
            });
          }
        },
      );
    } else if (valor == 'año') {
      this.setState({
        indexA: parseInt(this.state.indexA) + years,
      });
    }
    this.props.function(months, years, mesesito[this.state.indexM]);
  }
  render() {
    console.log('MES ACTUAL ' + new Date().getMonth());

    return (
      <View style={styles.container}>
        <View style={styles.Pcontainer}>
          <TouchableOpacity onPress={() => this.decrease('mes', -1, 0)}>
            <Back style={{width: 30, height: 30}} />
          </TouchableOpacity>
          <View style={styles.textView}>
            <Text style={styles.infoText}>{mesesito[this.state.indexM]}</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.increase('mes', 1, 0)}
            disabled={
              this.state.indexA == moment().format('YYYY') &&
              this.state.indexM == new Date().getMonth() - 1
                ? true
                : false
            }>
            <Fordward style={{width: 30, height: 30}} />
          </TouchableOpacity>
        </View>
        <View style={styles.Pcontainer}>
          <TouchableOpacity onPress={() => this.decrease('año', 0, -1)}>
            <Back style={{width: 30, height: 30}} />
          </TouchableOpacity>
          <View style={styles.textView}>
            <Text style={styles.infoText}>{this.state.indexA}</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.increase('año', 0, 1)}
            disabled={
              this.state.indexA == moment().format('YYYY') ||
              (this.state.indexA == moment().format('YYYY') - 1 &&
                this.state.indexM >= new Date().getMonth())
                ? true
                : false
            }>
            <Fordward style={{width: 30, height: 30}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
