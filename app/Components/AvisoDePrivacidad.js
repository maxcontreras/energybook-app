import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";

export default class AvisoDePrivacidad extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 5,
          paddingVertical: 10,
          alignItems: "center"
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
            padding: 10,
            backgroundColor: "#F6F5F5"
          }}
        >
          <Text style={{ textAlign: "justify", fontSize: 15, color: "black" }}>
            {
              <Text
                style={{
                  fontSize: 17,
                  color: "black",
                  fontWeight: "bold"
                }}
              >
                {" "}
                Aviso de Privacidad para la Protección de Datos Personales.
              </Text>
            }
            {"\n"}
            {"\n"}
            En términos de lo previsto en la Ley Federal de Protección de Datos
            Personales en Posesión de los Particulares (en lo sucesivo
            denominada como “la Ley”), Energybook, establece el presente Aviso
            de Privacidad de conformidad con lo siguiente: Términos y
            Condiciones{"\n"}
            {"\n"}
            1. El presente Aviso de Privacidad tiene por objeto la protección de
            los datos personales de los integrantes de la comunidad, mediante su
            tratamiento legítimo, controlado e informado, a efecto de garantizar
            su privacidad, así como tu derecho a la autodeterminación
            informativa.
            {"\n"}
            {"\n"}
            2.- Dato Personal es Cualquier información concerniente a una
            persona física identificada o identificable.{"\n"}
            {"\n"}
            3- Al proporcionar tus Datos Personales por escrito, a través de una
            solicitud, formato en papel, formato digital, correo electrónico, o
            cualquier otro documento, aceptas y autorizas a la Energybook a
            utilizar y tratar de forma automatizada tus datos personales e
            información suministrados, los cuales formarán parte de nuestra base
            de datos con la finalidad de usarlos, en forma enunciativa, más no
            limitativa, para: identificarte, ubicarte, comunicarte, contactarte,
            enviarte información y/o bienes, así como para enviarlos y/o
            transferirlos a terceros, dentro y fuera del territorio nacional,
            por cualquier medio que permita la ley para cumplir con nuestros
            fines sociales.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.function()}
        >
          <Text style={styles.btnTxt}>Entendido!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    backgroundColor: "#586365",
    margin: 10
  },
  btn2: {
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  btnTxt: {
    color: "#FFFFFF",
    fontSize: 15
  },
  btnTxt2: {
    color: "#000000",
    fontSize: 12
  }
});
