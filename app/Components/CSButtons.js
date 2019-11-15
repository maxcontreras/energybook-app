import React, { Component, PropTypes } from "react";
import { Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
class CSButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: this.props.filter,
      texto: this.props.texto,
      selected: this.props.selected
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ selected: props.selected });
  }

  render() {
    var selected = false;
    if (
      this.state.texto == this.state.selected ||
      this.state.selected == this.state.filter
    ) {
      selected = true;
    }
    var filtro = null;
    if (this.state.filter == -1) {
      filtro = null;
    } else {
      filtro = this.state.filter;
    }
    return (
      <TouchableOpacity
        onPress={() => this.props.setFunction(filtro, this.state.texto)}
        style={[
          styles.buttonG,
          styles.elevation,
          [selected ? styles.selectedButtton : styles.unselectedButton],
          [this.props.generacion ? styles.geneWidth : null]
        ]}
      >
        <Text
          style={[
            selected ? styles.selectedButttonText : styles.unselectedButtonText
          ]}
        >
          {this.state.texto}
        </Text>
      </TouchableOpacity>
    );
  }
}

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  elevation: {
    borderWidth: 1,
    borderColor: "#737373",
    borderRadius: 20
  },
  unselectedButton: {
    backgroundColor: "white"
  },
  selectedButtton: {
    backgroundColor: "#586365"
  },
  unselectedButtonText: {
    color: "black",
    fontSize: 10
  },
  selectedButttonText: {
    color: "#FFFFFF",
    fontSize: 10
  },
  buttonG: {
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    marginLeft: 5
  },
  geneWidth: {
    width: 90
  }
});

export default CSButtons;
