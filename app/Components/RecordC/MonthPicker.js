/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { mesesito, n } from "../Fecha.js";
import Back from "../../Assets/Svg/Back.svg";
import Fordward from "../../Assets/Svg/Fordward.svg";
import moment from "moment";
const month1 = new Date().getMonth() - 1 == -1 ? 0 : new Date().getMonth() - 1;
export default class MonthPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexM: new Date().getMonth() - 1 == -1 ? 11 : new Date().getMonth() - 1,
      indexA:
        new Date().getMonth() == 0
          ? moment().format("YYYY") - 1
          : moment().format("YYYY")
    };
  }

  increase(valor, months, years) {
    if (valor == "mes") {
      this.setState(
        {
          indexM: this.state.indexM + months
        },
        () => {
          if (this.state.indexM == 12) {
            this.setState({
              indexM: 11
            });
          }
          if (
            this.state.indexM == 12 &&
            this.state.indexA < moment().format("YYYY") - 1
          ) {
            this.setState({
              indexM: 0,
              indexA: this.state.indexA + 1
            });
          }
        }
      );
      console.log("MES" + this.state.indexM);
    } else if (valor == "año") {
      if (
        new Date().getMonth() == 0 &&
        this.state.indexA == moment().format("YYYY") - 1
      ) {
        this.setState(
          {
            indexA: this.state.indexA
          },
          () => {
            this.setState({
              disabled: true
            });
          }
        );
      } else if (this.state.indexA < moment().format("YYYY")) {
        this.setState({
          indexA: this.state.indexA + years
        });
      }
      console.log("AÑO" + this.state.indexA);
    }

    this.props.function(months, years);
  }
  decrease(valor, months, years) {
    console.log(this.state.indexM);

    if (valor == "mes") {
      this.setState(
        {
          indexM: this.state.indexM + months
        },
        () => {
          if (this.state.indexM == -1) {
            this.setState({
              indexM: 11,
              indexA: this.state.indexA - 1
            });
          }
        }
      );
      console.log("MES DRECREASE " + this.state.indexM);
    } else if (valor == "año") {
      this.setState({
        indexA: this.state.indexA + years
      });
      console.log("AÑO DRECREASE " + this.state.indexA);
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
          <TouchableOpacity
            onPress={() => this.increase("año", 0, 1)}
            disabled={
              this.state.indexA == moment().format("YYYY") - 1 ? true : false
            }
          >
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
