import React, { Component } from "react";
import { View, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import GenerationCard from "./GenerationCard.js";

export default class CardsCompP extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={[
          styles.cards,
          screenWidth > screenHeight ? styles.width : styles.height
        ]}
      >
        <GenerationCard
          value={"kwh"}
          numero={"3"}
          pantalla={this.props.screen}
          values={this.state.response}
        />
        <GenerationCard
          value={this.props.screen == "generacion" ? "$" : "t"}
          numero={this.props.screen == "generacion" ? "3" : "1"}
          pantalla={this.props.screen}
          values={this.state.response}
        />
        <GenerationCard
          value={this.props.screen == "generacion" ? "$" : " "}
          numero={"2"}
          pantalla={this.props.screen}
          values={this.state.response}
        />
      </View>
    );
  }
}

var screenHeight = Math.round(Dimensions.get("window").height);
var screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  cards: {
    justifyContent: "center",
    alignItems: "center",
    height: 220,
    flexDirection: "row"
  },

  width: {
    width: screenWidth
  },
  height: {
    width: screenHeight
  }
});
