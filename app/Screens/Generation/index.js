//0 generation 1 selfconsumption 2 networkinjection

import React, { Component, PropTypes } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Alert
} from "react-native";
import HeaderMenu from "../../Components/HeaderMenu.js";
import CCPicker from "../../Components/Pickers/CCPicker.js";
import { connect } from "react-redux";
import Chart from "../../Components/Chart.js";
import CSButtons from "../../Components/CSButtons.js";
import CardsCompP from "../../Components/CardsCompP";
import CardsCompL from "../../Components/CardsCompL";
import AsyncStorage from "@react-native-community/async-storage";
import FilterPicker from "../../Components/Pickers/FilterPicker.js";
import ActivityI from "../../Components/ActivityIndicator";
import DatePicker from "../../Components/Pickers/DatePicker";

const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer
});
class Generation extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape",
      indicator: false,
      calendar: false,
      cards: true,
      cardService: "Servicio 1",
      cService: true,
      cardDevice: null,
      cDevice: false,
      arrayWithData: [],
      dates: [],
      device: "",
      service: "Servicio 1",
      variable: 0,
      filter: 0,
      interval: 3600,
      customdates: { from: null, until: null },
      values: [],
      caption: "Generación",
      pickerValue: "Servicio 1",
      pickerFValue: "Hoy"
    };
    this.setFilter = this.setFilter.bind(this);
    this.setVariabe = this.setVariabe.bind(this);
    this.Calendario = this.Calendario.bind(this);
    this.setInitial = this.setInitial.bind(this);
    this.setEnd = this.setEnd.bind(this);

    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  componentWillMount() {
    this._retrieveData();
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      if (value !== null) {
        this.setState(
          {
            values: JSON.parse(value)
          },
          () => {
            this.getCardsData();
            this.getChartData();
          }
        );
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  getCardsData() {
    this.setState({
      indicator: true,
      cards: false
    });
    var serv = "Servicio%201";
    var url = `http://api.ienergybook.com/api/DesignatedMeters/generation?company_id=${
      this.state.values.companyId
    }${this.state.cService ? "service" : "device"}_name=${
      this.state.cDevice ? this.state.cardDevice : serv
    }&access_token=${this.state.values.accesToken}`;
    console.log(url);
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        console.log(json);

        this.setState({
          response: json[1].response,
          indicator: false,
          cards: true
        });
      })
      .catch(err => {
        console.log("no  se pudo");
        this.setState({
          cards: true
        });
      });
  }

  getChartData() {
    //console.log(this.state.id);
    console.log(this.state.device);
    console.log(this.state.service);
    console.log(this.state.filter);
    console.log(this.state.variable);
    console.log(this.state.interval);
    console.log(this.state.customdates);
    this.setState({
      indicator: true
    });
    fetch(
      `http://api.ienergybook.com/api/Meters/generationReadings?access_token=${this.state.values.accesToken}`,
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
          variable: this.state.variable,
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
        var array1 = json[1];
        var fechas = [];
        var array = [];
        const puntos = ":";
        for (var i = 0; i < array1.length; i++) {
          array[i] = array1[i];
          fechas[i] =
            this.state.filter == 4
              ? `${array1[i].date.substr(8, 2)}:${array1[i].date.substr(
                  10,
                  2
                )} ${array1[i].date.substr(0, 2)}/${array1[i].date.substr(
                  2,
                  2
                )}/${array1[i].date.substr(6, 2)} 
        `
              : array1[i].date
                  .substr(8, 2)
                  .concat(puntos.concat(array1[i].date.substr(10, 2)));
        }
        this.setValues(array, fechas);
      })
      .catch(err => {
        console.log("no  se pudo");
      });
  }
  setValues(array, fechas) {
    this.setState({
      arrayWithData: array,
      dates: fechas,
      indicator: false
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <SafeAreaView>
          <View style={styles.header}>
            <HeaderMenu selected={"gene"} />
          </View>
        </SafeAreaView>
      )
    };
  };

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

  setDevice(itemValue) {
    var arrayDescriptionDevices = [];
    var arrayNameDevices = [];
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
              cardDevice: arrayNameDevices[getIndex],
              cDevice: true,
              cService: false,
              service: "",
              device: arrayNameDevices[getIndex]
            },
            () => {
              this.getCardsData();
              this.getChartData();
            }
          );
        } else {
          this.setState(
            {
              cardService: this.state.pickerValue,
              cDevice: false,
              cService: true,
              service: this.state.pickerValue,
              device: ""
            },
            () => {
              this.getCardsData();
              this.getChartData();
            }
          );
        }
      }
    );
  }
  setFilter(value, texto) {
    if (value == "Calendario" || texto == "Calendario") {
      var filtro = -1;
    } else if (value == "Hoy" || texto == "Hoy") {
      var filtro = 0;
    } else if (value == "Ayer" || texto == "Ayer") {
      var filtro = 1;
    } else if (value == "Esta semana" || texto == "Esta semana") {
      var filtro = 2;
    } else if (value == "Este mes" || texto == "Este mes") {
      var filtro = 3;
    } else if (value == "Este año" || texto == "Este año") {
      var filtro = 4;
    }
    this.setState(
      {
        filter: filtro,
        customdates: { from: null, until: null },
        calendar: filtro == -1 ? true : false,
        pickerFValue: value
      },
      () => {
        if (filtro != -1) {
          this.getChartData();
        }
      }
    );
  }
  setVariabe(value, texto) {
    this.setState(
      {
        variable: value
      },
      () => {
        this.setState(
          {
            caption: texto
          },
          () => {
            this.getChartData();
          }
        );
      }
    );
  }

  render() {
    var chartAxis = {
      data: []
    };
    if (this.state.arrayWithData) {
      for (var i in this.state.arrayWithData) {
        var item = this.state.arrayWithData[i];
        var item2 = this.state.dates[i];

        chartAxis.data.push({
          label: item2,
          value: item.value
        });
      }
    }
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View
              style={[
                styles.topView,

                this.state.orientation == "portrait"
                  ? { width: Math.min(screenWidth, screenHeight) }
                  : { width: null }
              ]}
            >
              <View style={styles.calendarView}>
                <CCPicker
                  function={this.setDevice.bind(this)}
                  selectedValue={this.state.pickerValue}
                />
                <View style={[styles.variableView]}>
                  <CSButtons
                    setFunction={this.setVariabe}
                    texto={"Generación"}
                    selected={this.state.caption}
                    filter={0}
                    generacion={true}
                  />
                  <CSButtons
                    setFunction={this.setVariabe}
                    texto={"AutoConsumo"}
                    selected={this.state.caption}
                    filter={1}
                    generacion={true}
                  />
                  <CSButtons
                    setFunction={this.setVariabe}
                    texto={"Inyección a la red"}
                    selected={this.state.caption}
                    filter={2}
                    generacion={true}
                  />
                  {this.state.orientation == "portrait" && (
                    <FilterPicker
                      function={this.setFilter.bind(this)}
                      selectedValue={this.state.pickerFValue}
                      screen={"gene"}
                    />
                  )}
                </View>
              </View>
              {this.state.orientation == "landscape" && (
                <View style={styles.optionButtonsView}>
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
                    texto={"Esta Semana"}
                    selected={this.state.filter}
                    filter={2}
                  />
                  <CSButtons
                    setFunction={this.setFilter}
                    texto={"Este Mes"}
                    selected={this.state.filter}
                    filter={3}
                  />
                  <CSButtons
                    setFunction={this.setFilter}
                    texto={"Este año"}
                    selected={this.state.filter}
                    filter={4}
                  />
                </View>
              )}
            </View>
            {this.state.calendar && (
              <DatePicker
                initialDate={this.state.initialDate}
                endDate={this.state.endDate}
                setInitial={this.setInitial}
                setEnd={this.setEnd}
              />
            )}
            <View style={[styles.chart]}>
              {this.state.indicator && <ActivityI />}
              {this.state.arrayWithData && !this.state.indicator && (
                <Chart
                  type={"line"}
                  caption={this.state.caption}
                  data={chartAxis.data}
                />
              )}
            </View>
            {this.state.orientation == "portrait" && this.state.cards && (
              <CardsCompP
                response={this.state.response}
                screen={"generacion"}
              />
            )}
            {this.state.orientation == "landscape" && this.state.cards && (
              <CardsCompL
                response={this.state.response}
                screen={"generacion"}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(Generation);
var screenHeight = Math.round(Dimensions.get("window").height);
var screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center"
  },
  container: {
    alignItems: "center",
    height: "auto",
    justifyContent: "center"
  },
  optionButtonsView: {
    height: 120,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 3,
    padding: 10
  },
  calendarView: {
    flex: 2,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    justifyContent: "space-between"
  },
  topView: {
    height: 120,
    justifyContent: "center",
    flexDirection: "row"
  },
  variableView: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 10
  },
  chart: {
    justifyContent: "center",
    paddingTop: 5,
    height: "auto"
  },
  width: {
    width: screenWidth
  },
  height: {
    width: screenHeight
  }
});
