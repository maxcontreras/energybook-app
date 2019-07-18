/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
export default class Fecha extends Component {
  render() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Domingo";
    weekday[1] = "Lunes";
    weekday[2] = "Martes";
    weekday[3] = "Miércoles";
    weekday[4] = "Jueves";
    weekday[5] = "Viernes";
    weekday[6] = "Sábado";
    var n = weekday[d.getDay()];
    var d = new Date();
    var month = new Array();
    month[0] = "Enero";
    month[1] = "Febrero";
    month[2] = "Marzo";
    month[3] = "Abril";
    month[4] = "Mayo";
    month[5] = "Junio";
    month[6] = "Julio";
    month[7] = "Agosto";
    month[8] = "Septiembre";
    month[9] = "Octubre";
    month[10] = "Noviembre";
    month[11] = "Deciembre";
    var mes = month[d.getMonth()];
    return (
      <Text style={styles.fecha}>
        {n} {date} de {mes}
      </Text>
    );
  }
}
const styles = StyleSheet.create({
  fecha: {
    textAlign: "right",
    justifyContent: "center",
    paddingRight: 20,
    paddingBottom: 5,
    fontSize: 12
  }
});
/*
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

export default Today = mm + '/' + dd + '/' + yyyy;*/
