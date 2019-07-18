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
  SectionList
} from "react-native";
import Fecha from "./Fecha.js";
import Consumo from "../Assets/Svg/Consumo.svg";
import Distribucion from "../Assets/Svg/Distribucion.svg";
import Capacidad from "../Assets/Svg/Capacidad.svg";
import Hour from "./Hour.js";
import Orientation from "react-native-orientation";

export default class Daily extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      dailyR: [],
      data: [],
      access: this.props.accessToken,
      iD: this.props.companyID,
      url: "",
      middlePrice: [],
      peakPrice: [],
      basePrice: [],
      distributionPrice: "",
      capacityPrice: "",
      portrait: false,
      landscape: false
    };
  }
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

    this._isMounted = true;
    console.log(this.props);
    fetch(
      `http://api.ienergybook.com/api/DesignatedMeters/?filter={"include":["services"],"where":{"company_id":"${this.state.iD}"}}`,
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
          this.setState({
            data: json[1]
          });
        }
        this.setState({
          dailyR: this.state.data[0].services[0].dailyReadings
        });
        this.getData();
      })
      .catch(err => {});
  }
  getData() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    var Today = yyyy + "-" + mm + "-" + dd;
    this.setState({
      url:
        "http://api.ienergybook.com/api/AdminValues/findByDate?access_token=" +
        this.state.access
    });
    fetch(this.state.url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: Today + "T00:00:00-05:00",
        city: "Jaconá Michoacán"
      })
    })
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        this.setState({
          basePrice: json[1].cfeValue.basePrice,
          capacityPrice: json[1].cfeValue.capacityPrice,
          distributionPrice: json[1].cfeValue.distributionPrice,
          middlePrice: json[1].cfeValue.middlePrice,
          peakPrice: json[1].cfeValue.peakPrice
        });
        console.log(
          "DATOS",
          this.state.basePrice,
          this.state.capacityPrice,
          this.state.distributionPrice,
          this.state.middlePrice,
          this.state.peakPrice
        );
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

  render() {
    var totalCapacity = this.state.capacityPrice * this.state.dailyR.capacity;
    totalCapacity = totalCapacity
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var totalDistribution =
      this.state.distributionPrice * this.state.dailyR.distribution;
    totalDistribution = totalDistribution
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={true}
      >
        <View
          style={[this.state.portrait ? styles.slides : styles.slidesLandscape]}
        >
          <View style={styles.topSlide}>
            <Text style={styles.todayText}>Hoy</Text>
            <Fecha />
          </View>
          <View style={styles.bottomSlide}>
            <View style={styles.icon}>
              <Consumo style={styles.image} />
            </View>
            <View style={styles.data}>
              <SectionList
                sections={[
                  {
                    title: "Consumo",
                    data: [this.state.dailyR.consumption + " kwh"]
                  }
                ]}
                renderItem={({ item }) => (
                  <Text style={styles.item}>{item}</Text>
                )}
                renderSectionHeader={({ section }) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                keyExtractor={(item, index) => index}
              />
              <SectionList
                sections={[{ title: "", data: ["Precio 1"] }]}
                renderItem={({ item }) => (
                  <Text style={styles.item}>{item}</Text>
                )}
                renderSectionHeader={({ section }) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                keyExtractor={(item, index) => index}
              />
            </View>

            <View style={styles.last}>
              <Text style={styles.textActualization}>
                Ultima actualización: {Hour}{" "}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[this.state.portrait ? styles.slides : styles.slidesLandscape]}
        >
          <View style={styles.topSlide}>
            <Text style={styles.todayText}>Hoy</Text>
            <Fecha />
          </View>
          <View style={styles.bottomSlide}>
            <View style={styles.icon}>
              <Consumo style={styles.image} />
            </View>
            <View style={styles.data}>
              <SectionList
                sections={[
                  {
                    title: "Distribución",
                    data: [this.state.dailyR.distribution + " kwh"]
                  }
                ]}
                renderItem={({ item }) => (
                  <Text style={styles.item}>{item}</Text>
                )}
                renderSectionHeader={({ section }) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                keyExtractor={(item, index) => index}
              />
              <SectionList
                sections={[{ title: "", data: ["$" + totalDistribution] }]}
                renderItem={({ item }) => (
                  <Text style={styles.item}>{item}</Text>
                )}
                renderSectionHeader={({ section }) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                keyExtractor={(item, index) => index}
              />
            </View>

            <View style={styles.last}>
              <Text style={styles.textActualization}>
                Ultima actualización: {Hour}{" "}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[this.state.portrait ? styles.slides : styles.slidesLandscape]}
        >
          <View style={styles.topSlide}>
            <Text style={styles.todayText}>Hoy</Text>
            <Fecha />
          </View>
          <View style={styles.bottomSlide}>
            <View style={styles.icon}>
              <Consumo style={styles.image} />
            </View>
            <View style={styles.data}>
              <SectionList
                sections={[
                  {
                    title: "Capacidad",
                    data: [this.state.dailyR.capacity + " kwh"]
                  }
                ]}
                renderItem={({ item }) => (
                  <Text style={styles.item}>{item}</Text>
                )}
                renderSectionHeader={({ section }) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                keyExtractor={(item, index) => index}
              />
              <SectionList
                sections={[{ title: "", data: ["$" + totalCapacity] }]}
                renderItem={({ item }) => (
                  <Text style={styles.item}>{item}</Text>
                )}
                renderSectionHeader={({ section }) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                keyExtractor={(item, index) => index}
              />
            </View>

            <View style={styles.last}>
              <Text style={styles.textActualization}>
                Ultima actualización: {Hour}{" "}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

var screenHeight = Math.round(Dimensions.get("window").height);
var screenWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  slides: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 25,
    width: screenWidth,
    backgroundColor: "white"
  },
  slidesLandscape: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 25,
    width: screenWidth + 20
  },
  topSlide: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    flex: 1,
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    borderColor: "#EEEEEE",
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 0.2
      },
      android: { elevation: 20 }
    }),
    paddingTop: 10,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10
  },
  todayText: {
    fontSize: 12,
    paddingLeft: 20,
    paddingBottom: 5
  },
  bottomSlide: {
    flex: 6,
    flexDirection: "row",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    borderColor: "#EEEEEE",
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 0.2
      },
      android: {
        elevation: 20
      }
    })
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
    fontSize: 10
  },
  image: {
    height: 35,
    width: 35
  }
});
