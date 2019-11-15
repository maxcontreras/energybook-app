import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import SecondDaily from "./SecondDaily";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import { connect } from "react-redux";
import {
  getDailyReadings,
  getPrices,
  getFinalPrices
} from "../../../Actions/Actions.js";

const mapStateToProps = state => ({
  readings: state.dailyReducer,
  meterId: state.dailyReducer.meterId,
  prices: state.costReducer[1]
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
              `http://api.ienergybook.com/api/DesignatedMeters/?filter={"include":["services"],"where":{"company_id":"${this.state.values.companyId}"}}`,
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
    var newDate = `${new Date().getFullYear()}-${new Date().getMonth() +
      1}-01T00:00:00.000Z`;

    console.log(newDate);
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
          city: this.state.values.city
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
        this.props.dispatch(getPrices(json, this.state.values.tipoTarifa));

        this.props.dispatch(getFinalPrices(this.props.readings));

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
          id: this.props.meterId,
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
      })
      .catch(err => {
        console.log("no se pudo");
      });
  }

  render() {
    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={true}
      >
        <View
          style={[
            styles.VCstyle,
            screenWidth < screenHeight ? styles.width : styles.height
          ]}
        >
          <SecondDaily
            title={"Consumo"}
            valuekwh={
              this.props.readings.dailyReadings.consumption
                ? this.props.readings.dailyReadings.consumption + " kwh"
                : "0 kwh"
            }
            valuePrice={this.state.dailyTCC ? " $" + this.state.dailyTCC : "$0"}
            ultima={
              this.props.readings.dailyReadings.lastUpdated
                ? this.props.readings.dailyReadings.lastUpdated.substr(0, 10)
                : " "
            }
          />
        </View>
        <View
          style={[
            styles.VCstyle,
            screenWidth < screenHeight ? styles.width : styles.height
          ]}
        >
          <SecondDaily
            title={"Distribución"}
            valuekwh={
              this.props.readings.dailyReadings.distribution
                ? this.props.readings.dailyReadings.distribution + " kwh"
                : "0 kwh"
            }
            valuePrice={
              this.props.prices
                ? "$" + this.props.prices.totalDailyDistribution
                : "$0"
            }
            ultima={
              this.props.readings.dailyReadings.lastUpdated
                ? this.props.readings.dailyReadings.lastUpdated.substr(0, 10)
                : " "
            }
          />
        </View>
        <View
          style={[
            styles.VCstyle,
            screenWidth < screenHeight ? styles.width : styles.height
          ]}
        >
          <SecondDaily
            title={"Capacidad"}
            valuekwh={
              this.props.readings.dailyReadings.capacity
                ? this.props.readings.dailyReadings.capacity + " kwh"
                : "0 kwh"
            }
            valuePrice={
              this.props.prices
                ? "$" + this.props.prices.totalDailyCapacity
                : "$0"
            }
            ultima={
              this.props.readings.dailyReadings.lastUpdated
                ? this.props.readings.dailyReadings.lastUpdated.substr(0, 10)
                : " "
            }
          />
        </View>
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
