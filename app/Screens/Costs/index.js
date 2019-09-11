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
  Picker,
  Alert,
  Platform,
  ActivityIndicator,
  AlertIOS,
  ActionSheetIOS,
  AsyncStorage
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
import DatesPicker from "../../Components/DatePicker.js";
import FusionCharts from "react-native-fusioncharts";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

const mapStateToProps = state => ({
  userData: state.initialValues[0],
  readings: state.dailyReducer[0]
});

class Costs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValue: "Servicio 1",
      indicator: false,
      calendar: false,
      portrait: false,
      landscape: false,
      horas: [],
      datos: [],
      rate: [],
      arrayPicker: [],
      device: "",
      arrayNameDevices: [],
      arrayDescriptionDevices: [],
      service: "Servicio 1",
      filter: 0,
      timeCustomButtons: false,
      interval: 900,
      customdates: null,
      values: [],
      initialDate: "",
      endDate: "",
      numberOfServices: this.props.readings.numberOfServices
    };
    this.setInitial = this.setInitial.bind(this);
    this.setEnd = this.setEnd.bind(this);
    this.libraryPath = Platform.select({
      ios: require("../../../assets/fusioncharts.html"),
      android: { uri: "file:///android_asset/fusioncharts.html" }
    });
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={styles.header}>
          <HeaderMenu selected="costos" />
        </View>
      )
    };
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      if (value !== null) {
        this.setState(
          {
            values: JSON.parse(value)
          },
          () => {
            this.getChartData();
          }
        );
        console.log(this.state.values);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  componentWillMount() {
    Orientation.lockToLandscapeRight();
    this._retrieveData();
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  _orientationDidChange = orientation => {
    if (orientation === "LANDSCAPE") {
      this.setState({
        portrait: false,
        landscape: true
      });
    } else {
      this.setState({
        portrait: true,
        landscape: false
      });
    }
  };
  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
    Orientation.unlockAllOrientations();
  }

  getChartData() {
    this.setState({
      indicator: true
    });
    fetch(
      `http://api.ienergybook.com/api/Meters/getConsumptionCostsByFilter?access_token=${this.state.values.accesToken}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: this.props.readings.meterId,
          device: this.state.device,
          service: this.state.service,
          filter: this.state.filter,
          interval: this.state.interval,
          custom_dates: this.state.customdates
        })
      }
    )
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        console.log(json);
        var response = json[1];
        var horas = [];
        var datos = [];
        var rate = [];
        var arrayNameDevices = [];
        var arrayDescriptionDevices = [];
        const puntos = ":";
        var dias = [];
        for (var i = 0; i < response.length; i++) {
          horas[i] = response[i].date
            .substr(8, 2)
            .concat(puntos.concat(response[i].date.substr(10, 2)));
          datos[i] = response[i].cost;
          rate[i] = response[i].rate;
        }
        for (var j = 1; j < this.props.readings.devices.length; j++) {
          arrayNameDevices[j - 1] = this.props.readings.devices[j].name;
          arrayDescriptionDevices[j - 1] = this.props.readings.devices[
            j
          ].description;
        }

        console.log(horas);
        console.log(datos);
        this.setState({
          horas: horas,
          datos: datos,
          rate: rate,
          indicator: false,
          arrayNameDevices: arrayNameDevices,
          arrayDescriptionDevices: arrayDescriptionDevices
        });
      })
      .catch(err => {
        Alert.alert(
          "Error",
          "Hubo un error al obtener los datos del medidor.",
          [
            {
              text: "Okay"
            }
          ]
        );
        AlertIOS.alert(
          "Error",
          "Hubo un error al obtener los datos del medidor.",
          [
            {
              text: "Reintentar",
              style: "cancel"
            }
          ]
        );
      });
  }

  setInitial(date) {
    this.setState({
      initialDate: date
    });
  }

  setEnd(date) {
    this.setState(
      {
        endDate: date,
        calendar: false
      },
      () => {
        if (this.state.initialDate && this.state.endDate) {
          this.setState(
            {
              customdates: {
                from: `${this.state.initialDate}`,
                until: `${this.state.endDate}`
              },
              filter: -1
            },
            () => {
              this.getChartData();
            }
          );
        }
      }
    );
  }
  Calendario() {
    if (!this.state.calendar) {
      this.setState({
        calendar: true,
        filter: -1
      });
    } else if (this.state.calendar) {
      this.setState({
        calendar: false
      });
    }
  }

  setInterval(value) {
    this.setState(
      {
        interval: value
      },
      () => {
        this.getChartData();
      }
    );
  }

  setFilter(value) {
    this.setState(
      {
        filter: value,
        customdates: null,
        calendar: false
      },
      () => {
        this.getChartData();
      }
    );
  }
  setDevice(itemValue) {
    this.setState(
      {
        pickerValue: itemValue
      },
      () => {
        if (this.state.pickerValue.substr(0, 8) !== "Servicio") {
          var getIndex = this.state.arrayDescriptionDevices.indexOf(itemValue);
          this.setState(
            {
              service: "",
              device: this.state.arrayNameDevices[getIndex]
            },
            () => {
              this.getChartData();
            }
          );
        } else {
          this.setState(
            {
              service: this.state.pickerValue,
              device: ""
            },
            () => {
              this.getChartData();
            }
          );
        }
      }
    );
  }

  render() {
    if (this.props.readings) {
      var arrayOfServices = [];
      var devices = [];
      for (j = 0; j < this.state.numberOfServices; j++) {
        arrayOfServices[j] = `Servicio ${j + 1}`;
      }
      for (j = 1; j < this.props.readings.devices.length; j++) {
        devices[j - 1] = this.props.readings.devices[j].description;
      }
      var pickerArrayIos = arrayOfServices.concat(devices).concat("Cancelar");
      var pickerArrayAndroid = arrayOfServices.concat(devices);
      let counter = 0;
    }
    var pickerItems = pickerArrayAndroid;
    let nextKey = 0;

    var chartAxis = {
      data: []
    };
    var colors = [];
    for (i = 0; i < this.state.rate.length; i++) {
      if (this.state.rate[i] == "base") {
        colors[i] = "EDDC44";
      } else if (this.state.rate[i] == "middle") {
        colors[i] = "#25CEBC";
      } else {
        colors[i] = "#DE3E10";
      }
    }

    console.log(colors);
    for (var i in this.state.datos) {
      var item = this.state.datos[i];
      var item2 = this.state.horas[i];
      var color = colors[i];

      chartAxis.data.push({
        label: item2,
        value: item,
        color: color
      });
    }

    return (
      <SafeAreaView>
        <ScrollView horizontal={true}>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.topView}>
                <View style={styles.calendarView}>
                  {Platform.OS == "ios" && this.props.readings && (
                    <TouchableOpacity
                      onPress={() =>
                        ActionSheetIOS.showActionSheetWithOptions(
                          {
                            options: pickerArrayIos,
                            cancelButtonIndex: pickerArrayIos.length - 1
                          },
                          buttonIndex => {
                            if (
                              buttonIndex != pickerArrayIos.indexOf("Cancelar")
                            ) {
                              this.setDevice(pickerArrayIos[buttonIndex]);
                            }
                          }
                        )
                      }
                      style={[
                        styles.buttonG,
                        styles.elevation,
                        styles.newWidth
                      ]}
                    >
                      <Text style={[styles.unselectedButtonText]}>
                        {this.state.pickerValue}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {Platform.OS == "android" && this.props.readings && (
                    <View style={[styles.Picker, styles.elevation]}>
                      <Picker
                        style={{
                          height: 40,
                          width: 180,
                          fontSize: 10
                        }}
                        selectedValue={this.state.pickerValue}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setDevice(itemValue)
                        }
                      >
                        {pickerItems.map(item => (
                          <Picker.Item
                            label={item}
                            value={item}
                            key={nextKey++}
                          />
                        ))}
                      </Picker>
                    </View>
                  )}
                </View>
                <View style={styles.optionButtonsView}>
                  <TouchableOpacity
                    onPress={() => this.Calendario()}
                    style={[
                      styles.buttonG,
                      styles.elevation,
                      [
                        this.state.filter == -1
                          ? styles.selectedButtton
                          : styles.unselectedButton
                      ]
                    ]}
                  >
                    <Text
                      style={[
                        this.state.filter == -1
                          ? styles.selectedButttonText
                          : styles.unselectedButtonText
                      ]}
                    >
                      Calendario
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setFilter(0)}
                    style={[
                      styles.buttonG,
                      styles.elevation,
                      [
                        this.state.filter == 0
                          ? styles.selectedButtton
                          : styles.unselectedButton
                      ]
                    ]}
                  >
                    <Text
                      style={[
                        this.state.filter == 0
                          ? styles.selectedButttonText
                          : styles.unselectedButtonText
                      ]}
                    >
                      Hoy
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setFilter(1)}
                    style={[
                      styles.buttonG,
                      styles.elevation,
                      [
                        this.state.filter == 1
                          ? styles.selectedButtton
                          : styles.unselectedButton
                      ]
                    ]}
                  >
                    <Text
                      style={[
                        this.state.filter == 1
                          ? styles.selectedButttonText
                          : styles.unselectedButtonText
                      ]}
                    >
                      Ayer
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setFilter(2)}
                    style={[
                      styles.buttonG,
                      styles.elevation,
                      [
                        this.state.filter == 2
                          ? styles.selectedButtton
                          : styles.unselectedButton
                      ]
                    ]}
                  >
                    <Text
                      style={[
                        this.state.filter == 2
                          ? styles.selectedButttonText
                          : styles.unselectedButtonText
                      ]}
                    >
                      Esta semana
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setFilter(3)}
                    style={[
                      styles.buttonG,
                      styles.elevation,
                      [
                        this.state.filter == 3
                          ? styles.selectedButtton
                          : styles.unselectedButton
                      ]
                    ]}
                  >
                    <Text
                      style={[
                        this.state.filter == 3
                          ? styles.selectedButttonText
                          : styles.unselectedButtonText
                      ]}
                    >
                      Este mes
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.chart}>
                {this.state.calendar && (
                  <DatesPicker
                    initialDate={this.state.initialDate}
                    endDate={this.state.endDate}
                    setInitial={this.setInitial}
                    setEnd={this.setEnd}
                  />
                )}
                {this.state.timeCustomButtons && (
                  <View style={styles.timeButtons}>
                    <TouchableOpacity
                      onPress={() => this.setInterval(3600)}
                      style={[
                        styles.buttonG,
                        styles.elevation,
                        [
                          this.state.interval == 3600
                            ? styles.selectedButtton
                            : styles.unselectedButton
                        ]
                      ]}
                    >
                      <Text
                        style={[
                          this.state.interval == 3600
                            ? styles.selectedButttonText
                            : styles.unselectedButtonText
                        ]}
                      >
                        1 Hora
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.setInterval(1800)}
                      style={[
                        styles.buttonG,
                        styles.elevation,
                        [
                          this.state.interval == 1800
                            ? styles.selectedButtton
                            : styles.unselectedButton
                        ]
                      ]}
                    >
                      <Text
                        style={[
                          this.state.interval == 1800
                            ? styles.selectedButttonText
                            : styles.unselectedButtonText
                        ]}
                      >
                        30 minutos
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.setInterval(900)}
                      style={[
                        styles.buttonG,
                        styles.elevation,
                        [
                          this.state.interval == 900
                            ? styles.selectedButtton
                            : styles.unselectedButton
                        ]
                      ]}
                    >
                      <Text
                        style={[
                          this.state.interval == 900
                            ? styles.selectedButttonText
                            : styles.unselectedButtonText
                        ]}
                      >
                        15 minutos
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {this.state.indicator && (
                  <ActivityIndicator size="small" color="#00ff00" />
                )}
                {this.state.datos && !this.state.indicator && (
                  <FusionCharts
                    type={"column2d"}
                    width={"100%"}
                    height={300}
                    dataFormat={"json"}
                    dataSource={{
                      chart: {
                        caption: "Consumo",
                        numberprefix: " ",
                        theme: "fusion",
                        rotatelabels: "1",
                        showValues: "0"
                      },
                      data: chartAxis.data
                    }}
                    libraryPath={this.libraryPath}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(Costs);

const styles = StyleSheet.create({
  buttonG: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    marginLeft: 5
  },
  header: {
    height: 60,
    justifyContent: "center"
  },
  topView: {
    height: 70,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    width: screenHeight,
    height: screenHeight - 300,
    backgroundColor: "white"
  },
  Picker: {
    height: 40,
    width: 180,
    backgroundColor: "white",
    marginLeft: 10
  },
  chart: {
    flex: 7,
    backgroundColor: "white",
    width: screenWidth * 2 + 20,
    height: 600,
    alignItems: "center",
    padding: 10
  },
  optionButtonsView: {
    flexDirection: "row",
    width: screenWidth * 2 + 20,
    backgroundColor: "white",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 3,
    padding: 10
  },
  calendarView: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white"
  },
  elevation: {
    borderWidth: 1,
    borderColor: "#737373",
    borderRadius: 20
  },
  unselectedButton: {
    backgroundColor: "white"
  },
  selectedButtton: {
    backgroundColor: "#586365"
  },
  unselectedButtonText: {
    color: "black",
    fontSize: 10
  },
  selectedButttonText: {
    color: "#FFFFFF",
    fontSize: 10
  },
  timeButtons: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
    width: screenWidth * 2 + 20,
    height: 45,
    backgroundColor: "white",
    paddingBottom: 10,
    paddingRight: 10
  },
  marginL: {
    marginLeft: 0
  },
  newWidth: {
    width: 180
  }
});
