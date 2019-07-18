import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Button,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import Daily from "./Daily.js";
import LogoObs from "../Assets/Images/LogoObs.png";
import Icon from "react-native-vector-icons/FontAwesome";
import Charts from "../Assets/Svg/Grafica.svg";
import Costs from "../Assets/Svg/Costo.svg";
import Code from "../Assets/Svg/Codigo.svg";
import Histo from "../Assets/Svg/Histo.svg";
import CarbonF from "../Assets/Svg/HuellaCarbono.svg";
import Generation from "../Assets/Svg/Gene.svg";
import SemiCircleProgress from "./DashboardChart.js";
import Fecha from "./Fecha.js";
import Weather from "./Weather.js";
import Data from "./Monthly.js";
import { withNavigation } from "react-navigation";
import Orientation from "react-native-orientation";

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portrait: false,
      landscape: false
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
    return (
      <View style={styles.menu}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Charts")}
          style={styles.btn}
        >
          <Charts style={styles.imageB} />
          <Text style={styles.btnTxt}>Gráficas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Costs")}
          style={styles.btn}
        >
          <Costs style={styles.imageB} />
          <Text style={styles.btnTxt}>Costos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("NetworkC")}
          style={styles.btn}
        >
          <Code style={styles.imageB} />
          <Text style={styles.btnTxt}>Cógido de red</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Record")}
          style={styles.btn}
        >
          <Histo style={styles.imageB} />
          <Text style={styles.btnTxt}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("CarbonF")}
          style={styles.btn}
        >
          <CarbonF style={styles.imageB} />
          <Text style={styles.btnTxt}>Huella de Carbono</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Generation")}
          style={styles.btn}
        >
          <Generation style={styles.imageB} />
          <Text style={styles.btnTxt}>Generación</Text>
        </TouchableOpacity>
      </View>
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
    borderBottomColor: "#939393",
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
