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
  readings: state.dailyReducer
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
    var url = `http://api.ienergybook.com/api/DesignatedMeters/carbonFootprint?company_id=${
      this.state.values.companyId
    }&service_name=${
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
        console.log(json[1].response);

        this.setState({
          indicator: false,
          response: json[1].response,
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
    //console.log(this.state.variable);
    console.log(this.state.interval);
    console.log(this.state.customdates);
    this.setState({
      indicator: true
    });
    fetch(
      `http://api.ienergybook.com/api/Meters/co2e?access_token=${this.state.values.accesToken}`,
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
      })
      .catch(err => {
        console.log("no  se pudo");
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
  setFilter(value) {
    this.setState(
      {
        filter: value,
        customdates: { from: null, until: null },
        calendar: false
      },
      () => {
        this.getCardsData();
        this.getChartData();
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
    const uno = screenHeight;
    const dos = screenWidth;

    const unou = screenWidth;
    const dosd = screenHeight;
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
                      flexDirection: "column",
                      height: "auto"
                    }
                  : { width: null, flexDirection: "row" }
              ]}
            >
              <View style={styles.calendarView}>
                <CCPicker
                  function={this.setDevice.bind(this)}
                  selectedValue={this.state.pickerValue}
                />
              </View>
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
                {this.state.orientation == "landscape" && (
                  <CSButtons
                    setFunction={this.setFilter}
                    texto={"Este año"}
                    selected={this.state.filter}
                    filter={4}
                  />
                )}
              </View>
            </View>
            {this.state.orientation == "portrait" && (
              <View
                style={[
                  styles.extraButton,
                  this.state.orientation == "portrait"
                    ? { width: Math.min(screenWidth, screenHeight) }
                    : { width: Math.max(screenWidth, screenHeight) }
                ]}
              >
                <CSButtons
                  setFunction={this.setFilter}
                  texto={"Este año"}
                  selected={this.state.filter}
                  filter={4}
                />
              </View>
            )}
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
    justifyContent: "center"
  },
  optionButtonsView: {
    height: 60,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
    padding: 10
  },
  calendarView: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white"
  },
  topView: {
    height: 60,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    backgroundColor: "white"
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
  width: {
    width: screenWidth
  },
  height: {
    width: screenHeight
  },
  extraButton: {
    justifyContent: "center",
    height: "auto",
    paddingHorizontal: 10
  }
});
