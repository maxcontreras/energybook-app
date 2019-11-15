import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import { View, StyleSheet, Dimensions } from "react-native";

var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

export default class DatesPicker extends Component {
  constructor(props) {
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    super(props);
    this.state = {
      date: date,
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          ,
          this.state.orientation == "portrait"
            ? { width: Math.min(screenWidth, screenHeight) }
            : { width: Math.max(screenWidth, screenHeight) }
        ]}
      >
        <DatePicker
          style={{ width: 150, margin: 10 }}
          date={this.props.initialDate ? this.props.initialDate : date}
          mode="date"
          placeholder="select date"
          androidMode="spinner"
          format="YYYY-MM-DD"
          minDate="2000-01-01"
          maxDate="3000-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={date => {
            this.props.setInitial(date);
          }}
        />
        <DatePicker
          style={{ width: 150 }}
          date={this.props.endDate ? this.props.endDate : date}
          mode="date"
          placeholder="select date"
          androidMode="spinner"
          format="YYYY-MM-DD"
          minDate="2000-01-01"
          maxDate="3000-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={date => {
            this.props.setEnd(date);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    flexDirection: "row",
    width: screenWidth * 2 + 20,
    height: 70,
    backgroundColor: "white"
  }
});
