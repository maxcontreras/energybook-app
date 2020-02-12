import React, { Component, PropTypes } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
  Platform
} from "react-native";
import IntervalPicker from "../../Components/Pickers/IntervalPicker";
import AsyncStorage from "@react-native-community/async-storage";
import HeaderMenu from "../../Components/HeaderMenu.js";
import DatesPicker from "../../Components/Pickers/DatePicker.js";
import Chart from "../../Components/Chart.js";
import { connect } from "react-redux";
import FusionCharts from "react-native-fusioncharts";
import CSButtons from "../../Components/CSButtons.js";
import CCPicker from "../../Components/Pickers/CCPicker.js";
import ActivityI from "../../Components/ActivityIndicator";
import Colors from "../../Components/colorCost";
import { tsImportEqualsDeclaration } from "@babel/types";
import moment from "moment/min/moment-with-locales";
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);
const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  adminIds: state.adminReducer
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
      pickerIValue: "15 minutos",
      newInterval: "Cada Hora",
      porDia: false,
      indicator: false,
      calendar: false,
      numSteps: "1",
      horas: [],
      datos: [],
      rate: [],
      dias: [],
      arrayPicker: [],
      device: "",
      service: "Servicio 1",
      filter: 0,
      timeCustomButtons: false,
      interval: 3600,
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
    this.libraryPath = Platform.select({
      ios: require("../../../assets/fusioncharts.html"),
      android: { uri: "file:///android_asset/fusioncharts.html" }
    });
    this.setInitial = this.setInitial.bind(this);
    this.setEnd = this.setEnd.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.Calendario = this.Calendario.bind(this);
    this.setDevice = this.setDevice.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <SafeAreaView>
          <View style={styles.header}>
            <HeaderMenu selected={"Costs"} />
          </View>
        </SafeAreaView>
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
          id:
            this.props.adminIds.meter_id != ""
              ? this.props.adminIds.meter_id
              : this.props.readings.meterId,
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
        var totalDeDia = 0;
        var dias = [];
        const puntos = ":";
        for (var i = 0; i < response.length; i++) {
          horas[i] = response[i].date
            .substr(8, 2)
            .concat(puntos.concat(response[i].date.substr(10, 2)));
          datos[i] = response[i].cost;
          rate[i] = response[i].rate;
          dias[i] = response[i].date
            .substr(4, 4)
            .concat("-")
            .concat(response[i].date.substr(2, 2))
            .concat("-")
            .concat(response[i].date.substr(0, 2));
        }

        console.log(dias);

        this.setValues(horas, datos, rate, dias);
      })
      .catch(err => {});
  }
  setValues(horas, datos, rate, dias) {
    this.setState({
      horas: horas,
      datos: datos,
      rate: rate,
      dias: dias,
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
          console.log(this.state.initialDate);
          console.log(this.state.endDate);
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
  setFilter(value) {
    this.setState(
      {
        filter: value,
        customdates: null,
        calendar: false,
        porDia: value == 0 || value == 1 ? false : true,
        newInterval:
          value == 0 || value == 1 ? "Cada Hora" : this.state.newInterval
      },
      () => {
        var steps = this.state.numSteps;
        if (value == -1) {
          steps = steps;
        } else if (value == 0) {
          steps = "1";
        } else if (value == 1) {
          steps = "1";
        } else if (value == 2) {
          steps = this.state.porDia ? "1" : "24";
        } else if (value == 3) {
          steps = this.state.porDia ? "1" : "24";
        }

        this.setState(
          {
            numSteps: steps
          },
          () => {
            this.getChartData();
          }
        );
      }
    );
  }
  setNewInterval(filter, texto) {
    this.setState({
      newInterval: texto
    });
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
    const data1 = [
      {
        titulo: "Calendario",
        selected: this.state.filter,
        function: this.Calendario,
        filter: -1
      },
      {
        titulo: "Hoy",
        selected: this.state.filter,
        function: this.setFilter,
        filter: 0
      },
      {
        titulo: "Ayer",
        selected: this.state.filter,
        function: this.setFilter,
        filter: 1
      },
      {
        titulo: "Esta semana",
        selected: this.state.filter,
        function: this.setFilter,
        filter: 2
      },
      {
        titulo: "Este mes",
        selected: this.state.filter,
        function: this.setFilter,
        filter: 3
      }
    ];
    var chartAxis = {
      data: []
    };
    var colors = [];
    for (i = 0; i < this.state.rate.length; i++) {
      if (this.state.rate[i] == "base") {
        colors[i] = "#EDDC44";
      } else if (this.state.rate[i] == "middle") {
        colors[i] = "#25CEBC";
      } else {
        colors[i] = "#DE3E10";
      }
    }
    for (var i in this.state.datos) {
      var stringDia = `${moment(this.state.dias[i])
        .locale("es")
        .format("dddd")} ${this.state.dias[i].substr(
        8,
        this.state.dias[i].length
      )}`;

      var stringDia1 = stringDia.charAt(0).toUpperCase() + stringDia.slice(1);
      var stringDia2 = stringDia1.concat(", ").concat(this.state.horas[i]);
      var item = this.state.datos[i];
      var item2 = this.state.dias[i];
      var item3 = stringDia2;
      var color = colors[i];
      chartAxis.data.push({
        label: item3,
        value: item,
        dias: item2,
        color: color,
        toolText: `<div id='divTable'><table id='dataTable' width='100px'><tr class=''><td>${stringDia2}</td></tr><tr ><td style="background-color:${color};"></td><th>Costo: </th><td>$${item.toFixed(
          2
        )} MXN</td></tr></table></div>`
      });
    }
    let group = chartAxis.data.reduce((r, a) => {
      r[a.dias] = [...(r[a.dias] || []), a];
      return r;
    }, {});
    var group2 = {
      data: []
    };
    for (i in group) {
      group2.data.push(group[i]);
    }
    var arrayPerDay = {
      data: []
    };

    group2.data.forEach(element => {
      var base = [];
      var media = [];
      var punta = [];
      for (i in element) {
        if (element[i].color == "#EDDC44") {
          base.push(element[i].value);
        } else if (element[i].color == "#25CEBC") {
          media.push(element[i].value);
        } else if (element[i].color == "#DE3E10") {
          punta.push(element[i].value);
        }
      }
      var total_dia =
        base.reduce((a, b) => a + b, 0) +
        media.reduce((a, b) => a + b, 0) +
        punta.reduce((a, b) => a + b, 0);

      arrayPerDay.data.push({
        label: element[0].label,
        value: total_dia,
        toolText: `<div id='divTable'><table id='dataTable' width='100px'><tr class=''><th>Costo total:</th><td>$${total_dia.toFixed(
          2
        )}</td></tr><tr><td style="background-color:#EDDC44;width: 3px;height: 3px;"></td><th>Base:</th><td>$${base
          .reduce((a, b) => a + b, 0)
          .toFixed(
            2
          )}</td></tr><tr><td style="background-color:#25CEBC; "></td><th>Media:</th><td>$${media
          .reduce((a, b) => a + b, 0)
          .toFixed(
            2
          )}</td></tr><tr><td style="background-color:#DE3E10;"></td><th>Punta:</th><td>$${punta
          .reduce((a, b) => a + b, 0)
          .toFixed(2)}</td></tr></table></div>`,
        color: "#F68C42"
      });
    });

    console.log(moment("2020-01-27").format("dddd"));

    return (
      <SafeAreaView>
        <ScrollView>
          <View style={[styles.container]}>
            <View
              style={[
                styles.topView,
                {
                  flexDirection:
                    this.state.orientation == "portrait" ? "column" : "row"
                }
              ]}
            >
              <View
                style={[
                  this.state.orientation == "portrait"
                    ? styles.pCalendarView
                    : styles.lCalendarView
                ]}
              >
                <CCPicker
                  function={this.setDevice.bind(this)}
                  selectedValue={this.state.pickerValue}
                />
                {this.state.orientation == "portrait" && this.state.porDia && (
                  <View
                    style={[
                      styles.timeButtons,
                      { width: null, paddingBottom: 0, paddingRight: 0 }
                    ]}
                  >
                    <CSButtons
                      setFunction={this.setNewInterval.bind(this)}
                      texto={"Cada Hora"}
                      selected={this.state.newInterval}
                      filter={-1}
                      width={Math.min(screenWidth, screenHeight) / 5.6}
                      marginLeft={5}
                    />
                    <CSButtons
                      setFunction={this.setNewInterval.bind(this)}
                      texto={"Cada Dia"}
                      selected={this.state.newInterval}
                      filter={0}
                      width={Math.min(screenWidth, screenHeight) / 5.6}
                      marginLeft={5}
                    />
                  </View>
                )}
              </View>
              <View
                style={[
                  styles.optionButtonsView,
                  {
                    justifyContent:
                      this.state.orientation == "portrait"
                        ? "space-between"
                        : "flex-end"
                  }
                ]}
              >
                {data1.map(boton => (
                  <CSButtons
                    setFunction={boton.function}
                    texto={boton.titulo}
                    selected={boton.selected}
                    filter={boton.filter}
                    width={Math.min(screenWidth, screenHeight) / 5.6}
                    marginLeft={boton.titulo == "Calendario" ? 0 : 5}
                  />
                ))}
              </View>
            </View>
            {this.state.orientation == "landscape" && this.state.porDia && (
              <View style={[styles.timeButtons]}>
                <View
                  style={[styles.timeButtons, { width: null, paddingRight: 0 }]}
                >
                  <CSButtons
                    setFunction={this.setNewInterval.bind(this)}
                    texto={"Cada Hora"}
                    selected={this.state.newInterval}
                    filter={-1}
                    width={Math.min(screenWidth, screenHeight) / 5.6}
                    marginLeft={5}
                  />
                  <CSButtons
                    setFunction={this.setNewInterval.bind(this)}
                    texto={"Cada Dia"}
                    selected={this.state.newInterval}
                    filter={0}
                    width={Math.min(screenWidth, screenHeight) / 5.6}
                    marginLeft={5}
                  />
                </View>
              </View>
            )}
            <View style={[styles.chart]}>
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
                <FusionCharts
                  type={"column2d"}
                  width={
                    this.state.orientation == "portrait"
                      ? Math.min(screenWidth, screenHeight) - 20
                      : Math.max(screenWidth, screenHeight) - 100
                  }
                  height={this.state.orientation == "portrait" ? 500 : 400}
                  dataFormat={"json"}
                  dataSource={{
                    chart: {
                      caption: "Consumo",
                      numberprefix: " ",
                      yAxisValueFontSize: "9",
                      theme: Platform.OS == "ios" ? "ocean" : "fusion",
                      rotatelabels: "1",
                      showValues: "0",
                      labelFontSize: "9",
                      labelStep: this.state.numSteps
                    },
                    data:
                      this.state.newInterval == "Cada Hora"
                        ? chartAxis.data
                        : arrayPerDay.data
                  }}
                  libraryPath={this.libraryPath}
                />
              )}
              {this.state.datos && !this.state.indicator && (
                <Colors color={this.state.newInterval} />
              )}
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
    height: "auto",
    width: "100%",
    padding: 10,
    paddingBottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    height: "auto",
    justifyContent: "center",
    alignItems: "center"
  },
  chart: {
    justifyContent: "center",
    alignItems: "center",
    height: "auto"
  },
  optionButtonsView: {
    height: "auto",
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
    width: "100%",
    marginTop: 5
  },
  pCalendarView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  lCalendarView: {
    width: "100%",
    flexDirection: "column",
    flex: 0.5
  },
  timeButtons: {
    justifyContent: "flex-end",
    flexDirection: "row",
    backgroundColor: "white",
    paddingBottom: 10,
    paddingRight: 10,
    width: "100%",
    marginTop: 5
  }
});
