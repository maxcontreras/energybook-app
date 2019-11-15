import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import Orientation from "react-native-orientation";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { n, date, mes } from "./Fecha.js";
import GenIcon from "../Assets/Svg/GeneracionGene.svg";
import Eco2E from "../Assets/Svg/Eco2E.svg";
import Fe from "../Assets/Svg/FE.svg";
import ConsumoIcon from "../Assets/Svg/Consumo.svg";
import AutoConsumo from "../Assets/Svg/AutoConsumo.svg";
import Inyeccion from "../Assets/Svg/Inyeccion.svg";
import TotalIcon from "../Assets/Svg/Total.svg";
import LimiteIcon from "../Assets/Svg/LimiteE.svg";
import "moment/min/moment-with-locales";

export default class GenerationCard extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  componentWillMount() {
    Orientation.unlockAllOrientations();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }
  render() {
    var fecha = date + " " + n + " " + "de" + " " + mes;
    if (this.props.pantalla == "generacion") {
      if (this.props.numero == "3") {
        var variable1 = "Generación";
        var variable2 = "Autoconsumo";
        var variable3 = "Inyeccion a la red";
        var Icono1 = GenIcon;
        var Icono2 = AutoConsumo;
        var Icono3 = Inyeccion;
        if (this.props.value == "kwh") {
          var valor1 = this.props.values
            ? this.props.values.generation.toFixed(3) + " kwh"
            : "0 kwh";
          var valor2 = this.props.values
            ? this.props.values.selfConsumption.toFixed(3) + " kwh"
            : "0 kwh";
          var valor3 = this.props.values
            ? this.props.values.networkInjection.toFixed(3) + " kwh"
            : "0 kwh";
        } else if (this.props.value == "$") {
          var valor1 = this.props.values
            ? "$ " + this.props.values.generationValue.toFixed(3)
            : "$0";
          var valor2 = this.props.values
            ? "$ " + this.props.values.selfConsumptionValue.toFixed(3)
            : "$0";
          var valor3 = this.props.values
            ? "$ " + this.props.values.networkInjectionValue.toFixed(3)
            : "$0";
        }
      } else if (this.props.numero == "2") {
        var variable1 = "Eco2E";
        var variable2 = " FE";
        var variable3 = " ";
        var Icono1 = Eco2E;
        var Icono2 = Fe;
        var valor1 = this.props.values
          ? this.props.values.co2e.toFixed(3) + " " + "t"
          : "0 t";
        var valor2 = this.props.values
          ? this.props.values.emissionFactor.toFixed(3)
          : 0;
      }
    } else if (this.props.pantalla == "carbon") {
      if (this.props.numero == "3") {
        var variable1 = "Consumo";
        var variable2 = "Generación";
        var variable3 = "Total";
        var Icono1 = ConsumoIcon;
        var Icono2 = GenIcon;
        var Icono3 = TotalIcon;
        var valor1 = this.props.values
          ? this.props.values.consumption.toFixed(3) + " kwh"
          : "0 kwh";
        var valor2 = this.props.values
          ? this.props.values.generation.toFixed(3) + " kwh"
          : "0 kwh";
        var valor3 = this.props.values
          ? this.props.values.total.toFixed(3) + " kwh"
          : "0 kwh";
      } else if (this.props.numero == "2") {
        var variable1 = "FE";
        var variable2 = "Limite Eco2e";
        var variable3 = " ";
        var Icono1 = Fe;
        var Icono2 = LimiteIcon;
        var valor1 = this.props.values
          ? this.props.values.emissionFactor.toFixed(3)
          : 0;
        var valor2 = this.props.values
          ? this.props.values.co2Limit.toFixed(3)
          : 0;
      } else if (this.props.numero == "1") {
        var variable1 = "Eco2e";
        var variable2 = " ";
        var variable3 = " ";
        var Icono1 = Eco2E;
        var valor1 = this.props.values
          ? this.props.values.cO2Emissions.toFixed(3) + " t"
          : "0 t";
      }
    }
    const uno = screenHeight / 3.2;
    const dos = screenWidth / 3.2;

    const unou = screenWidth - 20;
    const dosd = screenHeight - 20;

    return (
      <Card
        title={fecha}
        containerStyle={{
          ...styles.containerCard,
          width:
            screenWidth < screenHeight
              ? this.state.orientation == "landscape"
                ? uno
                : unou
              : this.state.orientation == "landscape"
              ? dos
              : dosd
        }}
        titleStyle={styles.titleStyle}
        wrapperStyle={{ borderRadius: 10 }}
      >
        <View
          style={[
            styles.innerCard,
            this.props.numero == "3" ? null : styles.height2bottom
          ]}
        >
          <View
            style={[
              styles.iconPart,
              this.props.numero == "3" ? null : styles.height2bottom
            ]}
          >
            <Icono1 style={styles.icon} />
            {this.props.numero != "1" && <Icono2 style={styles.icon} />}
            {this.props.numero == "3" && <Icono3 style={styles.icon} />}
          </View>
          <View
            style={[
              styles.textPart,
              this.props.numero == "3" ? null : styles.height2bottom
            ]}
          >
            <Text style={styles.middleText}>{variable1}</Text>
            <Text style={styles.middleText}>{variable2}</Text>

            {this.props.numero == "3" && (
              <Text style={styles.middleText}>{variable3}</Text>
            )}
          </View>
          <View
            style={[
              styles.valuePart,
              this.props.numero == "3" ? null : styles.height2bottom
            ]}
          >
            <Text style={styles.priceText}>{valor1}</Text>
            {this.props.numero != "1" && (
              <Text style={styles.priceText}>{valor2}</Text>
            )}
            {this.props.numero == "3" && (
              <Text style={styles.priceText}>{valor3}</Text>
            )}
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
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "red"
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
    height: 180,
    margin: 5,
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
    height: 130,
    borderRadius: 10
  },
  iconPart: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    height: 130,
    paddingBottom: 12
  },
  textPart: {
    justifyContent: "space-between",
    flex: 1.5,
    height: 130,
    paddingBottom: 20,
    paddingTop: 10
  },
  valuePart: {
    justifyContent: "space-between",
    flex: 1,
    height: 130,
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
  height2bottom: {
    height: 100
  },
  width: {
    width: screenHeight / 3.2
  },
  height: {
    width: screenWidth / 3.2
  }
});