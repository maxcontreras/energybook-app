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
  AsyncStorage,
  Platform
} from "react-native";
import Hour from "./Hour.js";
import Fecha from "./Fecha.js";
import Fp from "../Assets/Svg/Fp.svg";
import Consumo from "../Assets/Svg/Consumo.svg";
import Distribucion from "../Assets/Svg/Distribucion.svg";
import Capacidad from "../Assets/Svg/Capacidad.svg";
import Orientation from "react-native-orientation";
import { connect } from "react-redux";
import { Card } from "react-native-elements";

const mapStateToProps = state => ({
  userData: state.initialValues[0],
  //companyId
  companyData: state.initialValues[1],
  //city and stuff
  companyInfo: state.initialValues[2],
  prices: state.costReducer[1],
  readings: state.dailyReducer[0]
});

class Data extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      portrait: false,
      landscape: false,
      monthlyTCC: "",
      values: []
    };
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
    } catch (error) {
      // Error retrieving data
    }
  };

  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    if (initial === "PORTRAIT") {
      this.setState({
        portrait: true,
        landscape: false
      });
    } else {
      this.setState({
        portrait: false,
        landscape: true
      });
    }

    this._retrieveData();
  }
  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
  }
  _orientationDidChange = orientation => {
    if (orientation === "LANDSCAPE") {
      console.log("LANDSCAPE");
      this.setState({
        portrait: false,
        landscape: true
      });
    } else {
      this.setState({
        portrait: true,
        landscape: false
      });
      console.log("PORTRAIT");
    }
  };
  componentWillUnmount() {
    this._isMounted = false;
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  render() {
    return (
      <View style={[this.state.portrait ? styles.viewCard : styles.monthyLS]}>
        <Card containerStyle={styles.cardStyle}>
          <View style={styles.topCard}>
            <Text style={styles.facturationText}>Periodo de facturación</Text>
            <Fecha />
          </View>
          <View style={styles.bottom}>
            <View style={styles.icon}>
              <Consumo width={35} height={35} />
              <Distribucion width={35} height={35} />
              <Capacidad width={35} height={35} />
              <Fp width={35} height={35} />
            </View>
            <View style={styles.data}>
              <View style={{ flexDirection: "row" }}>
                {this.props.readings && this.props.prices && (
                  <View style={styles.container}>
                    <SectionList
                      sections={[
                        {
                          title: "Consumo",
                          data: [
                            this.props.readings.monthlyConsumption + " kwh"
                          ]
                        },
                        {
                          title: "Distribución",
                          data: [
                            this.props.readings.monthlyDistribution + " kw"
                          ]
                        },
                        {
                          title: "Capacidad",
                          data: [this.props.readings.monthlyCapacity + " kw"]
                        },
                        { title: "FP", data: [this.props.readings.fp + "%"] }
                      ]}
                      renderItem={({ item }) => (
                        <Text style={styles.item}>{item}</Text>
                      )}
                      renderSectionHeader={({ section }) => (
                        <Text style={styles.sectionHeader}>
                          {section.title}
                        </Text>
                      )}
                      keyExtractor={(item, index) => index}
                    />
                    <SectionList
                      sections={[
                        { title: "", data: ["$" + this.state.monthlyTCC] },
                        {
                          title: "",
                          data: [
                            "$" + this.props.prices.totalMonthlyDistribution
                          ]
                        },
                        {
                          title: "",
                          data: ["$" + this.props.prices.totalMonthlyCapacity]
                        }
                      ]}
                      renderItem={({ item }) => (
                        <Text style={styles.item}>{item}</Text>
                      )}
                      renderSectionHeader={({ section }) => (
                        <Text style={styles.sectionHeader}>
                          {section.title}
                        </Text>
                      )}
                      keyExtractor={(item, index) => index}
                    />
                  </View>
                )}
                <View style={styles.last}></View>
              </View>
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
    flex: 2,
    flexDirection: "row"
  },
  sectionHeader: {
    paddingTop: 2,
    paddingBottom: 2,
    color: "black",
    fontSize: 12
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 12
  },
  date: {
    fontSize: 10
  },
  last: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10
  },
  bottom: {
    flex: 11,
    backgroundColor: "white",
    width: Dimensions.get("window").width - 30,
    flexDirection: "row",
    paddingTop: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  icon: {
    flex: 0.5,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 12,
    paddingLeft: 10
  },
  data: {
    flex: 3,
    paddingLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  image: {
    width: 35,
    height: 35
  },
  viewCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    paddingBottom: 10,
    backgroundColor: "white"
  },
  cardLandscape: {
    flex: 1,
    justifyContent: "center",
    width: screenHeight,
    paddingLeft: 202,
    paddingRight: 202
  },
  topCard: {
    flex: 1,
    backgroundColor: "white",
    width: Dimensions.get("window").width - 30,
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 2,
    paddingTop: 10,
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  facturationText: {
    paddingLeft: 20,
    paddingBottom: 5,
    fontSize: 12
  },
  monthyLS: {
    paddingTop: 10,
    paddingBottom: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    backgroundColor: "white"
  },
  cardStyle: {
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
    }),
    padding: 0,
    borderRadius: 10
  }
});
