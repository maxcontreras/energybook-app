import React, { Component, PropTypes } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert
} from "react-native";

import IntervalPicker from "../../Components/Pickers/IntervalPicker";
import AsyncStorage from "@react-native-community/async-storage";
import HeaderMenu from "../../Components/HeaderMenu.js";
import DatesPicker from "../../Components/Pickers/DatePicker.js";
import Chart from "../../Components/Chart.js";
import { connect } from "react-redux";
import CSButtons from "../../Components/CSButtons.js";
import CCPicker from "../../Components/Pickers/CCPicker.js";
import ActivityI from "../../Components/ActivityIndicator";
import Colors from "../../Components/colorCost";
import { tsImportEqualsDeclaration } from "@babel/types";
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer
});

class Costs extends Component {
  constructor(props) {
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    super(props);
    this.state = {
      pickerValue: "Servicio 1",
      pickerFValue: "Hoy",
      pickerIvalue: "15 minutos",
      indicator: false,
      calendar: false,
      horas: [],
      datos: [],
      rate: [],
      arrayPicker: [],
      device: "",
      service: "Servicio 1",
      filter: 0,
      timeCustomButtons: false,
      interval: 900,
      customdates: null,
      values: [],
      initialDate: "",
      endDate: "",
      numberOfServices: this.props.readings.numberOfServices,
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
    this.setInitial = this.setInitial.bind(this);
    this.setEnd = this.setEnd.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.setInterval = this.setInterval.bind(this);
    this.Calendario = this.Calendario.bind(this);
    this.setDevice = this.setDevice.bind(this);
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
    } catch (error) {}
  };

  componentWillMount() {
    this._retrieveData();
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change");
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
        //this.props.readings.meterId
        //5bf6ef89db55ec4a265b3179
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
        if (this.state.statusCode == 504) {
          Alert.alert(
            "Error",
            "Hubo un error al obtener los datos del medidor.",
            [
              {
                text: "Okay"
              }
            ]
          );
        }
        var response = json[1];
        var horas = [];
        var datos = [];
        var rate = [];
        const puntos = ":";
        for (var i = 0; i < response.length; i++) {
          horas[i] = response[i].date
            .substr(8, 2)
            .concat(puntos.concat(response[i].date.substr(10, 2)));
          datos[i] = response[i].cost;
          rate[i] = response[i].rate;
        }
        this.setValues(horas, datos, rate);
        console.log(horas);
        console.log(datos);
      })
      .catch(err => {});
  }
  setValues(horas, datos, rate) {
    this.setState({
      horas: horas,
      datos: datos,
      rate: rate,
      indicator: false
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

  setInterval(value, texto) {
    if (value == "15 minutos" || texto == "15 minutos") {
      var intervalo = 900;
    } else if (value == "30 minutos" || texto == "30 minutos") {
      var intervalo = 1800;
    } else if (value == "1 hora" || texto == "1 hora") {
      var intervalo = 3600;
    }
    this.setState(
      {
        interval: intervalo,
        pickerIValue: value
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
    var arrayNameDevices = [];
    var arrayDescriptionDevices = [];
    for (var j = 1; j < this.props.readings.devices.length; j++) {
      arrayNameDevices[j - 1] = this.props.readings.devices[j].name;
      arrayDescriptionDevices[j - 1] = this.props.readings.devices[
        j
      ].description;
    }
    this.setState(
      {
        pickerValue: itemValue
      },
      () => {
        if (this.state.pickerValue.substr(0, 8) !== "Servicio") {
          var getIndex = arrayDescriptionDevices.indexOf(itemValue);
          this.setState(
            {
              service: "",
              device: arrayNameDevices[getIndex]
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
    const uno = screenHeight;
    const dos = screenWidth;

    const unou = screenWidth;
    const dosd = screenHeight;
    return (
      <SafeAreaView>
        <ScrollView>
          <View
            style={[
              styles.container,
              screenWidth > screenHeight ? styles.width : styles.height
            ]}
          >
            <View
              style={[
                styles.topView,
                screenWidth > screenHeight ? styles.width : styles.height,
                this.state.orientation == "portrait"
                  ? {
                      flexDirection: "column",
                      height: "auto"
                    }
                  : { flexDirection: "row" }
              ]}
            >
              <View
                style={[
                  styles.calendarView,
                  screenWidth > screenHeight ? styles.width : styles.height,
                  this.state.orientation == "portrait"
                    ? {
                        flexDirection: "row"
                      }
                    : { flexDirection: null, flex: 0.5 }
                ]}
              >
                <CCPicker
                  function={this.setDevice.bind(this)}
                  selectedValue={this.state.pickerValue}
                />
                {this.state.orientation == "portrait" && (
                  <IntervalPicker
                    function={this.setInterval.bind(this)}
                    selectedValue={this.state.pickerIValue}
                  />
                )}
              </View>
              <View
                style={[
                  styles.optionButtonsView,
                  screenWidth > screenHeight ? styles.width : styles.height,
                  this.state.orientation == "portrait"
                    ? {
                        justifyContent: "flex-start"
                      }
                    : { justifyContent: "flex-end" }
                ]}
              >
                <CSButtons
                  setFunction={this.Calendario}
                  texto={"Calendario"}
                  selected={this.state.filter}
                  filter={-1}
                />
                <CSButtons
                  setFunction={this.setFilter}
                  texto={"Hoy"}
                  selected={this.state.filter}
                  filter={0}
                />
                <CSButtons
                  setFunction={this.setFilter}
                  texto={"Ayer"}
                  selected={this.state.filter}
                  filter={1}
                />
                <CSButtons
                  setFunction={this.setFilter}
                  texto={"Esta semana"}
                  selected={this.state.filter}
                  filter={2}
                />
                <CSButtons
                  setFunction={this.setFilter}
                  texto={"Este mes"}
                  selected={this.state.filter}
                  filter={3}
                />
              </View>
            </View>
            <View
              style={[
                styles.chart,
                screenWidth > screenHeight ? styles.width : styles.height
              ]}
            >
              {this.state.orientation == "landscape" && (
                <View
                  style={[
                    styles.timeButtons,
                    screenWidth > screenHeight ? styles.width : styles.height
                  ]}
                >
                  <CSButtons
                    setFunction={this.setInterval}
                    texto={"1 hora"}
                    selected={this.state.interval}
                    filter={3600}
                  />
                  <CSButtons
                    setFunction={this.setInterval}
                    texto={"30 minutos"}
                    selected={this.state.interval}
                    filter={1800}
                  />
                  <CSButtons
                    setFunction={this.setInterval}
                    texto={"15 minutos"}
                    selected={this.state.interval}
                    filter={900}
                  />
                </View>
              )}
              {this.state.calendar && (
                <DatesPicker
                  initialDate={this.state.initialDate}
                  endDate={this.state.endDate}
                  setInitial={this.setInitial}
                  setEnd={this.setEnd}
                />
              )}
              {this.state.indicator && <ActivityI />}

              {this.state.datos && !this.state.indicator && (
                <Chart
                  type={"column2d"}
                  caption={"Consumo"}
                  data={chartAxis.data}
                />
              )}
              {this.state.datos && !this.state.indicator && <Colors />}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(Costs);

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center"
  },
  topView: {
    height: 60,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    height: "auto",
    justifyContent: "center"
  },
  chart: {
    justifyContent: "center",
    height: "auto"
  },
  optionButtonsView: {
    height: 60,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
    padding: 10
  },
  calendarView: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white"
  },
  timeButtons: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
    height: 45,
    backgroundColor: "white",
    paddingBottom: 10,
    paddingRight: 10
  },
  width: {
    width: screenWidth
  },
  height: {
    width: screenHeight
  }
});
