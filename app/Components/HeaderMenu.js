import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

import Charts from "../Assets/Svg/Grafica.svg";
import Costs from "../Assets/Svg/Costo.svg";
import Code from "../Assets/Svg/Codigo.svg";
import Histo from "../Assets/Svg/Histo.svg";
import CarbonF from "../Assets/Svg/HuellaCarbono.svg";
import Generation from "../Assets/Svg/Gene.svg";

import ChartSelect from "../Assets/Svg/graphs.svg";
import CostSelect from "../Assets/Svg/costoS.svg";
import CodeSelect from "../Assets/Svg/codigoS.svg";
import HistoSelect from "../Assets/Svg/histoS.svg";
import CarbonSelect from "../Assets/Svg/huellaS.svg";
import GenerationSelect from "../Assets/Svg/geneS.svg";
import { withNavigation } from "react-navigation";
import Orientation from "react-native-orientation";

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portrait: false,
      landscape: false,
      selected: this.props.selected
    };
  }
  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    if (initial === "PORTRAIT") {
      this.setState({
        portrait: true,
        landscape: false
      });
    } else {
      this.setState({
        portrait: false,
        landscape: true
      });
    }
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
  }
  _orientationDidChange = orientation => {
    if (orientation === "LANDSCAPE") {
      console.log("LANDSCAPE");
      this.setState({
        portrait: false,
        landscape: true
      });
    } else {
      this.setState({
        portrait: true,
        landscape: false
      });
      console.log("PORTRAIT");
    }
  };

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  render() {
    console.log("HEADER" + this.props);
    const data = [
      {
        screen: "Charts",
        Icon: Charts,
        IconS: ChartSelect,
        titulo: "Gráficas"
      },
      { screen: "Costs", Icon: Costs, IconS: CostSelect, titulo: "Costos" },
      {
        screen: "NetworkC",
        Icon: Code,
        IconS: CodeSelect,
        titulo: "Código de red"
      },
      {
        screen: "Record",
        Icon: Histo,
        IconS: HistoSelect,
        titulo: "Historial"
      },
      {
        screen: "CarbonF",
        Icon: CarbonF,
        IconS: CarbonSelect,
        titulo: "Huella de Carbono"
      },
      {
        screen: "Generation",
        Icon: Generation,
        IconS: GenerationSelect,
        titulo: "Generación"
      }
    ];
    var key = 0;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.menu}>
          {data.map(screens => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(screens.screen)}
              style={styles.btn}
              key={key++}
            >
              {screens.screen == this.props.selected ? (
                <screens.IconS style={styles.imageB} />
              ) : (
                <screens.Icon style={styles.imageB} />
              )}
              {screens.screen == this.props.selected && (
                <Text style={styles.btnTxt}>{screens.titulo}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    height: "auto",
    alignItems: "center",
    justifyContent: "center"
  },
  menu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 2,
    width: "auto",
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: "auto"
  },
  btnTxt: {
    color: "#000000",
    fontSize: 10,
    textAlign: "center"
  },
  imageB: {
    height: 30,
    width: 30
  }
});

export default withNavigation(HeaderMenu);
