/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class Fecha extends Component {
  render() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    //var year = new Date().getFullYear(); //Current Year
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
        <Text styles={styles.fecha}>{n} {date} de {mes}</Text>
    );
  }
}

const styles = StyleSheet.create({
  fecha:{
    textAlign: 'right',
    justifyContent: 'center',
  }

});
