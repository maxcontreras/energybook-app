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
import Hour from "./Hour.js";
import Fecha from "./Fecha.js";
import Fp from "../Assets/Svg/Fp.svg";
import Consumo from "../Assets/Svg/Consumo.svg";
import Distribucion from "../Assets/Svg/Distribucion.svg";
import Capacidad from "../Assets/Svg/Capacidad.svg";
import Orientation from "react-native-orientation";

export default class Data extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      fp: "",
      monthlyR: [],
      data: [],
      lastUpdated: "",
      access: this.props.accessToken,
      iD: this.props.companyID,
      url: "",
      middlePrice: [],
      peakPrice: [],
      basePrice: [],
      distributionPrice: [],
      capacityPrice: [],
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
          monthlyR: this.state.data[0].services[0].monthlyReadings,
          fp: this.state.data[0].services[0].fp,
          lastUpdated: this.state.data[0].services[0].monthlyReadings
            .lastUpdated
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
    console.log(Today);
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
      })
      .catch(err => {
        console.log("no se pudo");
      });
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
    var totalCapacity = this.state.capacityPrice * this.state.monthlyR.capacity;

    totalCapacity = totalCapacity
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var totalDistribution =
      this.state.distributionPrice * this.state.monthlyR.distribution;
    totalDistribution = totalDistribution
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
      <View style={styles.viewCard}>
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
              <View style={styles.container}>
                <SectionList
                  sections={[
                    {
                      title: "Consumo",
                      data: [this.state.monthlyR.consumption + " kwh"]
                    },
                    {
                      title: "Distribución",
                      data: [this.state.monthlyR.distribution + " kw"]
                    },
                    {
                      title: "Capacidad",
                      data: [this.state.monthlyR.capacity + " kw"]
                    },
                    { title: "FP", data: [this.state.fp + "%"] }
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
                  sections={[
                    { title: "", data: ["$0"] },
                    { title: "", data: ["$" + totalDistribution] },
                    { title: "", data: ["$" + totalCapacity] }
                  ]}
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
                <Text style={styles.date}>Ultima actualizaciòn: {Hour}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
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
    }),
    flexDirection: "row",
    paddingTop: 10
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
    width: screenWidth
  },
  cardLandscape: {
    flex: 1,
    justifyContent: "center",
    width: screenHeight,
    paddingLeft: 202,
    paddingRight: 202
  },
  topCard: {
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
      android: {
        elevation: 20
      }
    }),
    paddingTop: 10,
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: 10
  },
  facturationText: {
    paddingLeft: 20,
    paddingBottom: 5,
    fontSize: 12
  }
});
