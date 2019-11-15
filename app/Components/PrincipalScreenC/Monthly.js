import React, { Component } from "react";
import {
  AppRegistry,
  SectionList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Dimensions,
  Image,
  Platform
} from "react-native";
import Hour from "../Hour.js";
import { date, n, mes } from "../Fecha.js";
import Fp from "../../Assets/Svg/Fp.svg";
import Consumo from "../../Assets/Svg/Consumo.svg";
import Distribucion from "../../Assets/Svg/Distribucion.svg";
import Capacidad from "../../Assets/Svg/Capacidad.svg";
import Orientation from "react-native-orientation";
import { connect } from "react-redux";
import { Card } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";

const mapStateToProps = state => ({
  readings: state.dailyReducer,
  prices: state.costReducer[1]
});

class Data extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    this.state = {
      url: "",
      monthlyTCC: "",
      values: [],
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
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
            console.log(this.props.meterId);
            fetch(
              `http://api.ienergybook.com/api/Meters/getConsumptionCostsByFilter?access_token=${this.state.values.accesToken}`,
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  id: this.props.readings.meterId,
                  device: "",
                  service: "Servicio 1",
                  filter: 3,
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
                //this.props.dispatch(getMonthlyConsumptionPrices(json));
                console.log("MONTHLY CONSUMPTION");
                console.log(json);

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
                  monthlyTCC: addPrices
                });
              })
              .catch(err => {
                console.log("no se pudo");
              });
          }
        );
        console.log(this.state.values);
      }
    } catch (error) {}
  };

  componentWillMount() {
    Orientation.unlockAllOrientations();
    this._retrieveData();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }

  render() {
    var fecha = date + " " + n + " " + "de" + " " + mes;
    return (
      <View
        style={[
          styles.container,
          this.state.orientation == "landscape" ? styles.pLandscape : null
        ]}
      >
        <Card
          title={fecha}
          containerStyle={[
            styles.containerCard,
            screenWidth < screenHeight ? styles.width : styles.height
          ]}
          titleStyle={styles.titleStyle}
          wrapperStyle={{ borderRadius: 10 }}
        >
          <View style={styles.innerCard}>
            <View style={styles.iconPart}>
              <Consumo style={styles.icon} />
              <Distribucion style={styles.icon} />
              <Capacidad style={styles.icon} />
              <Fp style={styles.icon} />
            </View>
            <View style={styles.textPart}>
              <Text style={[styles.middleText, styles.titleWeight]}>
                {"Consumo"}
              </Text>
              <Text style={styles.middleText}>
                {this.props.readings.monthlyReadings.consumption
                  ? this.props.readings.monthlyReadings.consumption + " kwh"
                  : "0 kwh"}
              </Text>
              <Text style={[styles.middleText, styles.titleWeight]}>
                {"Distribución"}
              </Text>
              <Text style={styles.middleText}>
                {this.props.readings.monthlyReadings.distribution
                  ? this.props.readings.monthlyReadings.distribution + " kwh"
                  : "0 kwh"}
              </Text>
              <Text style={[styles.middleText, styles.titleWeight]}>
                {"Capacidad"}
              </Text>
              <Text style={styles.middleText}>
                {this.props.readings.monthlyReadings.capacity
                  ? this.props.readings.monthlyReadings.capacity + " kwh"
                  : "0 kwh"}
              </Text>
              <Text style={[styles.middleText, styles.titleWeight]}>
                {"FP"}
              </Text>
              <Text style={styles.middleText}>
                {this.props.readings.fp ? this.props.readings.fp + " %" : "0%"}
              </Text>
            </View>
            <View style={styles.valuePart}>
              <Text style={styles.priceText}>
                {this.state.monthlyTCC ? " $" + this.state.monthlyTCC : "$0"}
              </Text>
              <Text style={styles.priceText}>
                {this.props.prices
                  ? "$" + this.props.prices.totalMonthlyDistribution
                  : "$0"}
              </Text>
              <Text style={styles.priceText}>
                {this.props.prices
                  ? "$" + this.props.prices.totalMonthlyCapacity
                  : "$0"}
              </Text>
              <Text style={styles.priceText}>{this.props.valuePrice}</Text>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Data);

var screenHeight = Math.round(Dimensions.get("window").height);
var screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  titleStyle: {
    color: "black",
    fontSize: 10,
    fontWeight: "normal",
    margin: 10,
    textAlign: "right",
    height: 10,
    justifyContent: "center"
  },

  containerCard: {
    height: 290,
    padding: 0,
    width: screenWidth - 20,
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
  middleText: { fontSize: 12, marginBottom: 10 },
  innerCard: {
    alignItems: "center",
    flexDirection: "row",
    height: 230,
    borderRadius: 10
  },
  iconPart: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    height: 230,
    paddingTop: 5,
    paddingBottom: 17
  },
  textPart: {
    justifyContent: "space-between",
    flex: 1.4,
    height: 230,
    paddingBottom: 20,
    paddingTop: 10,
    alignItems: "flex-start"
  },
  valuePart: {
    justifyContent: "center",
    flex: 3,
    height: 230,
    alignItems: "flex-start"
  },
  icon: {
    height: 35,
    width: 35
  },
  priceText: {
    fontSize: 12,
    marginRight: 10,
    textAlign: "right",
    margin: 17,
    marginLeft: 15
  },
  ultimaAcualizacion: {
    justifyContent: "flex-end",
    flex: 1.7,
    height: 230,
    paddingBottom: 20,
    paddingTop: 10,
    alignItems: "center"
  },
  titleWeight: {
    fontWeight: "bold"
  },
  lastText: {
    fontSize: 10,
    marginRight: 10
  },
  marginMiddle: {
    marginTop: 10
  },
  pLandscape: {
    paddingBottom: 20
  },
  width: {
    width: screenWidth - 20
  },
  height: {
    width: screenHeight - 20
  }
});
