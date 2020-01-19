import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView
} from "react-native";
import HeaderMenu from "../../Components/HeaderMenu.js";
import CCPicker from "../../Components/Pickers/CCPicker.js";
import FilterPicker from "../../Components/Pickers/FilterPicker.js";
import { connect } from "react-redux";
import Chart from "../../Components/Chart.js";
import CSButtons from "../../Components/CSButtons.js";
import CardsCompP from "../../Components/CardsCompP";
import CardsCompL from "../../Components/CardsCompL";
import AsyncStorage from "@react-native-community/async-storage";
import ActivityI from "../../Components/ActivityIndicator";
import DatePicker from "../../Components/Pickers/DatePicker";

const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  adminIds: state.adminReducer
});
class Carbon extends Component {
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
      device: "",
      cards: true,
      cardService: "Servicio 1",
      cService: true,
      cardDevice: null,
      cDevice: false,
      arrayWithData: [],
      dates: [],
      device: "",
      service: "Servicio 1",
      filter: 0,
      interval: 3600,
      pickerFValue: "Hoy",
      customdates: { from: null, until: null },
      values: [],
      caption: "CO2e",
      pickerValue: "Servicio 1"
    };
    this.setFilter = this.setFilter.bind(this);
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

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <SafeAreaView>
          <View style={styles.header}>
            <HeaderMenu selected={"carbon"} />
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
    const url = `http://api.ienergybook.com/api/DesignatedMeters/carbonFootprint?company_id=${
      this.props.adminIds.company_id != ""
        ? this.props.adminIds.company_id
        : this.state.values.companyId
    }&service_name=${
      this.state.cDevice
        ? this.state.cardDevice
        : this.state.cardService.replace(" ", "%20")
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
        this.setState(
          {
            indicator: false,
            response: json[1].response,
            cards: true
          },
          () => {}
        );
      })
      .catch(err => {
        console.log("no  se pudo");
        this.setState({
          cards: true
        });
      });
  }

  getChartData() {
    this.setState({
      indicator: true
    });
    console.log("CHART DATA: ");
    console.log(this.state.values.accesToken);
    const id =
      this.props.adminIds.meter_id != ""
        ? this.props.adminIds.meter_id
        : this.props.readings.meterId;
    console.log(id);

    fetch(
      `http://api.ienergybook.com/api/Meters/co2e?access_token=${this.state.values.accesToken}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
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
        this.setState({
          arrayWithData: array,
          dates: fechas,
          indicator: false
        });
        this.getCardsData();
      })
      .catch(err => {
        console.log("no  se pudo");
        this.setState({
          indicator: false
        });
        Alert.alert(
          "Error",
          "Hubo un error al obtener los datos del medidor.",
          [
            {
              text: "Okay"
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
          value: item.co2e,
          color: "#1CD6BF",
          showLabel: 1
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
                  ? {
                      width: Math.min(screenWidth, screenHeight),
                      flexDirection: "row",
                      height: "auto",
                      justifyContent: "space-between"
                    }
                  : {
                      width: null,
                      flexDirection: "row"
                    }
              ]}
            >
              <View style={styles.calendarView}>
                <CCPicker
                  function={this.setDevice.bind(this)}
                  selectedValue={this.state.pickerValue}
                />
                {this.state.orientation == "portrait" && (
                  <FilterPicker
                    function={this.setFilter.bind(this)}
                    selectedValue={this.state.pickerFValue}
                    screen={"gene"}
                  />
                )}
              </View>

              {this.state.orientation == "landscape" && (
                <View
                  style={[
                    styles.optionButtonsView,
                    this.state.orientation == "portrait"
                      ? {
                          width: Math.min(screenWidth, screenHeight),
                          justifyContent: "space-between"
                        }
                      : { width: null, flex: 1.5 }
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
                  type={"column2d"}
                  caption={this.state.caption}
                  data={chartAxis.data}
                />
              )}
            </View>
            {this.state.orientation == "portrait" && this.state.cards && (
              <CardsCompP response={this.state.response} screen={"carbon"} />
            )}
            {this.state.orientation == "landscape" && this.state.cards && (
              <CardsCompL response={this.state.response} screen={"carbon"} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(Carbon);
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center"
  },
  container: {
    alignItems: "center",
    height: "auto",
    justifyContent: "center",
    backgroundColor: "white"
  },
  optionButtonsView: {
    height: 60,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
    padding: 10
  },
  calendarView: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  topView: {
    height: 60,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  cards: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    flexDirection: "row"
  },
  chart: {
    justifyContent: "center",
    height: "auto"
  },
  extraButton: {
    justifyContent: "center",
    height: "auto",
    paddingHorizontal: 10
  }
});
