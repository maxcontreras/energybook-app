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
import StaticSafeAreaInsets from "react-native-static-safe-area-insets";
const mapStateToProps = state => ({
  readings: state.dailyReducer,
  prices: state.costReducer,
  adminIds: state.adminReducer
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
      meterId: this.props.meterId,
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
            values: JSON.parse(value),
            meterId: this.props.readings.meterId
          },
          () => {
            this.getMeterId();
          }
        );
      }
    } catch (error) {}
  };
  getMeterId = async () => {
    try {
      const value = await AsyncStorage.getItem("meterId");
      if (value !== null) {
        this.setState(
          {
            meterId: JSON.parse(value).meterId
          },
          () => {
            this.getData();
          }
        );
      }
    } catch (error) {}
  };
  getData() {
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

  componentWillMount() {
    Orientation.unlockAllOrientations();
    this._retrieveData();
    this._isMounted = true;
    this.getData();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }

  render() {
    var fecha = date + " " + n + " " + "de" + " " + mes;
    const capacityPrice =
      (this.state.values.tipoTarifa == "GDMTH"
        ? this.props.prices.GDMTH.capacityPrice
        : this.props.prices.GDMTO.capacityPrice) *
      this.props.readings.monthlyReadings.capacity;
    const distributionPrice =
      (this.state.values.tipoTarifa == "GDMTH"
        ? this.props.prices.GDMTH.distributionPrice
        : this.props.prices.GDMTO.distributionPrice) *
      this.props.readings.monthlyReadings.distribution;
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
    const insetsAndroid = Math.max(screenHeight, screenWidth) / 2.2;
    const data = [
      {
        title: "Consumo",
        value: this.props.readings.monthlyReadings.consumption
          ? this.props.readings.monthlyReadings.consumption + " kwh"
          : "0 kwh",
        price: this.state.monthlyTCC ? " $" + this.state.monthlyTCC : "$0"
      },
      {
        title: "Distribución",
        value: this.props.readings.monthlyReadings.distribution
          ? this.props.readings.monthlyReadings.distribution + " kwh"
          : "0 kwh",
        price: this.props.prices
          ? "$" +
            distributionPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "$0"
      },
      {
        title: "Capacidad",
        value: this.props.readings.monthlyReadings.capacity
          ? this.props.readings.monthlyReadings.capacity + " kwh"
          : "0 kwh",
        price: this.props.prices
          ? "$" + capacityPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "$0"
      },
      {
        title: "FP",
        value: this.props.readings.fp ? this.props.readings.fp + " %" : "0%",
        price: " "
      }
    ];
    var key = 0;

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
            {
              width:
                this.state.orientation == "portrait"
                  ? Math.min(screenWidth, screenHeight) - 20
                  : Platform.OS == "android"
                  ? insetsAndroid
                  : insetsIos
            }
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
              {data.map(datos => (
                <View key={key++}>
                  <Text style={[styles.middleText, styles.titleWeight]}>
                    {datos.title}
                  </Text>
                  <Text style={styles.middleText}>{datos.value}</Text>
                </View>
              ))}
            </View>
            <View style={styles.valuePart}>
              {data.map(datos => (
                <Text key={key++} style={styles.priceText}>
                  {datos.price}
                </Text>
              ))}
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
    height: "auto",
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
    alignItems: "flex-start",
    paddingTop: 10
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
  }
});
