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
import { withSafeArea } from "react-native-safe-area";

//const SafeAreaView = withSafeArea(View, 'absolutePosition', 'vertical')

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
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Charts")}
            style={styles.btn}
          >
            {this.props.selected == "charts" ? (
              <ChartSelect style={styles.imageB} />
            ) : (
              <Charts style={styles.imageB} />
            )}
            <Text style={styles.btnTxt}>Gráficas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Costs")}
            style={styles.btn}
          >
            {this.props.selected == "costos" ? (
              <CostSelect style={styles.imageB} />
            ) : (
              <Costs style={styles.imageB} />
            )}
            <Text style={styles.btnTxt}>Costos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("NetworkC")}
            style={styles.btn}
          >
            {this.props.selected == "codigo" ? (
              <CodeSelect style={styles.imageB} />
            ) : (
              <Code style={styles.imageB} />
            )}
            <Text style={styles.btnTxt}>Cógido de red</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Record")}
            style={styles.btn}
          >
            {this.props.selected == "record" ? (
              <HistoSelect style={styles.imageB} />
            ) : (
              <Histo style={styles.imageB} />
            )}
            <Text style={styles.btnTxt}>Historial</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CarbonF")}
            style={styles.btn}
          >
            {this.props.selected == "carbon" ? (
              <CarbonSelect style={styles.imageB} />
            ) : (
              <CarbonF style={styles.imageB} />
            )}
            <Text style={styles.btnTxt}>Huella de Carbono</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Generation")}
            style={styles.btn}
          >
            {this.props.selected == "gene" ? (
              <GenerationSelect style={styles.imageB} />
            ) : (
              <Generation style={styles.imageB} />
            )}
            <Text style={styles.btnTxt}>Generación</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    alignItems: "center"
  },
  btnLandscape: {
    height: 40,
    alignItems: "center",
    transform: [{ rotate: "90deg" }]
  },
  menu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 2,
    width: "auto",
    padding: 10
  },
  btnTxt: {
    color: "#000000",
    fontSize: 10,
    textAlign: "center"
  },
  imageB: {
    height: 24,
    width: 24
  }
});

export default withNavigation(HeaderMenu);
