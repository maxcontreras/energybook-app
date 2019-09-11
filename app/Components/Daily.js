import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Button,
  TouchableOpacity,
  Platform,
  SectionList,
  AsyncStorage
} from "react-native";
import Fecha from "./Fecha.js";
import Consumo from "../Assets/Svg/Consumo.svg";
import Distribucion from "../Assets/Svg/Distribucion.svg";
import Capacidad from "../Assets/Svg/Capacidad.svg";
import Hour from "./Hour.js";
import Orientation from "react-native-orientation";
import { Card } from "react-native-elements";

import { Provider } from "react-redux";
import { connect } from "react-redux";
import {
  getUserInfo,
  getCompanyData,
  getCompanyId,
  getDailyReadings,
  getPrices,
  getFinalPrices,
  isAsync
} from "../../Actions/Actions.js";
import store from "../../Store";

const mapStateToProps = state => ({
  prices: state.costReducer[1],
  readings: state.dailyReducer[0],
  userData: state.initialValues[0],
  //companyId
  companyData: state.initialValues[1],
  //city and stuff
  companyInfo: state.initialValues[2]
});

class Daily extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      portrait: false,
      landscape: false,
      dailyTCC: "",
      values: [],
      prices: [],
      readings: []
    };
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

    this._isMounted = true;
    console.log(this.state.values);
  }
  getData() {
    console.log(this.state.readings);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    var Today = yyyy + "-" + mm + "-" + dd;
    fetch(
      `http://api.ienergybook.com/api/AdminValues/findByDate?access_token=${this.state.values.accesToken}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date: Today + "T00:00:00-05:00",
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
        this.props.dispatch(getPrices(json, this.state.values.tipoTarifa));
        if (this.props.readings) {
          this.props.dispatch(getFinalPrices(this.props.readings));
        } else {
          this.forceUpdate();
        }

        this.getDCP();
      })
      .catch(err => {
        console.log("no se pudo");
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
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
          id: this.props.readings.meterId,
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
        console.log("DAILY CONSUMPTION");
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
          dailyTCC: addPrices
        });
        console.log("AQUI PROPS");
        console.log(this.props.prices);
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
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            width: screenWidth,
            height: 150,
            paddingTop: 10,
            backgroundColor: "white",
            paddingBottom: 10
          }}
        >
          <Card containerStyle={styles.cardStyle}>
            <View style={styles.slides}>
              <View style={styles.topSlide}>
                <Text style={styles.todayText}>Hoy</Text>
                <Fecha />
              </View>
              <View style={styles.bottomSlide}>
                <View style={styles.icon}>
                  <Consumo style={styles.image} />
                </View>
                {this.props.readings && this.props.prices && (
                  <View style={styles.data}>
                    <SectionList
                      sections={[
                        {
                          title: "Consumo",
                          data: [this.props.readings.dailyConsumption + " kwh"]
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
                    <SectionList
                      sections={[
                        { title: "", data: ["$" + this.state.dailyTCC] }
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
                <View style={styles.last}>
                  {this.props.readings && (
                    <Text style={styles.textActualization}>
                      Ultima actualización:{" "}
                      {this.props.readings.dailyR.lastUpdated.substr(0, 10)}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </Card>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            width: screenWidth,
            height: 150,
            paddingTop: 10,
            backgroundColor: "white",
            paddingBottom: 10
          }}
        >
          <Card containerStyle={styles.cardStyle}>
            <View style={styles.slides}>
              <View style={styles.topSlide}>
                <Text style={styles.todayText}>Hoy</Text>
                <Fecha />
              </View>
              <View style={styles.bottomSlide}>
                <View style={styles.icon}>
                  <Consumo style={styles.image} />
                </View>
                {this.props.readings && this.props.prices && (
                  <View style={styles.data}>
                    <SectionList
                      sections={[
                        {
                          title: "Distribución",
                          data: [this.props.readings.dailyDistribution + " kwh"]
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

                    <SectionList
                      sections={[
                        {
                          title: "",
                          data: ["$" + this.props.prices.totalDailyDistribution]
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

                <View style={styles.last}>
                  {this.props.readings && (
                    <Text style={styles.textActualization}>
                      Ultima actualización:{" "}
                      {this.props.readings.dailyR.lastUpdated.substr(0, 10)}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </Card>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            width: screenWidth,
            height: 150,
            paddingTop: 10,
            backgroundColor: "white",
            paddingBottom: 10
          }}
        >
          <Card containerStyle={styles.cardStyle}>
            <View style={styles.slides}>
              <View style={styles.topSlide}>
                <Text style={styles.todayText}>Hoy</Text>
                <Fecha />
              </View>
              <View style={styles.bottomSlide}>
                <View style={styles.icon}>
                  <Consumo style={styles.image} />
                </View>
                {this.props.readings && this.props.prices && (
                  <View style={styles.data}>
                    <SectionList
                      sections={[
                        {
                          title: "Capacidad",
                          data: [this.props.readings.dailyCpacity + " kwh"]
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

                    <SectionList
                      sections={[
                        {
                          title: "",
                          data: ["$" + this.props.prices.totalDailyCapacity]
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

                <View style={styles.last}>
                  {this.props.readings && (
                    <Text style={styles.textActualization}>
                      Ultima actualización:{" "}
                      {this.props.readings.dailyR.lastUpdated.substr(0, 10)}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    );
  }
}

var screenHeight = Math.round(Dimensions.get("window").height);
var screenWidth = Math.round(Dimensions.get("window").width);

export default connect(mapStateToProps)(Daily);

const styles = StyleSheet.create({
  slides: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    width: screenWidth - 30,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10
  },
  slidesLandscape: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 25,
    width: screenWidth + 20
  },
  topSlide: {
    flex: 1,
    backgroundColor: "white",
    width: Dimensions.get("window").width - 30,
    paddingTop: 10,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#EEEEEE",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  todayText: {
    fontSize: 12,
    paddingLeft: 20,
    paddingBottom: 5
  },
  bottomSlide: {
    flex: 6,
    flexDirection: "row",
    backgroundColor: "white",
    width: Dimensions.get("window").width - 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  icon: {
    flex: 0.75,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10
  },
  data: {
    flex: 2,
    paddingLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 10
  },
  last: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10
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
  textActualization: {
    fontSize: 10,
    marginRight: 10
  },
  image: {
    height: 35,
    width: 35
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
