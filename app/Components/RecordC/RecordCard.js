import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import Consumo from "../../Assets/Svg/Consumo.svg";
import Distribucion from "../../Assets/Svg/Distribucion.svg";
import Capacidad from "../../Assets/Svg/Capacidad.svg";
import Orientation from "react-native-orientation";
import { connect } from "react-redux";
import { Card } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import Fp from "../../Assets/Svg/Fp.svg";
const mapStateToProps = state => ({
  readings: state.dailyReducer,
  meterId: state.dailyReducer.meterId,
  prices: state.costReducer
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
  componentWillMount() {
    Orientation.unlockAllOrientations();
    this._retrieveData();
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

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }

  render() {
    const capacityPrice =
      (this.state.values.tipoTarifa == "GDMTH"
        ? this.props.prices.GDMTH.capacityPrice
        : this.props.prices.GDMTO.capacityPrice) *
      (this.props.cardData ? this.props.cardData.capacity : 0);
    const distributionPrice =
      (this.state.values.tipoTarifa == "GDMTH"
        ? this.props.prices.GDMTH.distributionPrice
        : this.props.prices.GDMTO.distributionPrice) *
      (this.props.cardData ? this.props.cardData.capacity : 0);

    const data = [
      {
        Icono: Consumo,
        title: "Consumo",
        reading: this.props.cardData
          ? `${this.props.cardData.consumption} kWh`
          : "0kWh",
        price: this.props.consumptionPrice
          ? " $" + this.props.consumptionPrice
          : "$0"
      },
      {
        Icono: Distribucion,
        title: "Distribución",
        reading: this.props.cardData
          ? `${this.props.cardData.distribution} kWh`
          : "0kWh",
        price:
          "$" +
          distributionPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      {
        Icono: Capacidad,
        title: "Capacidad",
        reading: this.props.cardData
          ? `${this.props.cardData.capacity} kWh`
          : "0kWh",
        price:
          "$" + capacityPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      {
        Icono: Fp,
        title: "Fp",
        reading: this.props.cardData ? `${this.props.cardData.fp}%` : "0%",
        price: " "
      }
    ];

    var key = 0;

    return (
      <View style={styles.container}>
        <Card
          containerStyle={[
            styles.containerCard,
            { width: Math.min(screenWidth, screenHeight) - 20 }
          ]}
          wrapperStyle={{
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={styles.innerCard}>
            {data.map(datos => (
              <View key={key++} style={styles.parte}>
                <View style={styles.iconView}>
                  <datos.Icono style={styles.icon} />
                </View>
                <View style={styles.datos}>
                  <Text style={styles.titulo}>{datos.title}</Text>
                  <Text style={styles.texto}>{datos.reading}</Text>
                </View>
                <View style={styles.datoView}>
                  <Text style={styles.texto}>{datos.price}</Text>
                </View>
              </View>
            ))}
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
    flex: 1,
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
    flex: 1,
    height: 290,
    padding: 0,
    margin: 20,
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
  }
});
