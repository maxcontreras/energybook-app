import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import { date, n, mes } from "../Fecha.js";
import Consumo from "../../Assets/Svg/Consumo.svg";
import Distribucion from "../../Assets/Svg/Distribucion.svg";
import Capacidad from "../../Assets/Svg/Capacidad.svg";
import Fp from "../../Assets/Svg/Fp.svg";
import { Card } from "react-native-elements";

export default class Daily extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var fecha = date + " " + n + " " + "de" + " " + mes;
    if (this.props.title == "Consumo") {
      var Icono = Consumo;
    } else if (this.props.title == "Distribución") {
      var Icono = Distribucion;
    } else if (this.props.title == "Cpacidad") {
      var Icono = Capacidad;
    } else {
      var Icono = Fp;
    }

    return (
      <View style={styles.container}>
        <Card
          title={fecha}
          containerStyle={[
            styles.containerCard,

            this.state.orientation == "portrait"
              ? { width: Math.min(screenWidth, screenHeight) - 20 }
              : { width: Math.min(screenWidth, screenHeight) - 20 }
          ]}
          titleStyle={styles.titleStyle}
          wrapperStyle={{ borderRadius: 10 }}
        >
          <View style={styles.innerCard}>
            <View style={styles.iconPart}>
              <Icono style={styles.icon} />
            </View>
            <View style={styles.textPart}>
              <Text style={[styles.middleText, styles.titleWeight]}>
                {this.props.title}
              </Text>
              <Text style={styles.middleText}>{this.props.valuekwh}</Text>
            </View>
            <View style={styles.valuePart}>
              <Text style={styles.priceText}>{this.props.valuePrice}</Text>
            </View>
            <View style={styles.ultimaAcualizacion}>
              <Text style={styles.lastText}>
                Última actualización: {this.props.ultima}
              </Text>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

var screenHeight = Math.round(Dimensions.get("window").height);
var screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center"
  },
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  titleStyle: {
    color: "black",
    fontSize: 10,
    fontWeight: "normal",
    margin: 10,
    textAlign: "right",
    height: 10,
    justifyContent: "center"
  },

  containerCard: {
    height: 110,
    padding: 0,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: "black",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2
      },
      android: {
        elevation: 5
      }
    })
  },
  middleText: { fontSize: 12 },
  innerCard: {
    alignItems: "center",
    flexDirection: "row",
    height: 60,
    borderRadius: 10
  },
  iconPart: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0.75,
    height: 60,
    paddingBottom: 12
  },
  textPart: {
    justifyContent: "space-between",
    flex: 1,
    height: 60,
    paddingBottom: 20,
    paddingTop: 10
  },
  valuePart: {
    justifyContent: "flex-end",
    flex: 1,
    height: 60,
    paddingBottom: 20,
    paddingTop: 10,
    alignItems: "center"
  },
  icon: {
    height: 35,
    width: 35
  },
  priceText: {
    fontSize: 12,
    marginRight: 10,
    textAlign: "right"
  },
  ultimaAcualizacion: {
    justifyContent: "flex-end",
    flex: 1.7,
    height: 60,
    paddingBottom: 20,
    paddingTop: 10,
    alignItems: "center"
  },
  titleWeight: {
    fontWeight: "bold"
  },
  lastText: {
    fontSize: 10,
    marginRight: 10
  },
  marginMiddle: {
    marginTop: 10
  }
});
