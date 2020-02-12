import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  Text,
  ActivityIndicator
} from "react-native";
import FusionCharts from "react-native-fusioncharts";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);
import StaticSafeAreaInsets from "react-native-static-safe-area-insets";

const mapStateToProps = state => ({
  readings: state.dailyReducer.devices,
  //meterId: state.dailyReducer.meterId,
  adminIds: state.adminReducer
});

class PieChart extends Component {
  constructor(props) {
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    super(props);
    this.state = {
      values: [],
      valores: [],
      totalito: {},
      indicator: true,
      meterId: "",
      noData: false,
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    this.libraryPath = Platform.select({
      ios: require("../../../assets/fusioncharts.html"),
      android: { uri: "file:///android_asset/fusioncharts.html" }
    });
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  componentWillMount() {
    console.log("PIE CHART");
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
            this._getdata();
          }
        );
      }
    } catch (error) {}
  };

  _getdata() {
    console.log("ENTRO A LA FUNCION");
    console.log(this.state.values.accesToken);
    console.log(this.props.meterId);
    console.log("SHIT");

    var array = {
      data: []
    };
    for (var i = 1; i < this.props.devices.length; i++) {
      array.data.push(this.props.devices[i]);
    }
    var PieChart = {
      data: []
    };
    array.data.forEach(element => {
      fetch(
        `http://api.ienergybook.com/api/Meters/standardReadings?access_token=${this.state.values.accesToken}`,
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
                : this.props.meterId,
            device: element.name,
            service: "",
            variable: "EPimp",
            filter: 3,
            interval: 3600,
            custom_dates: null
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
          var consumo = {
            data: []
          };
          for (i in json[1]) {
            consumo.data.push(json[1][i].value);
          }
          var totalC = consumo.data.reduce((a, b) => a + b, 0).toFixed(2);
          PieChart.data.push({
            label: element.description,
            value: totalC
          });
          this.setState({
            totalito: PieChart,
            indicator: false
          });
          if (this.state.statusCode != 200) {
            this.setState({
              noData: true
            });
          }
        })
        .catch(err => {
          console.log("no se pudo");
          this.setState({
            noData: true,
            indicator: false
          });
        });
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }
  render() {
    const insetsAndroid = Math.max(screenHeight, screenWidth) / 2.2;
    const insetsIos =
      (Math.max(screenHeight, screenWidth) -
        (Math.max(
          StaticSafeAreaInsets.safeAreaInsetsTop,
          StaticSafeAreaInsets.safeAreaInsetsRight
        ) +
          Math.max(
            StaticSafeAreaInsets.safeAreaInsetsBottom,
            StaticSafeAreaInsets.safeAreaInsetsLeft
          ))) /
      2.2;
    const dataSource = {
      type: "pie2d",
      width: Platform.OS == "android" ? insetsAndroid - 10 : insetsIos - 10,
      height: 300,
      dataFormat: "json",
      chart: {
        plottooltext: "$label : $value",
        showlegend: "1",
        legendposition: "bottom",
        legendItemFontSize: "10",
        theme: Platform.OS == "ios" ? "ocean" : "fusion",
        valueFontSize: "10",
        showNames: "0",
        pieRadius: "0",
        showZeroPies: "0",
        showPercentValues: "0",
        showPercentInToolTip: "0",
        showLabels: "0",
        paletteColors: "#229957, #3598DB",
        labelDistance: "10"
      },
      data: this.state.totalito.data
    };

    return (
      <Card
        containerStyle={[
          styles.cardStyle,
          this.state.orientation == "portrait"
            ? { width: Math.min(screenWidth, screenHeight) - 20 }
            : {
                width: Platform.OS == "android" ? insetsAndroid : insetsIos
              }
        ]}
      >
        <View style={styles.chartContainer}>
          {this.state.indicator && (
            <ActivityIndicator size="small" color="#586365" />
          )}
          {!this.state.indicator && this.state.noData && (
            <Text style={styles.error}>
              Error al obtener lecturas del medidor
            </Text>
          )}
          {!this.state.indicator && !this.state.noData && (
            <FusionCharts
              style={{ borderRadius: 10 }}
              showNames={"0"}
              showValues={"0"}
              type={dataSource.type}
              width={dataSource.width}
              height={dataSource.height}
              dataFormat={dataSource.dataFormat}
              dataSource={dataSource}
              libraryPath={this.libraryPath} // set the libraryPath property
            />
          )}
        </View>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(PieChart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10
  },
  chartContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  cardStyle: {
    padding: 0,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: "black",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2
      },
      android: {
        elevation: 5
      }
    })
  },
  error: {
    color: "black",
    fontSize: 10
  }
});
