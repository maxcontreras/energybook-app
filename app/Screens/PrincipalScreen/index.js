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
  RefreshControl,
  Platform
} from "react-native";
import Daily from "../../Components/Daily.js";
import LogoObs from "../../Assets/Images/LogoObs.png";
import Charts from "../../Assets/Svg/Grafica.svg";
import Costs from "../../Assets/Svg/Costo.svg";
import Code from "../../Assets/Svg/Codigo.svg";
import CarbonF from "../../Assets/Svg/HuellaCarbono.svg";
import Histo from "../../Assets/Svg/Histo.svg";
import Generation from "../../Assets/Svg/Gene.svg";
import SemiCircleProgress from "../../Components/DashboardChart.js";
import Fecha from "../../Components/Fecha.js";
import Weather from "../../Components/Weather.js";
import Data from "../../Components/Monthly.js";
import Menu from "../../Components/Menu.js";
import Orientation from "react-native-orientation";
export default class PrincipalScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      prevScreenTitlle: this.props.navigation.state.params.prevScreenTitlle,
      companyID: this.props.navigation.state.params.company,
      city: this.props.navigation.state.params.city,
      companyName: this.props.navigation.state.params.companyName,
      portrait: false,
      landscape: false
    };
  }
  static navigationOptions = {
    header: null
  };
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
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
        <SafeAreaView>
          <KeyboardAvoidingView enabled>
            <View style={styles.container}>
              <View style={styles.menu}>
                <Menu
                  userCity={this.state.city}
                  userCompanyName={this.state.companyName}
                />
              </View>
              <View
                style={[
                  this.state.portrait
                    ? styles.container2
                    : styles.containerLandscape
                ]}
              >
                <View
                  style={[
                    this.state.portrait ? styles.daily : styles.dailyLandscape
                  ]}
                >
                  <Daily
                    accessToken={this.state.prevScreenTitlle}
                    companyID={this.state.companyID}
                  />

                  <Data
                    accessToken={this.state.prevScreenTitlle}
                    companyID={this.state.companyID}
                  />
                </View>
                <View style={styles.charts}>
                  <SemiCircleProgress
                    progressColor={"green"}
                    companyID={this.state.companyID}
                  >
                    <Text style={{ fontSize: 10 }}>kW</Text>
                  </SemiCircleProgress>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  scroll: {
    flex: 0,
    height: "auto",
    flexGrow: 1
  },
  charts: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    height: "auto"
  },
  container2: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    height: "auto"
  },
  containerLandscape: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    height: "auto",
    flexDirection: "row"
  },
  menu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto"
  },
  daily: {
    paddingTop: 10,
    justifyContent: "center",
    width: screenWidth
  },
  dailyLandscape: {
    paddingTop: 10,
    justifyContent: "center",
    width: screenWidth + 20
  }
});
