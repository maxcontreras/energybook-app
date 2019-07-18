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
  WebView,
  Picker,
  Platform
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import Menu from "../../Components/Menu.js";
import LogoObs from "../../Assets/Images/LogoObs.png";
import PrincipalScreen from "../../Screens/PrincipalScreen";
import HeaderMenu from "../../Components/HeaderMenu.js";
import Orientation from "react-native-orientation";

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

export default class ChartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languaje: ""
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={styles.header}>
          <HeaderMenu />
        </View>
      )
    };
  };
  render() {
    return (
      <ScrollView horizontal={true}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.picker1}>
              <View style={styles.picker2}>
                <Picker
                  selectedValue={this.state.language}
                  style={{
                    height: 48,
                    width: 200
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                  }
                >
                  <Picker.Item label="Device" value="Device" />
                  <Picker.Item label="Device" value="Device" />
                </Picker>
              </View>
            </View>
            <View style={styles.buttonContainter1}>
              <View style={styles.buttonContainter2}>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    onPress={() => this.goToDashboard()}
                    style={styles.buttonG}
                  >
                    <Text style={styles.btnTxt}>Consumo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.goToDashboard()}
                    style={styles.buttonG}
                  >
                    <Text style={styles.btnTxt}>Demanda</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.goToDashboard()}
                    style={[styles.buttonG, styles.btnHoy]}
                  >
                    <Text style={styles.btnTxt}>hoy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.goToDashboard()}
                    style={styles.buttonG}
                  >
                    <Text style={styles.btnTxt}>ayer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.goToDashboard()}
                    style={styles.buttonG}
                  >
                    <Text style={styles.btnTxt}>esta semana</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.goToDashboard()}
                    style={styles.buttonG}
                  >
                    <Text style={styles.btnTxt}>Este mes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.goToDashboard()}
                    style={styles.buttonG}
                  >
                    <Text style={styles.btnTxt}>Calendario</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.chart}>
                <LineChart
                  data={{
                    labels: [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "october",
                      "November",
                      "December"
                    ],
                    datasets: [
                      {
                        data: [
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100
                        ]
                      }
                    ]
                  }}
                  width={screenWidth * 2}
                  height={350}
                  yAxisLabel={"$"}
                  chartConfig={{
                    strokeWidth: 2,
                    backgroundColor: "white",
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(69, 74, 74, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                  bezier
                  style={styles.bezier}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonG: {
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    backgroundColor: "#000000",
    marginTop: 30,
    ...Platform.select({
      ios: {
        shadowRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2
      },
      android: {
        elevation: 5
      }
    }),
    borderWidth: 0.2
  },
  btnTxt: {
    color: "#FFFFFF",
    fontSize: 10
  },
  header: {
    height: 60,
    justifyContent: "center"
  },
  btnHoy: {
    marginTop: 70
  },
  buttons: {
    flex: 1,
    width: screenWidth / 2,
    backgroundColor: "white",
    alignItems: "center"
  },
  chart: {
    flex: 4,
    backgroundColor: "white",
    width: screenWidth * 2,
    justifyContent: "center",
    height: 500
  },
  picker1: {
    flex: 1,
    backgroundColor: "white",
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    width: screenWidth * 2.75,
    height: screenHeight - 100,
    backgroundColor: "white"
  },
  buttonContainter1: {
    flex: 6,
    width: screenWidth * 2.5,
    backgroundColor: "white",
    flexDirection: "row",
    height: 500
  },
  buttonContainter2: {
    flex: 1,
    width: screenWidth / 2,
    backgroundColor: "white"
  },
  bezier: {
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 15, height: 15 },
        shadowOpacity: 0.2
      },
      android: {
        elevation: 15
      }
    })
  },
  picker2: {
    height: 50,
    width: 200,
    ...Platform.select({
      ios: {
        shadowRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 15, height: 15 },
        shadowOpacity: 0.2
      },
      android: {
        elevation: 15
      }
    }),
    backgroundColor: "white",
    marginTop: 20
  }
});
