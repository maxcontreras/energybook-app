import React, { Component } from "react";
import { View, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import GenerationCard from "./GenerationCard.js";
import Swiper from "react-native-web-swiper";

export default class CardsCompP extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    key = 0;
    return (
      <View style={styles.container}>
        {this.props.response && (
          <Swiper
            controlsProps={{
              dotsTouchable: true,
              nextTitle: ">"
            }}
          >
            <View style={[styles.slideContainer, styles.slide1]}>
              <GenerationCard
                value={"kwh"}
                numero={"3"}
                pantalla={this.props.screen}
                values={this.props.response}
              />
            </View>
            <View style={[styles.slideContainer, styles.slide1]}>
              <GenerationCard
                value={this.props.screen == "generacion" ? "$" : "t"}
                numero={this.props.screen == "generacion" ? "3" : "1"}
                pantalla={this.props.screen}
                values={this.props.response}
              />
            </View>
            <View style={[styles.slideContainer, styles.slide1]}>
              <GenerationCard
                value={this.props.screen == "generacion" ? "$" : " "}
                numero={"2"}
                pantalla={this.props.screen}
                values={this.props.response}
              />
            </View>
          </Swiper>
        )}
      </View>
    );
  }
}

var screenHeight = Math.round(Dimensions.get("window").height);
var screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  container: {
    height: 220,
    width: "100%",
    marginBottom: 10
  },
  slideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  slide1: {
    backgroundColor: "white"
  }
});
