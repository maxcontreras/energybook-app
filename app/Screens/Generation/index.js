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
import moment from "moment/min/moment-with-locales";

const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  adminIds: state.adminReducer
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
      dias: [],
      horas: [],
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

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <SafeAreaView>
          <View style={styles.header}>
            <HeaderMenu selected={"Generation"} />
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
    const url = `http://api.ienergybook.com/api/DesignatedMeters/generation?company_id=${
      this.props.adminIds.company_id != ""
        ? this.props.adminIds.company_id
        : this.state.values.companyId
    }&${this.state.cService ? "service" : "device"}_name=${
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
    console.log(
      this.props.adminIds.meter_id != ""
        ? this.props.adminIds.meter_id
        : this.props.readings.meterId
    );
    console.log(this.state.device);
    console.log(this.state.service);
    console.log(this.state.filter);
    console.log(this.state.interval);
    console.log(this.state.variable);
    console.log(this.state.customdates);

    this.setState({
      indicator: true
    });
    const id =
      this.props.adminIds.meter_id != ""
        ? this.props.adminIds.meter_id
        : this.props.readings.meterId;
    fetch(
      `http://api.ienergybook.com/api/Meters/generationReadings?access_token=${this.state.values.accesToken}`,
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
        var horas = [];
        var dias = [];
        const puntos = ":";
        for (var i = 0; i < array1.length; i++) {
          array[i] = array1[i];
          horas[i] = array1[i].date
            .substr(8, 2)
            .concat(puntos.concat(array1[i].date.substr(10, 2)));
          dias[i] = array1[i].date
            .substr(4, 4)
            .concat("-")
            .concat(array1[i].date.substr(2, 2))
            .concat("-")
            .concat(array1[i].date.substr(0, 2));
        }

        this.setState(
          {
            arrayWithData: array,
            indicator: false,
            dias: dias,
            horas: horas
          },
          () => {
            this.getCardsData();
          }
        );
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
          console.log(this.state.initialDate);
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
    var steps = this.state.numSteps;
    var data = [
      { filterS: "Calendario", filter: -1, steps: steps },
      { filterS: "Hoy", filter: 0, steps: "1" },
      { filterS: "Ayer", filter: 1, steps: "1" },
      { filterS: "Esta Semana", filter: 2, steps: "24" },
      { filterS: "Este mes", filter: 3, steps: "24" },
      { filterS: "Este año", filter: 4, steps: "1" }
    ];
    for (i in data) {
      if (value == data[i].filterS || texto == data[i].filterS) {
        var filtro = data[i].filter;
        steps = data[i].steps;
      }
    }
    this.setState(
      {
        filter: filtro,
        customdates: { from: null, until: null },
        calendar: filtro == -1 ? true : false,
        pickerFValue: texto,
        numSteps: steps
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
        variable: value,
        caption: texto
      },
      () => {
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
        var stringDia = `${moment(this.state.dias[i])
          .locale("es")
          .format("dddd")} ${this.state.dias[i].substr(
          8,
          this.state.dias[i].length
        )}`;

        var stringDia1 = stringDia.charAt(0).toUpperCase() + stringDia.slice(1);
        var stringDia2 = stringDia1.concat(", ").concat(this.state.horas[i]);
        var stringMonth1 = moment(this.state.dias[i])
          .locale("es")
          .format("MMMM");
        var item = this.state.arrayWithData[i];
        var item2 = stringDia2;
        var item3 = stringMonth1;

        chartAxis.data.push({
          label: item2,
          date: stringMonth1
            .concat(" ")
            .concat(this.state.dias[i].substr(0, 4)),
          value: item.value,
          month: stringMonth1,
          color: "#1CD6BF",
          toolText: `<div id='divTable'><table id='dataTable' width='100px'><tr class=''><td>${stringDia2}</td></tr><tr><th>${
            this.state.caption
          }</th><td>${item.value.toFixed(2)} kWh</td></tr></table></div>`
        });
      }
      let group = chartAxis.data.reduce((r, a) => {
        r[a.month] = [...(r[a.month] || []), a];
        return r;
      }, {});
      var group2 = {
        data: []
      };
      for (i in group) {
        group2.data.push(group[i]);
      }
      var arrayPerYear = {
        data: []
      };
      group2.data.forEach(element => {
        var value = [];
        for (i in element) {
          value.push(element[i].value);
        }
        var total_year = value.reduce((a, b) => a + b, 0);

        arrayPerYear.data.push({
          label:
            element[i].date.charAt(0).toUpperCase() + element[i].date.slice(1),
          value: total_year,
          color: element[i].color,
          toolText: `<div id='divTable'><table id='dataTable' width='100px'><tr class=''><td style="background-color:#1CD6BF;"><th>${
            this.state.caption
          }</th><td>${total_year.toFixed(2)} kWh</td></tr></table></div>`
        });
      });
      console.log(arrayPerYear.data);
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          <View style={styles.container}>
            <View
              style={[
                styles.topView,
                this.state.orientation == "portrait"
                  ? { width: Math.min(screenWidth, screenHeight) }
                  : { width: "100%" }
              ]}
            >
              <View style={[styles.calendarView]}>
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
                      texto={"Este mes"}
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
              <View
                style={[
                  styles.variableView,
                  this.state.orientation == "portrait"
                    ? { justifyContent: "space-between" }
                    : { alignItems: "flex-end", justifyContent: "flex-end" }
                ]}
              >
                <CSButtons
                  setFunction={this.setVariabe}
                  texto={"Generación"}
                  selected={this.state.caption}
                  filter={0}
                  generacion={true}
                />
                <CSButtons
                  setFunction={this.setVariabe}
                  texto={"Autoconsumo"}
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
              </View>
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
                  data={
                    this.state.filter == 4 ? arrayPerYear.data : chartAxis.data
                  }
                  numSteps={this.state.numSteps}
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
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white"
  },
  optionButtonsView: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1
  },
  calendarView: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    paddingBottom: 5
  },
  topView: {
    height: "auto",
    justifyContent: "center"
  },
  variableView: {
    flexDirection: "row",
    padding: 10,
    paddingTop: 0
  },
  chart: {
    justifyContent: "center",
    height: "auto"
  },
  scroll: {
    flex: 1
  }
});
