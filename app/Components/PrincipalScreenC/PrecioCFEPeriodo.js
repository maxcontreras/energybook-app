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

const mapStateToProps = state => ({
  readings: state.dailyReducer,
  meterId: state.dailyReducer.meterId,
  prices: state.costReducer[0]
});

class Data extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    Dimensions.addEventListener("change", () => {
      console.log(Dimensions.get("screen"));
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  componentWillMount() {
    Orientation.unlockAllOrientations();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }

  render() {
    return (
      <View style={styles.container}>
        <Card
          title={"Precio  CFE periodo"}
          containerStyle={[
            styles.containerCard,
            screenWidth < screenHeight ? styles.width : styles.height
          ]}
          titleStyle={styles.titleStyle}
          wrapperStyle={{ borderRadius: 10 }}
        >
          <View style={styles.innerCard}>
            <View style={[styles.textPart, styles.pFirst]}>
              <Text style={[styles.middleText, styles.titleWeight]}>Base</Text>
              <Text style={styles.middleText}>
                {this.props.prices
                  ? "$" + " " + this.props.prices.basePrice
                  : "$0"}
              </Text>
            </View>
            <View style={styles.textPart}>
              <Text style={[styles.middleText, styles.titleWeight]}>Media</Text>
              <Text style={styles.middleText}>
                {this.props.prices
                  ? "$" + " " + this.props.prices.middlePrice
                  : "$0"}
              </Text>
            </View>
            <View style={styles.textPart}>
              <Text style={[styles.middleText, styles.titleWeight]}>Punta</Text>
              <Text style={styles.middleText}>
                {this.props.prices
                  ? "$" + " " + this.props.prices.peakPrice
                  : "$0"}
              </Text>
            </View>
            <View style={styles.textPart}>
              <Text style={[styles.middleText, styles.titleWeight]}>
                Capacidad
              </Text>
              <Text style={styles.middleText}>
                {this.props.prices
                  ? "$" + " " + this.props.prices.capacityPrice
                  : "$0"}
              </Text>
            </View>
            <View style={[styles.textPart, styles.flexlast]}>
              <Text style={[styles.middleText, styles.titleWeight]}>
                Distribución
              </Text>
              <Text style={styles.middleText}>
                {this.props.prices
                  ? "$" + " " + this.props.prices.distributionPrice
                  : "$0"}
              </Text>
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
    alignItems: "center",
    paddingBottom: 20
  },
  titleStyle: {
    color: "black",
    fontSize: 10,
    fontWeight: "normal",
    margin: 10,
    textAlign: "left",
    height: 12,
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
    borderRadius: 10
  },
  textPart: {
    justifyContent: "center",
    flex: 1,
    height: 60,
    paddingBottom: 20,
    padding: 10,
    alignItems: "flex-start"
  },
  valuePart: {
    justifyContent: "center",
    flex: 3,
    height: 60,
    alignItems: "flex-start"
  },
  titleWeight: {
    fontWeight: "bold"
  },
  marginMiddle: {
    marginTop: 10
  },
  flexlast: {
    flex: 1.2
  },
  pFirst: {
    paddingLeft: 15
  },
  width: {
    width: screenWidth - 20
  },
  height: {
    width: screenHeight - 20
  }
});
