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
  prices: state.costReducer,
  adminIds: state.adminReducer
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
    const tarifType =
      this.props.adminIds.tipoTarif != ""
        ? this.props.adminIds.tipoTarif
        : this.state.values.tipoTarifa;
    const data = [
      {
        title: tarifType == "GDMTH" ? "Base" : "Ordinario",
        price: this.props.prices
          ? "$" +
            " " +
            (tarifType == "GDMTH"
              ? this.props.prices.GDMTH.basePrice
              : this.props.prices.GDMTO.ordinaryPrice)
          : "$0"
      },
      {
        title: tarifType == "GDMTH" ? "Media" : " ",
        price:
          tarifType == "GDMTH"
            ? this.props.prices
              ? "$ " + this.props.prices.GDMTH.middlePrice
              : "$0"
            : " "
      },
      {
        title: tarifType == "GDMTH" ? "Punta" : " ",
        price:
          tarifType == "GDMTH"
            ? this.props.prices
              ? "$ " + this.props.prices.GDMTH.peakPrice
              : "$0"
            : " "
      },
      {
        title: "Capacidad",
        price: this.props.prices
          ? "$ " +
            (tarifType == "GDMTH"
              ? this.props.prices.GDMTH.capacityPrice
              : this.props.prices.GDMTO.capacityPrice)
          : "$0"
      },
      {
        title: "Distribución",
        price: this.props.prices
          ? "$" +
            " " +
            (tarifType == "GDMTH"
              ? this.props.prices.GDMTH.distributionPrice
              : this.props.prices.GDMTO.distributionPrice)
          : "$0"
      }
    ];

    var key = 0;
    return (
      <View style={styles.container}>
        <Card
          title={
            <View style={styles.titleContainer}>
              <Text>Precios CFE del periodo</Text>
            </View>
          }
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
              <View
                key={key++}
                style={[
                  { flex: datos.title != " " ? 1 : 0 },
                  {
                    flex:
                      datos.title == "Base" ||
                      datos.title == "Media" ||
                      datos.title == "Punta"
                        ? 0.8
                        : 1
                  }
                ]}
              >
                {datos.title != " " && (
                  <View style={[styles.textPart]}>
                    <Text style={[styles.middleText, styles.titleWeight]}>
                      {datos.title}
                    </Text>
                    <Text style={[styles.middleText, { fontSize: 10 }]}>
                      ${(datos.price.slice(1) * 1).toFixed(2)}
                    </Text>
                  </View>
                )}
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
  middleText: { fontSize: 11, marginBottom: 10 },
  innerCard: {
    alignItems: "center",
    flexDirection: "row",
    height: 70,
    borderRadius: 10,
    paddingVertical: 10
  },
  textPart: {
    justifyContent: "center",
    flex: 1,
    height: 70,
    alignItems: "center",
    paddingVertical: 10
  },
  titleContainer: {
    height: "auto",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#CDCBCB"
  },
  titleWeight: {
    fontWeight: "bold"
  }
});
