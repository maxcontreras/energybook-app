import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  Text
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
  meterId: state.dailyReducer.meterId,
  adminIds: state.adminReducer
});

const dataSource = {
  type: "pie2d",
  width: 300,
  height: 300,
  dataFormat: "json",
  chart: {
    plottooltext: "<b>$percentValue</b> of web servers run on $label servers",
    showlegend: "1",
    showpercentvalues: "1",
    legendposition: "bottom",
    usedataplotcolorforlabels: "1",
    theme: "fusion"
  },
  data: [
    {
      label: "Apache",
      value: "32647479"
    },
    {
      label: "Microsoft",
      value: "22100932"
    },
    {
      label: "Zeus",
      value: "14376"
    },
    {
      label: "Other",
      value: "18674221"
    }
  ]
};
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

  componentWillUpdate() {
    this._getdata();
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      if (value !== null) {
        this.setState({
          values: JSON.parse(value)
        });
      }
    } catch (error) {}
  };

  _getdata = async () => {
    console.log("ENTRO A FUNCION");
    console.log(this.props.readings);

    var array = {
      data: []
    };

    for (var i = 1; i < this.props.readings.length; i++) {
      array.data.push(this.props.readings[i]);
    }

    var PieChart = {
      data: []
    };

    var totalito = {
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
          console.log(json[1]);
          var consumo = {
            data: []
          };
          for (i in json[1]) {
            consumo.data.push(json[1][i].value);
          }
          console.log(consumo.data);
          var totalC = consumo.data
            .reduce((a, b) => a + b, 0)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          console.log(totalC);

          totalito.data.push({
            label: element.description,
            value: totalC
          });
          console.log(totalito.data);
        })
        .catch(err => {
          console.log("no se pudo");
        });
    });
  };
  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }
  render() {
    console.log(this.state.valores);

    const insetsAndroid = Math.max(screenHeight, screenWidth) / 2.2;
    const insents =
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
          <FusionCharts
            type={dataSource.type}
            width={dataSource.width}
            height={dataSource.height}
            dataFormat={dataSource.dataFormat}
            dataSource={dataSource}
            libraryPath={this.libraryPath} // set the libraryPath property
          />
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
    alignItems: "center"
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
  }
});
