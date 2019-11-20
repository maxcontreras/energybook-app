import React, { Component, PropTypes } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert
} from "react-native";
import HeaderMenu from "../../Components/HeaderMenu.js";
import FusionCharts from "react-native-fusioncharts";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import DatesPicker from "../../Components/Pickers/DatePicker.js";
import NCPicker from "../../Components/Pickers/NCPicker.js";
import CSButtons from "../../Components/CSButtons.js";
import FilterPicker from "../../Components/Pickers/FilterPicker.js";
import ActivityI from "../../Components/ActivityIndicator";
const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer
});
class Codes extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    this.state = {
      lenght: null,
      values: [],
      dates: [],
      valores1: [],
      valores2: [],
      valores3: [],
      horas: null,
      indicator: false,
      pickerFValue: "Hoy",
      pickerValue: this.props.readings.devices
        ? this.props.readings.devices[1].description
        : null,
      device: this.props.readings.devices
        ? this.props.readings.devices[1].name
        : null,
      filter: 0,
      variables: ["Vab", "Vbc", "Vca"],
      caption: "Voltaje",
      interval: 3600,
      custom_dates: { from: null, until: null },
      initialDate: "",
      endDate: "",
      arrayNameDevices: [],
      arrayDescriptionDevices: [],
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
    this.setFilter = this.setFilter.bind(this);
    this.setInterval = this.setInterval.bind(this);
    this.Calendario = this.Calendario.bind(this);
    this.setVariabe = this.setVariabe.bind(this);
    this.setInitial = this.setInitial.bind(this);
    this.setDevice = this.setDevice.bind(this);
    this.setEnd = this.setEnd.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <SafeAreaView>
          <View style={styles.header}>
            <HeaderMenu selected={"codigo"} />
          </View>
        </SafeAreaView>
      )
    };
  };
  componentWillMount() {
    console.log(this.props);
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
      }
    } catch (error) {}
  };
  getChartData() {
    this.setState({
      indicator: true
    });
    fetch(
      `http://api.ienergybook.com/api/Meters/getNetCodeReadings?access_token=${this.state.values.accesToken}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: this.props.readings.meterId,
          device: this.state.device,
          filter: this.state.filter,
          variables: this.state.variables,
          interval: this.state.interval,
          custom_dates: this.state.custom_dates
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
        console.log(json);

        var variable1 =
          json[1].Vab ||
          json[1].Ia ||
          json[1].THDIa ||
          json[1].Vunbl ||
          json[1].Ssist;
        var variable2 =
          json[1].Vbc || json[1].Ib || json[1].THDIb || json[1].Iunbl || null;
        var variable3 = json[1].Vca || json[1].Ic || json[1].THDIc || null;
        const puntos = ":";
        var horas = [];
        this.setState(
          {
            lenght: variable1.length
          },
          () => {
            console.log(this.state.lenght);
            for (var i = 0; i < this.state.lenght; i++) {
              horas[i] = variable1[i].date
                .substr(8, 2)
                .concat(puntos.concat(variable1[i].date.substr(10, 2)));
            }
          }
        );
        this.setState(
          {
            indicator: false,
            valores1: variable1,
            horas: horas,
            valores2: variable2,
            valores3: variable3
          },
          () => {
            this.setValues();
          }
        );
      })
      .catch(err => {
        this.setState({
          indicator: false
        });
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
              custom_dates: {
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
  setVariabe(value, texto) {
    this.setState(
      {
        variables: value,
        caption: texto
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
    var getIndex = arrayDescriptionDevices.indexOf(itemValue);
    this.setState(
      {
        device: arrayNameDevices[getIndex],
        pickerValue: itemValue
      },
      () => {
        this.getChartData();
      }
    );
  }

  setValues() {
    var dataV1 = {
      data: []
    };
    var dataV2 = {
      data: []
    };
    var dataV3 = {
      data: []
    };
    var dataHoras = {
      data: []
    };
    for (var i = 0; i < this.state.lenght; i++) {
      dataV1.data.push({
        value: this.state.valores1[i].value
      });
    }
    for (i = 0; i < this.state.lenght; i++) {
      if (this.state.valores2 != null) {
        dataV2.data.push({
          value: this.state.valores2[i].value
        });
      }
    }
    for (i = 0; i < this.state.lenght; i++) {
      if (this.state.valores3 != null) {
        dataV3.data.push({
          value: this.state.valores3[i].value
        });
      }
    }
    for (i = 0; i < this.state.lenght; i++) {
      dataHoras.data.push({
        label: this.state.horas[i]
      });
    }
    this.setState(
      {
        valores1: dataV1.data,
        valores2: dataV2.data,
        valores3: dataV3.data,
        horas: dataHoras.data
      },
      () => {
        console.log(this.state.valores1);
        console.log(this.state.valores2);
      }
    );
  }

  render() {
    var dataSource = {
      chart: {
        caption: this.state.caption,
        labelFontSize: "9",
        palettecolors: "ACDE9C,9CB2D8,5E5E5E",
        showhovereffect: "1",
        drawcrossline: "1",
        theme: Platform.OS == "ios" ? "ocean" : "fusion",
        setAdaptiveYMin: "1",
        labelDisplay: "Auto",
        useEllipsesWhenOverflow: "0",
        rotatelabels: "1"
      },
      categories: [
        {
          category: this.state.horas
        }
      ],
      dataset: [
        {
          seriesname: this.state.variables[0],
          data: this.state.valores1
        },
        {
          seriesname:
            this.state.variables == null ? null : this.state.variables[1],
          data: this.state.valores2
        },
        {
          seriesname:
            this.state.variables[2] == null ? null : this.state.variables[2],
          data: this.state.valores3
        }
      ]
    };
    const uno = screenHeight;
    const dos = screenWidth;

    const unou = screenWidth;
    const dosd = screenHeight;
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={[styles.container]}>
            <View
              style={[
                styles.topView,

                this.state.orientation == "portrait"
                  ? { width: Math.min(screenWidth, screenHeight) }
                  : { width: null }
              ]}
            >
              <View style={[styles.calendarView]}>
                <View
                  style={[
                    styles.extraView,

                    this.state.orientation == "portrait"
                      ? { flexDirection: "row" }
                      : { flexDirection: "column" },

                    this.state.orientation == "portrait"
                      ? { justifyContent: "space-between" }
                      : { justifyContent: null }
                  ]}
                >
                  <NCPicker
                    function={this.setDevice.bind(this)}
                    selectedValue={this.state.pickerValue}
                  />
                  {this.state.orientation == "portrait" && (
                    <FilterPicker
                      function={this.setFilter.bind(this)}
                      selectedValue={this.state.pickerFValue}
                      width={100}
                      screen={"network"}
                    />
                  )}
                </View>
                <View
                  style={[
                    styles.variableView,
                    this.state.orientation == "landscape"
                      ? {
                          flex: 1
                        }
                      : { flex: null }
                  ]}
                >
                  <CSButtons
                    setFunction={this.setVariabe}
                    texto={"Voltaje"}
                    selected={this.state.caption}
                    filter={["Vab", "Vbc", "Vca"]}
                  />
                  <CSButtons
                    setFunction={this.setVariabe}
                    texto={"Amperaje"}
                    selected={this.state.caption}
                    filter={["Ia", "Ib", "Ic"]}
                  />
                  <CSButtons
                    setFunction={this.setVariabe}
                    texto={"THD"}
                    selected={this.state.caption}
                    filter={["THDIa", "THDIb", "THDIc"]}
                  />
                  <CSButtons
                    setFunction={this.setVariabe}
                    texto={"Desbalance"}
                    selected={this.state.caption}
                    //Vunbl y Iunbl
                    filter={["Vunbl", "Iunbl"]}
                  />
                  <CSButtons
                    setFunction={this.setVariabe}
                    texto={"kVA"}
                    selected={this.state.caption}
                    filter={["Ssist"]}
                  />
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
                </View>
              )}
            </View>
            <View
              style={[
                styles.timeButtons,
                this.state.orientation == "portrait"
                  ? {
                      justifyContent: "flex-start"
                    }
                  : { justifyContent: "flex-end" }
              ]}
            >
              <CSButtons
                setFunction={this.setInterval}
                texto={"1 Hora"}
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
              {dataSource && !this.state.indicator && (
                <FusionCharts
                  type={"msline"}
                  dataFormat={"json"}
                  dataSource={dataSource}
                  libraryPath={this.libraryPath} // set the libraryPath property
                  width={
                    this.state.orientation == "portrait"
                      ? Math.min(screenWidth, screenHeight) - 20
                      : Math.max(screenWidth, screenHeight) - 100
                  }
                  height={this.state.orientation == "portrait" ? 500 : 400}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default connect(mapStateToProps)(Codes);
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center"
  },
  topView: {
    height: 110,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    height: "auto",
    justifyContent: "center",
    alignItems: "center"
  },
  chart: {
    justifyContent: "center",
    height: "auto"
  },
  optionButtonsView: {
    height: 110,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
    padding: 10
  },
  calendarView: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between"
  },
  timeButtons: {
    height: "auto",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    alignItems: "flex-end",
    padding: 10
  },
  variableView: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingRight: 10
  }
});
