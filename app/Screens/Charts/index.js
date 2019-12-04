import React, { Component, PropTypes } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import HeaderMenu from "../../Components/HeaderMenu.js";
import DatesPicker from "../../Components/Pickers/DatePicker.js";
import Chart from "../../Components/Chart.js";
import { connect } from "react-redux";
import CCPicker from "../../Components/Pickers/CCPicker.js";
import CSButtons from "../../Components/CSButtons.js";
import FilterPicker from "../../Components/Pickers/FilterPicker";
import IntervalPicker from "../../Components/Pickers/IntervalPicker";
import ActivityI from "../../Components/ActivityIndicator";
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer
});
class ChartScreen extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    this.state = {
      pickerValue: "Servicio 1",
      pickerFValue: "Hoy",
      pickerIvalue: "15 minutos",
      indicator: false,
      calendar: false,
      arrayWithData: [],
      dates: [],
      insents: [],
      device: "",
      service: "Servicio 1",
      variable: "EPimp",
      filter: 0,
      timeCustomButtons: true,
      interval: 900,
      customdates: null,
      values: [],
      initialDate: "",
      endDate: "",
      caption: "Consumo",
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
    this.setVariabe = this.setVariabe.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <SafeAreaView>
          <View style={styles.header}>
            <HeaderMenu selected={"charts"} />
          </View>
        </SafeAreaView>
      )
    };
  };

  componentWillMount() {
    this._retrieveData();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
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
            if (this.props.readings.meterId) {
              this.getChartData();
            }
          }
        );
        console.log(this.state.values);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  getChartData() {
    this.setState({
      indicator: true
    });
    fetch(
      `http://api.ienergybook.com/api/Meters/standardReadings?access_token=${this.state.values.accesToken}`,
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
          variable: this.state.variable,
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
        var array1 = json[1];
        var fechas = [];
        var array = [];
        const puntos = ":";
        for (var i = 0; i < array1.length; i++) {
          array[i] = array1[i];
          fechas[i] = array1[i].date
            .substr(8, 2)
            .concat(puntos.concat(array1[i].date.substr(10, 2)));
          console.log(
            array1[i].date
              .substr(8, 2)
              .concat(puntos.concat(array1[i].date.substr(10, 2)))
          );
        }
        this.setValues(array, fechas);
      })
      .catch(err => {
        console.log("no se pudo");
      });
  }
  setValues(array, fechas) {
    this.setState({
      arrayWithData: array,
      dates: fechas,
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
  setVariabe(value) {
    this.setState(
      {
        variable: value
      },
      () => {
        if (value == "DP") {
          this.setState(
            {
              caption: "Demanda",
              pickerIValue: "15 minutos"
              //interval: 900,
              //timeCustomButtons: false
            },
            () => {
              this.getChartData();
            }
          );
        } else if (value == "EPimp") {
          this.setState(
            {
              caption: "Consumo",
              //timeCustomButtons: true,
              pickerIValue: "15 minutos"
            },
            () => {
              this.getChartData();
            }
          );
        }
      }
    );
  }
  setInterval(value, texto) {
    if (value == "15 minutos" || texto == "15 minutos") {
      var intervalo = 900;
    } else if (value == "30 minutos" || texto == "30 minutos") {
      var intervalo = 1800;
    } else if (value == "1 hora" || texto == "1 hora") {
      var intervalo = 3600;
    } else if (value == "5 minutos" || texto == "5 minutos") {
      var intervalo = 300;
    }
    this.setState(
      {
        interval: intervalo,
        pickerIValue: texto
      },
      () => {
        this.getChartData();
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
    }
    this.setState(
      {
        filter: filtro,
        customdates: null,
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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          <KeyboardAvoidingView enabled>
            <View style={[styles.container]}>
              <View style={styles.topView}>
                <View style={styles.topView1}>
                  <View style={{ flex: 1 }}>
                    <CCPicker
                      function={this.setDevice.bind(this)}
                      selectedValue={this.state.pickerValue}
                    />
                  </View>

                  <View style={styles.outsideTB}>
                    {this.state.orientation == "portrait" && (
                      <IntervalPicker
                        function={this.setInterval.bind(this)}
                        selectedValue={this.state.pickerIValue}
                        screen={"charts"}
                      />
                    )}
                    {this.state.orientation == "landscape" && (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-end"
                        }}
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
                        <CSButtons
                          setFunction={this.setInterval}
                          texto={"5 minutos"}
                          selected={this.state.interval}
                          filter={300}
                        />
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.topView2}>
                  <View style={[styles.variableButtons]}>
                    <CSButtons
                      setFunction={this.setVariabe}
                      texto={"Consumo"}
                      selected={this.state.caption}
                      filter={"EPimp"}
                    />
                    <CSButtons
                      setFunction={this.setVariabe}
                      texto={"Demanda"}
                      selected={this.state.caption}
                      filter={"DP"}
                    />
                  </View>
                  <View style={styles.filterOptions}>
                    {this.state.orientation == "portrait" && (
                      <FilterPicker
                        function={this.setFilter.bind(this)}
                        selectedValue={this.state.pickerFValue}
                      />
                    )}
                    {this.state.orientation == "landscape" && (
                      <View style={{ flex: 1, flexDirection: "row" }}>
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
                    )}
                  </View>
                </View>
              </View>
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
                {this.state.arrayWithData && !this.state.indicator && (
                  <Chart
                    type={"line"}
                    caption={this.state.caption}
                    data={chartAxis.data}
                  />
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(ChartScreen);

const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  header: {
    justifyContent: "center",
    height: 60
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    backgroundColor: "white"
  },
  topView: {
    height: "auto",
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  topView1: {
    height: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  outsideTB: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  topView2: {
    height: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20
  },
  variableButtons: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: Math.min(screenWidth, screenHeight) / 2.5
  },
  filterOptions: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  chart: {
    justifyContent: "center",
    height: "auto"
  }
});
