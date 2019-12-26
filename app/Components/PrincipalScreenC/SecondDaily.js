import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import { date, n, mes } from "../Fecha.js";
import Consumo from "../../Assets/Svg/Consumo.svg";
import Distribucion from "../../Assets/Svg/Distribucion.svg";
import Capacidad from "../../Assets/Svg/Capacidad.svg";
import Fp from "../../Assets/Svg/Fp.svg";
import { Card } from "react-native-elements";
import StaticSafeAreaInsets from "react-native-static-safe-area-insets";

export default class Daily extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    this.state = {
      url: "",
      monthlyTCC: "",
      values: [],
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
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
    const insetsIos =
      (Math.max(screenHeight, screenWidth) -
        (Math.max(
          StaticSafeAreaInsets.safeAreaInsetsTop,
          StaticSafeAreaInsets.safeAreaInsetsRight
        ) +
          Math.max(
            StaticSafeAreaInsets.safeAreaInsetsBottom,
            StaticSafeAreaInsets.safeAreaInsetsLeft
          ))) /
      2.2;
    const insetsAndroid = Math.max(screenHeight, screenWidth) / 2.2;

    return (
      <Card
        title={fecha}
        containerStyle={[
          styles.containerCard,
          {
            width:
              this.state.orientation == "portrait"
                ? Math.min(screenWidth, screenHeight) - 20
                : Platform.OS == "android"
                ? insetsAndroid
                : insetsIos
          }
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titleStyle: {
    color: "black",
    fontSize: 10,
    fontWeight: "normal",
    margin: 10,
    textAlign: "right",
    height: "auto",
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
