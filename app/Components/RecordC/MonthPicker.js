/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { mesesito, n } from "../Fecha.js";
import Back from "../../Assets/Svg/Back.svg";
import Fordward from "../../Assets/Svg/Fordward.svg";
import moment from "moment";

export default class MonthPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexM: new Date().getMonth() - 1,
      indexA: moment().format("YYYY")
    };
  }

  increase(valor, months, years) {
    if (valor == "mes") {
      const newMonth = ++this.state.indexM;
      const compareDate = new Date().getMonth() - 1;
      this.setState({
        indexM: newMonth > compareDate ? compareDate : newMonth
      });
    }
    const newYear = ++this.state.indexA;
    const compareDate = moment().format("YYYY");
    this.setState({
      indexA: newYear > compareDate ? compareDate : newYear
    });

    this.props.function(months, years);
  }
  decrease(valor, months, years) {
    if (valor == "mes") {
      this.setState(
        {
          indexM: --this.state.indexM
        },
        () => {
          if (this.state.indexM == -1) {
            this.setState({
              indexM: new Date().getMonth() - 1,
              indexA: --this.state.indexA
            });
          }
        }
      );
    } else if (valor == "año") {
      this.setState({
        indexA: --this.state.indexA
      });
    }
    this.props.function(months, years);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Pcontainer}>
          <TouchableOpacity onPress={() => this.decrease("mes", -1, 0)}>
            <Back style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <View style={styles.textView}>
            <Text style={styles.infoText}>{mesesito[this.state.indexM]}</Text>
          </View>
          <TouchableOpacity onPress={() => this.increase("mes", 1, 0)}>
            <Fordward style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.Pcontainer}>
          <TouchableOpacity onPress={() => this.decrease("año", 0, -1)}>
            <Back style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <View style={styles.textView}>
            <Text style={styles.infoText}>{this.state.indexA}</Text>
          </View>
          <TouchableOpacity onPress={() => this.increase("año", 0, 1)}>
            <Fordward style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  infoText: {
    color: "black",
    fontSize: 13,
    textAlign: "center"
  },
  textView: {
    borderRadius: 10,
    marginBottom: 5,
    height: "auto",
    backgroundColor: "#E8ECEF",
    width: 150,
    justifyContent: "center",
    padding: 10,
    margin: 10
  },
  Pcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  }
});
