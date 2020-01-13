import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform
} from "react-native";
import SecondDaily from "./SecondDaily";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import StaticSafeAreaInsets from "react-native-static-safe-area-insets";
import { connect } from "react-redux";
import {
  getDailyReadings,
  getPrices,
  getFinalPrices
} from "../../../Actions/Actions.js";

const mapStateToProps = state => ({
  readings: state.dailyReducer,
  meterId: state.dailyReducer.meterId,
  prices: state.costReducer,
  adminIds: state.adminReducer
});

class Daily extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    this.state = {
      url: "",
      dailyTCC: "",
      values: [],
      prices: [],
      readings: [],
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change");
    this._isMounted = false;
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      if (value !== null) {
        this.setState(
          {
            values: JSON.parse(value),
            readings: this.props.readings
          },
          () => {
            fetch(
              `http://api.ienergybook.com/api/DesignatedMeters/?filter={"include":["services"],"where":{"company_id":"${
                this.props.companyId != ""
                  ? this.props.companyId
                  : this.state.values.companyId
              }"}}`,
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                }
              }
            )
              .then(res => {
                this.state.statusCode = res.status;
                const data = res.json();
                return Promise.all([this.state.statusCode, data]);
              })
              .then(json => {
                if (this._isMounted) {
                  this.props.dispatch(getDailyReadings(json));
                  this.getData();
                }
              })
              .catch(err => {});
          }
        );
      }
    } catch (error) {}
  };

  componentWillMount() {
    this._retrieveData();
    this._isMounted = true;
  }
  getData() {
    var newDate = `${moment().format("YYYY")}-${moment().format(
      "MM"
    )}-01T00:00:00.000Z`;

    console.log(newDate);
    console.log(this.props.city);
    console.log(this.state.values);
    fetch(
      `http://api.ienergybook.com/api/AdminValues/findByDate?access_token=${this.state.values.accesToken}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date: newDate,
          city: this.props.city != "" ? this.props.city : this.state.values.city
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
        this.props.dispatch(getPrices(json[1].cfeValue));
        this.getDCP();
      })
      .catch(err => {
        console.log("no se pudo");
      });
  }
  getDCP() {
    fetch(
      `http://api.ienergybook.com/api/Meters/getConsumptionCostsByFilter?access_token=${this.state.values.accesToken}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id:
            this.props.adminMeterId != ""
              ? this.props.adminMeterId
              : this.props.meterId,
          device: "",
          service: "Servicio 1",
          filter: 0,
          interval: 86400,
          customdates: null
        })
      }
    )
      .then(res => {
        let statusCode = res.status;
        const data = res.json();
        return Promise.all([statusCode, data]);
      })
      .then(json => {
        console.log("AQUI LOS PRECIOS");
        console.log(json[1]);
        var jsonResponse = json[1];
        var response = [];
        for (var i = 0; i < jsonResponse.length; i++) {
          response[i] = jsonResponse[i].cost;
        }

        var addPrices = response
          .reduce((a, b) => a + b, 0)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        this.setState({
          dailyTCC: addPrices
        });
        console.log(this.state.dailyTCC);
        this._storeData();
      })
      .catch(err => {
        console.log("no se pudo");
      });
  }

  _storeData = async () => {
    let datos = {
      meterId: this.props.meterId
    };
    try {
      await AsyncStorage.setItem("meterId", JSON.stringify(datos), () => {
        console.log(datos);
      });
    } catch (error) {
      // Error saving data
    }
  };

  render() {
    console.log(this.props);
    const capacityPrice =
      (this.state.values.tipoTarifa == "GDMTH"
        ? this.props.prices.GDMTH.capacityPrice
        : this.props.prices.GDMTO.capacityPrice) *
      this.props.readings.dailyReadings.capacity;
    const distributionPrice =
      (this.state.values.tipoTarifa == "GDMTH"
        ? this.props.prices.GDMTH.distributionPrice
        : this.props.prices.GDMTO.distributionPrice) *
      this.props.readings.dailyReadings.distribution;

    const ultimaActualizacion = this.props.readings.dailyReadings.lastUpdated
      ? this.props.readings.dailyReadings.lastUpdated.substr(0, 10)
      : " ";

    const data = [
      {
        title: "Consumo",
        valuekwh: this.props.readings.dailyReadings.consumption
          ? this.props.readings.dailyReadings.consumption + " kwh"
          : "0 kwh",
        valuePrice: this.state.dailyTCC ? " $" + this.state.dailyTCC : "$0",
        ultima: ultimaActualizacion
      },
      {
        title: "Distribución",
        valuekwh: this.props.readings.dailyReadings.distribution
          ? this.props.readings.dailyReadings.distribution + " kwh"
          : "0 kwh",
        valuePrice: this.props.prices
          ? "$" +
            distributionPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "$0",
        ultima: ultimaActualizacion
      },
      {
        title: "Capacidad",
        valuekwh: this.props.readings.dailyReadings.capacity
          ? this.props.readings.dailyReadings.capacity + " kwh"
          : "0 kwh",
        valuePrice: this.props.prices
          ? "$" + capacityPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "$0",
        ultima: ultimaActualizacion
      }
    ];

    var key = 0;
    const insets =
      (Math.max(screenHeight, screenWidth) -
        (Math.max(
          StaticSafeAreaInsets.safeAreaInsetsTop,
          StaticSafeAreaInsets.safeAreaInsetsRight
        ) +
          Math.max(
            StaticSafeAreaInsets.safeAreaInsetsBottom,
            StaticSafeAreaInsets.safeAreaInsetsLeft
          ))) /
      2;

    const insetsAndroid = Math.max(screenHeight, screenWidth) / 2;
    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={true}
      >
        {data.map(datos => (
          <View
            key={key++}
            style={[
              styles.VCstyle,
              this.state.orientation == "portrait"
                ? { width: Math.min(screenWidth, screenHeight) }
                : {
                    width: Platform.OS == "android" ? insetsAndroid : insetsIos
                  }
            ]}
          >
            <SecondDaily
              title={datos.title}
              valuekwh={datos.valuekwh}
              valuePrice={datos.valuePrice}
              ultima={datos.ultima}
            />
          </View>
        ))}
      </ScrollView>
    );
  }
}

var screenHeight = Math.round(Dimensions.get("window").height);
var screenWidth = Math.round(Dimensions.get("window").width);

export default connect(mapStateToProps)(Daily);

const styles = StyleSheet.create({
  VCstyle: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: screenWidth,
    height: 150,
    paddingTop: 10,
    backgroundColor: "white",
    paddingBottom: 10
  },
  width: {
    width: screenWidth
  },
  height: {
    width: screenHeight
  }
});
