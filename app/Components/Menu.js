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

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCity: this.props.userCity,
      userCompanyName: this.props.userCompanyName,
      id: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topScreen}>
          <View style={styles.weather}>
            <Weather
              userCity={this.state.userCity}
              userCompanyName={this.state.userCompanyName}
            />
          </View>
          <View styles={styles.logoView}>
            <Image source={LogoObs} style={styles.logo} />
          </View>
        </View>
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
      </View>
    );
  }
}

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  logoView: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 10
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    alignSelf: "flex-end",
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    height: "auto"
  },
  topScreen: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    borderBottomColor: "#939393",
    borderBottomWidth: 2
  },
  btn: {
    height: 40,
    alignItems: "center"
  },
  weather: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-start",
    paddingLeft: 10
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
  scroll: {
    flex: 0,
    height: "auto",
    flexGrow: 1
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

export default withNavigation(Menu);
