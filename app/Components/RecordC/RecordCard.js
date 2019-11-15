import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import Consumo from "../../Assets/Svg/Consumo.svg";
import Distribucion from "../../Assets/Svg/Distribucion.svg";
import Capacidad from "../../Assets/Svg/Capacidad.svg";
import Orientation from "react-native-orientation";
import { connect } from "react-redux";
import { Card } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";

const mapStateToProps = state => ({
  readings: state.dailyReducer,
  meterId: state.dailyReducer.meterId,
  prices: state.costReducer[1]
});

class RecordCard extends Component {
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
    return (
      <View
        style={[
          styles.container,
          this.state.orientation == "landscape" ? styles.pLandscape : null
        ]}
      >
        <Card
          containerStyle={[
            styles.containerCard,
            screenWidth < screenHeight ? styles.width : styles.height
          ]}
          wrapperStyle={{
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={styles.innerCard}>
            <View style={styles.parte}>
              <View style={styles.iconView}>
                <Consumo style={styles.icon} />
              </View>
              <View style={styles.datos}>
                <Text style={styles.titulo}>Consumo</Text>
                <Text style={styles.texto}>valor aqui</Text>
              </View>
              <View style={styles.datoView}>
                <Text style={styles.texto}>precio aqui</Text>
              </View>
            </View>
            <View style={styles.parte}>
              <View style={styles.iconView}>
                <Distribucion style={styles.icon} />
              </View>
              <View style={styles.datos}>
                <Text style={styles.titulo}>Distribución</Text>
                <Text style={styles.texto}>valor aqui</Text>
              </View>
              <View style={styles.datoView}>
                <Text style={styles.texto}>precio aqui</Text>
              </View>
            </View>
            <View style={styles.parte}>
              <View style={styles.iconView}>
                <Capacidad style={styles.icon} />
              </View>
              <View style={styles.datos}>
                <Text style={styles.titulo}>Capacidad</Text>
                <Text style={styles.texto}>valor aqui</Text>
              </View>
              <View style={styles.datoView}>
                <Text style={styles.texto}>precio aqui</Text>
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

export default connect(mapStateToProps)(RecordCard);

var screenHeight = Math.round(Dimensions.get("window").height);
var screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  parte: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    height: 30,
    flexDirection: "row"
  },
  icon: {
    width: 35,
    height: 35
  },
  iconView: {
    flex: 0.8
  },
  datos: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    height: 20
  },
  titulo: {
    fontSize: 12,
    fontWeight: "bold"
  },
  texto: {
    fontSize: 12
  },
  datoView: {
    flex: 0.5,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    height: 30
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
  innerCard: {
    alignItems: "center",
    height: 290,
    borderRadius: 10,
    justifyContent: "center",
    padding: 30
  },
  width: {
    width: screenWidth - 20
  },
  height: {
    width: screenHeight - 20
  }
});
