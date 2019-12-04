import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions
} from "react-native";
import Daily from "../../Components/PrincipalScreenC/Daily.js";
import SemiCircleProgress from "../../Components/PrincipalScreenC/DashboardChart.js";
import Data from "../../Components/PrincipalScreenC/Monthly.js";
import Menu from "../../Components/PrincipalScreenC/Menu.js";
import PrecioCFE from "../../Components/PrincipalScreenC/PrecioCFEPeriodo.js";
import Orientation from "react-native-orientation";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  readings: state.dailyReducer
});

class PrincipalScreen extends Component {
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
  componentWillMount() {}

  componentDidMount() {
    Orientation.unlockAllOrientations();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
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
                      ? { width: Math.min(screenWidth, screenHeight) }
                      : { width: Math.min(screenWidth, screenHeight) }
                  ]}
                >
                  <Daily />
                  {this.props.readings && <Data />}
                </View>
                {this.props.readings && (
                  <View
                    style={[
                      this.state.orientation == "portrait"
                        ? styles.charts
                        : styles.chartsLS
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
    paddingBottom: 10
  },
  chartsLS: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10
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
