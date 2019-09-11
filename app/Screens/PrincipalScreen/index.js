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
  Platform,
  AsyncStorage
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
import Data from "../../Components/Monthly.js";
import Menu from "../../Components/Menu.js";
import PrecioCFE from "../../Components/PrecioCFEPeriodo.js";
import Orientation from "react-native-orientation";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Icon,
  Right
} from "native-base";
import { connect } from "react-redux";
import {
  getUserInfo,
  getDailyConsumptionPrices,
  getMonthlyConsumptionPrices
} from "../../../Actions/Actions.js";

const mapStateToProps = state => ({
  userData: state.initialValues[0],
  //companyId
  companyData: state.initialValues[1],
  //city and stuff
  companyInfo: state.initialValues[2],
  prices: state.costReducer[1],
  readings: state.dailyReducer[0]
});

class PrincipalScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      portrait: false,
      landscape: false,
      values: []
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
              {this.props.readings && (
                <View style={styles.menu}>
                  <Menu />
                </View>
              )}
              <View
                style={[
                  this.state.portrait
                    ? styles.container2
                    : styles.containerLandscape
                ]}
              >
                <View style={styles.daily}>
                  <Daily />
                  {this.props.readings && <Data />}
                </View>
                {this.props.readings && (
                  <View
                    style={[
                      this.state.portrait ? styles.charts : styles.chartsLS
                    ]}
                  >
                    <SemiCircleProgress
                      progressColor={"green"}
                      dp={this.props.readings.dp}
                      maxVal={this.props.readings.maxVal}
                      minVal={this.props.readings.minVal}
                    >
                      <Text style={{ fontSize: 10 }}>kW</Text>
                    </SemiCircleProgress>
                    <PrecioCFE />
                  </View>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(PrincipalScreen);

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
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingBottom: 10
  },
  chartsLS: {
    flex: 1,
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
    justifyContent: "center",
    width: screenWidth
  }
});
