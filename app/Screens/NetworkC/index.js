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
import VariablePicker from "../../Components/Pickers/VariablePicker.js";
import ActivityI from "../../Components/ActivityIndicator";
import moment from "moment/min/moment-with-locales";
const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  adminIds: state.adminReducer
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
      numSteps: "1",
      dias: [],
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
            <HeaderMenu selected={"NetworkC"} />
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
          id:
            this.props.adminIds.meter_id != ""
              ? this.props.adminIds.meter_id
              : this.props.readings.meterId,
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
          json[1].Ssist ||
          json[1].FPa;
        var variable2 =
          json[1].Vbc ||
          json[1].Ib ||
          json[1].THDIb ||
          json[1].Iunbl ||
          json[1].FPb ||
          null;
        var variable3 =
          json[1].Vca || json[1].Ic || json[1].THDIc || json[1].FPc || null;
        const puntos = ":";
        var horas = [];
        var dias = [];
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
              dias[i] = variable1[i].date
                .substr(4, 4)
                .concat("-")
                .concat(variable1[i].date.substr(2, 2))
                .concat("-")
                .concat(variable1[i].date.substr(0, 2));
            }
          }
        );
        this.setState(
          {
            indicator: false,
            valores1: variable1,
            horas: horas,
            valores2: variable2,
            valores3: variable3,
            dias: dias
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
    var steps = this.state.numSteps;
    var numSteps = [
      {
        filter: -1,
        min5: this.state.steps,
        min15: this.state.steps,
        min30: this.state.steps,
        hr: this.state.steps
      },
      { filter: 0, min5: "12", min15: "4", min30: "2", hr: "1" },
      { filter: 1, min5: "12", min15: "4", min30: "2", hr: "1" },
      { filter: 2, min5: "288", min15: "96", min30: "48", hr: "24" }
    ];
    if (value == 900) {
      for (i in numSteps) {
        if (this.state.filter == numSteps[i].filter) {
          steps = numSteps[i].min15;
        }
      }
    } else if (value == 1800) {
      for (i in numSteps) {
        if (this.state.filter == numSteps[i].filter) {
          steps = numSteps[i].min30;
        }
      }
    } else if (value == 3600) {
      for (i in numSteps) {
        if (this.state.filter == numSteps[i].filter) {
          steps = numSteps[i].hr;
        }
      }
    } else if (value == 300) {
      for (i in numSteps) {
        if (this.state.filter == numSteps[i].filter) {
          steps = numSteps[i].min5;
        }
      }
    }

    this.setState(
      {
        interval: value,
        numSteps: steps
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
    var steps = this.state.numSteps;
    var numSteps = [
      { interval: 300, steps1: "12", steps2: "288" },
      { interval: 900, steps1: "4", steps2: "96" },
      { interval: 1800, steps1: "2", steps2: "48" },
      { interval: 3600, steps1: "1", steps2: "24" }
    ];

    if (value == "Calendario" || texto == "Calendario") {
      var filtro = -1;
      steps = this.state.numSteps;
    } else if (value == "Hoy" || texto == "Hoy") {
      var filtro = 0;
      for (i in numSteps) {
        if (this.state.interval == numSteps[i].interval) {
          steps = numSteps[i].steps1;
        }
      }
    } else if (value == "Ayer" || texto == "Ayer") {
      var filtro = 1;
      for (i in numSteps) {
        if (this.state.interval == numSteps[i].interval) {
          steps = numSteps[i].steps1;
        }
      }
    } else if (value == "Esta Semana" || texto == "Esta Semana") {
      var filtro = 2;
      for (i in numSteps) {
        if (this.state.interval == numSteps[i].interval) {
          steps = numSteps[i].steps2;
        }
      }
    }
    this.setState(
      {
        filter: filtro,
        customdates: null,
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
      var stringDia = `${moment(this.state.dias[i])
        .locale("es")
        .format("dddd")} ${this.state.dias[i].substr(
        8,
        this.state.dias[i].length
      )}`;

      var stringDia1 = stringDia.charAt(0).toUpperCase() + stringDia.slice(1);
      var stringDia2 = stringDia1.concat(", ").concat(this.state.horas[i]);
      dataHoras.data.push({
        label: stringDia2
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
        labelDisplay: "rotate",
        useEllipsesWhenOverflow: "0",
        labelStep: this.state.numSteps,
        showValues: "0"
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
      }
    ];
    const data2 = [
      {
        titulo: "1 hora",
        filter: 3600
      },
      {
        titulo: "30 minutos",
        filter: 1800
      },
      {
        titulo: "15 minutos",
        filter: 900
      },
      {
        titulo: "5 minutos",
        filter: 300
      }
    ];
    const data3 = [
      {
        titulo: "Voltaje",

        filter: ["Vab", "Vbc", "Vca"]
      },
      {
        titulo: "Amperaje",
        filter: ["Ia", "Ib", "Ic"]
      },
      {
        titulo: "THD",
        filter: ["THDIa", "THDIb", "THDIc"]
      },
      {
        titulo: "Desbalance",
        filter: ["Vunbl", "Iunbl"]
      },
      {
        titulo: "kVA",
        filter: ["Ssist"]
      },
      {
        titulo: "FP",
        filter: ["FPa", "FPb", "FPc"]
      }
    ];

    var key = 0;
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={[styles.container]}>
            <View style={[styles.topView]}>
              <View style={[styles.calendarView]}>
                <View style={[styles.pickers]}>
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
                  {this.state.orientation == "landscape" && (
                    <View style={[styles.variableView]}>
                      {data3.map(boton => (
                        <CSButtons
                          key={key++}
                          setFunction={this.setVariabe}
                          texto={boton.titulo}
                          selected={this.state.caption}
                          filter={boton.filter}
                          width={Math.min(screenWidth, screenHeight) / 5.5}
                          marginLeft={5}
                        />
                      ))}
                    </View>
                  )}
                </View>

                <View
                  style={[
                    styles.variableView,
                    {
                      flex: this.state.orientation == "landscape" ? 1 : null
                    }
                  ]}
                >
                  {this.state.orientation == "portrait" && (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                      }}
                    >
                      <VariablePicker
                        function={this.setVariabe.bind(this)}
                        selectedValue={this.state.caption}
                      />
                    </View>
                  )}
                  {this.state.orientation == "landscape" && (
                    <View style={styles.optionButtonsView}>
                      {data1.map(boton => (
                        <CSButtons
                          setFunction={boton.function}
                          texto={boton.titulo}
                          selected={boton.selected}
                          filter={boton.filter}
                          width={Math.min(screenWidth, screenHeight) / 5.5}
                          marginLeft={5}
                        />
                      ))}
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
            <View style={[styles.timeButtons]}>
              {data2.map(boton => (
                <CSButtons
                  key={key++}
                  setFunction={this.setInterval}
                  texto={boton.titulo}
                  selected={this.state.interval}
                  filter={boton.filter}
                  width={Math.min(screenWidth, screenHeight) / 5.5}
                  marginLeft={5}
                />
              ))}
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
    height: "auto",
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  pickers: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5
  },
  container: {
    flex: 1,
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20
  },
  chart: {
    justifyContent: "center",
    height: "auto"
  },
  optionButtonsView: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1
  },
  calendarView: {
    flex: 1
  },
  timeButtons: {
    height: "auto",
    flexDirection: "row",
    width: 310,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between"
  },
  variableView: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
