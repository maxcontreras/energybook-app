import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  PixelRatio
} from "react-native";
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
    var titleWeight = 12;
    var valueWeight = 12;

    if (PixelRatio.get() <= 1) {
      titleWeight = 12;
      valueWeight = 11;
    } else if (PixelRatio.get() <= 2) {
      titleWeight = 13;
      valueWeight = 12;
    } else if (PixelRatio.get() <= 3) {
      titleWeight = 14;
      valueWeight = 13;
    } else if (PixelRatio.get() <= 3.5) {
      titleWeight = 15;
      valueWeight = 14;
    }
    console.log(PixelRatio.get());

    return (
      <Card
        title={
          <View style={styles.titleContainer}>
            <Text>Hoy</Text>
            <Text>{fecha}</Text>
          </View>
        }
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
        <View>
          <View style={{ flexDirection: "row", paddingTop: 10 }}>
            <View style={styles.iconView}>
              <Icono style={styles.icon} />
            </View>
            <View style={styles.view1}>
              <Text style={{ fontWeight: "bold", fontSize: titleWeight }}>
                {this.props.title}
              </Text>
              <Text style={{ fontSize: 12 }}>{this.props.valuekwh}</Text>
            </View>

            <View style={styles.view2}>
              <Text style={{ fontSize: valueWeight }}>
                {this.props.valuePrice}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }}></View>

            <View style={styles.uaView}>
              <Text style={{ fontSize: 10 }}>
                Última actualización: {this.props.ultima}
              </Text>
            </View>
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
    height: 120,
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
  icon: {
    height: 35,
    width: 35
  },
  titleContainer: {
    height: "auto",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#CDCBCB"
  },
  iconView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  view1: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  view2: {
    flex: 0.75,
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },

  uaView: {
    flex: 0.75,
    padding: 10
  }
});
