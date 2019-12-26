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
import Orientation from "react-native-orientation";
import { connect } from "react-redux";
import { Card } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import StaticSafeAreaInsets from "react-native-static-safe-area-insets";

const mapStateToProps = state => ({
  readings: state.dailyReducer,
  meterId: state.dailyReducer.meterId,
  prices: state.costReducer
});

class Data extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape",
      values: []
    };
    Dimensions.addEventListener("change", () => {
      console.log(Dimensions.get("screen"));
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
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
    console.log(this.state.values.tipoTarifa);
    const insetsIOS =
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
        title: this.state.values.tipoTarifa == "GDMTH" ? "Base" : "Ordinario",
        price: this.props.prices
          ? "$" +
            " " +
            (this.state.values.tipoTarifa == "GDMTH"
              ? this.props.prices.GDMTH.basePrice
              : this.props.prices.GDMTO.ordinaryPrice)
          : "$0"
      },
      {
        title: this.state.values.tipoTarifa == "GDMTH" ? "Media" : " ",
        price:
          this.state.values.tipoTarifa == "GDMTH"
            ? this.props.prices
              ? "$ " + this.props.prices.GDMTH.middlePrice
              : "$0"
            : " "
      },
      {
        title: this.state.values.tipoTarifa == "GDMTH" ? "Punta" : " ",
        price:
          this.state.values.tipoTarifa == "GDMTH"
            ? this.props.prices
              ? "$ " + this.props.prices.GDMTH.peakPrice
              : "$0"
            : " "
      },
      {
        title: "Capacidad",
        price: this.props.prices
          ? "$ " +
            (this.state.values.tipoTarifa == "GDMTH"
              ? this.props.prices.GDMTH.capacityPrice
              : this.props.prices.GDMTO.capacityPrice)
          : "$0"
      },
      {
        title: "Distribución",
        price: this.props.prices
          ? "$" +
            " " +
            (this.state.values.tipoTarifa == "GDMTH"
              ? this.props.prices.GDMTH.distributionPrice
              : this.props.prices.GDMTO.distributionPrice)
          : "$0"
      }
    ];

    var key = 0;
    return (
      <View style={styles.container}>
        <Card
          title={"Precio  CFE periodo"}
          containerStyle={[
            styles.containerCard,

            this.state.orientation == "portrait"
              ? { width: Math.min(screenWidth, screenHeight) - 20 }
              : { width: Platform.OS == "android" ? insetsAndroid : insetsIos }
          ]}
          titleStyle={styles.titleStyle}
          wrapperStyle={{ borderRadius: 10 }}
        >
          <View style={styles.innerCard}>
            {data.map(datos => (
              <View key={key++} style={[styles.textPart]}>
                <Text style={[styles.middleText, styles.titleWeight]}>
                  {datos.title}
                </Text>
                <Text style={styles.middleText}>{datos.price}</Text>
              </View>
            ))}
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
    alignItems: "center",
    paddingBottom: 20
  },
  titleStyle: {
    color: "black",
    fontSize: 10,
    fontWeight: "normal",
    margin: 10,
    textAlign: "left",
    height: "auto",
    justifyContent: "center"
  },
  containerCard: {
    height: 110,
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
    height: 60,
    borderRadius: 10,
    padding: 10
  },
  textPart: {
    justifyContent: "center",
    flex: 1,
    height: 60,
    paddingBottom: 20,
    padding: 10,
    alignItems: "flex-start"
  },
  titleWeight: {
    fontWeight: "bold"
  }
});
