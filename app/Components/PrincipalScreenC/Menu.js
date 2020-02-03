import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import LogoObs from "../../Assets/Images/LogoObs.png";

import Charts from "../../Assets/Svg/Grafica.svg";
import Costs from "../../Assets/Svg/Costo.svg";
import Code from "../../Assets/Svg/Codigo.svg";
import Histo from "../../Assets/Svg/Histo.svg";
import CarbonF from "../../Assets/Svg/HuellaCarbono.svg";
import Generation from "../../Assets/Svg/Gene.svg";
import Weather from "../Weather.js";
import { withNavigation } from "react-navigation";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCity: this.props.userCity,
      userCompanyName: this.props.userCompanyName,
      id: "",
      button: ""
    };
  }

  chartS() {
    this.setState({
      button: "charts"
    });
    this.props.navigation.navigate("Charts");
  }

  render() {
    const data = [
      { screen: "Charts", Icon: Charts, titulo: "Gráficas" },
      { screen: "Costs", Icon: Costs, titulo: "Costos" },
      { screen: "NetworkC", Icon: Code, titulo: "Código de red" },
      { screen: "Record", Icon: Histo, titulo: "Historial" },
      { screen: "CarbonF", Icon: CarbonF, titulo: "Huella de Carbono" },
      { screen: "Generation", Icon: Generation, titulo: "Generación" }
    ];
    var key = 0;

    return (
      <View style={styles.container}>
        <View style={styles.topScreen}>
          <View style={styles.weather}>
            <Weather
              userCity={this.state.userCity}
              userCompanyName={this.state.userCompanyName}
              screen={this.props.screen}
            />
          </View>
          <View styles={styles.logoView}>
            <Image source={LogoObs} style={styles.logo} />
          </View>
        </View>
        {this.props.screen != "SuperAdmin" && (
          <View style={styles.menu}>
            {data.map(screens => (
              <TouchableOpacity
                key={key++}
                onPress={() => this.props.navigation.navigate(screens.screen)}
                style={styles.btn}
              >
                <screens.Icon style={styles.imageB} />
              </TouchableOpacity>
            ))}
          </View>
        )}
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
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 2
  },
  btn: {
    height: "auto",
    justifyContent: "center",
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
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 2,
    width: "auto",
    paddingVertical: 10,
    paddingHorizontal: 20
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
    height: 30,
    width: 30
  }
});

export default withNavigation(Menu);
