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
      indexM: 0,
      indexA: moment().format("YYYY")
    };
  }
  increase(valor) {
    if (valor == "mes") {
      this.setState(
        {
          indexM: ++this.state.indexM
        },
        () => {
          if (this.state.indexM == 12) {
            this.setState({
              indexM: 0,
              indexA: ++this.state.indexA
            });
          }
        }
      );
      console.log(this.state.indexM);
    } else if (valor == "año") {
      this.setState({
        indexA: ++this.state.indexA
      });
    }
  }
  decrease(valor) {
    if (valor == "mes") {
      this.setState(
        {
          indexM: --this.state.indexM
        },
        () => {
          if (this.state.indexM == -1) {
            this.setState({
              indexM: 11,
              indexA: --this.state.indexA
            });
          }
        }
      );
      console.log(this.state.indexM);
    } else if (valor == "año") {
      this.setState({
        indexA: --this.state.indexA
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Pcontainer}>
          <TouchableOpacity onPress={() => this.decrease("mes")}>
            <Back style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <View style={styles.textView}>
            <Text style={styles.infoText}>{mesesito[this.state.indexM]}</Text>
          </View>
          <TouchableOpacity onPress={() => this.increase("mes")}>
            <Fordward style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.Pcontainer}>
          <TouchableOpacity onPress={() => this.decrease("año")}>
            <Back style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <View style={styles.textView}>
            <Text style={styles.infoText}>{this.state.indexA}</Text>
          </View>
          <TouchableOpacity onPress={() => this.increase("año")}>
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
