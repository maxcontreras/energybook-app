import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
import Daily from "../../Components/PrincipalScreenC/Daily.js";
import SemiCircleProgress from "../../Components/PrincipalScreenC/DashboardChart.js";
import Data from "../../Components/PrincipalScreenC/Monthly.js";
import Menu from "../../Components/PrincipalScreenC/Menu.js";
import PrecioCFE from "../../Components/PrincipalScreenC/PrecioCFEPeriodo.js";
import Orientation from "react-native-orientation";
import AsyncStorage from "@react-native-community/async-storage";

import StaticSafeAreaInsets from "react-native-static-safe-area-insets";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  readings: state.dailyReducer,
  adminIds: state.adminReducer
});

class Role2Dashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape",
      values: []
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    this._isMounted = true;
  }

  componentDidMount() {
    Orientation.unlockAllOrientations();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
    this._isMounted = false;
  }

  render() {
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
      2;
    const insetsAndroid = Math.max(screenHeight, screenWidth) / 2;
    return (
      <SafeAreaView>
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          <KeyboardAvoidingView enabled>
            <View style={styles.container}>
              {this.props.readings && this._isMounted && (
                <View style={styles.menu}>
                  <Menu screen={"Role2Dashboard"} />
                </View>
              )}
              <View
                style={[
                  styles.container2,
                  this.state.orientation == "portrait"
                    ? { flexDirection: "column" }
                    : { flexDirection: "row" }
                ]}
              >
                <View
                  style={[
                    styles.daily,
                    this.state.orientation == "portrait"
                      ? { width: Math.min(screenHeight, screenWidth) }
                      : {
                          width:
                            Platform.OS == "android" ? insetsAndroid : insetsIos
                        }
                  ]}
                >
                  {this.props.adminIds.meter_id != null && (
                    <Daily
                      adminMeterId={this.props.adminIds.meter_id}
                      companyId={this.props.adminIds.company_id}
                      city={this.props.adminIds.city}
                    />
                  )}
                  {(this.props.readings.meterId != "" ||
                    this.props.adminIds.meter_id != "") && (
                    <Data
                      meterId={
                        this.props.adminIds.meter_id != ""
                          ? this.props.adminIds.meter_id
                          : this.props.readings.meterId
                      }
                    />
                  )}
                </View>
                {this.props.readings && (
                  <View
                    style={[
                      styles.charts,
                      this.state.orientation == "portrait"
                        ? {
                            justifyContent: "center",
                            width: Math.min(screenHeight, screenWidth)
                          }
                        : {
                            justifyContent: "space-between",
                            width:
                              Platform.OS == "android"
                                ? insetsAndroid
                                : insetsIos
                          }
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(Role2Dashboard);

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
    paddingBottom: 10
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
  menu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto"
  },
  daily: {
    justifyContent: "center"
  }
});
