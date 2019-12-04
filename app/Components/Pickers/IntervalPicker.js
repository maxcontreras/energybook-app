import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Picker,
  Platform,
  ActionSheetIOS
} from "react-native";
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

class IntervalPicker extends Component {
  constructor(props) {
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    super(props);
    this.state = {
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
    const FILTERS =
      this.props.screen == "charts"
        ? ["15 minutos", "5 minutos", "30 minutos", "1 hora"]
        : ["15 minutos", "30 minutos", "1 hora"];
    let nextKey = 0;
    return (
      <View>
        {Platform.OS == "ios" && (
          <View>
            <TouchableOpacity
              onPress={() =>
                ActionSheetIOS.showActionSheetWithOptions(
                  {
                    options: FILTERS.concat("Cancelar"),
                    cancelButtonIndex: FILTERS.length
                  },
                  buttonIndex => {
                    if (buttonIndex != FILTERS.indexOf("Cancelar")) {
                      this.props.function(FILTERS[buttonIndex]);
                    }
                  }
                )
              }
              style={[
                styles.PickerIos,
                this.state.orientation == "portrait"
                  ? { width: Math.min(screenWidth, screenHeight) / 2.5 }
                  : { width: Math.min(screenWidth, screenHeight) / 2.5 }
              ]}
            >
              <Text style={[styles.unselectedButtonText]}>
                {this.props.selectedValue}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {Platform.OS == "android" && (
          <View
            style={[
              styles.Picker,
              this.state.orientation == "portrait"
                ? { width: Math.min(screenWidth, screenHeight) / 2.5 }
                : { width: Math.min(screenWidth, screenHeight) / 2.5 }
            ]}
          >
            <Picker
              style={[
                styles.insidePicker,
                this.state.orientation == "portrait"
                  ? { width: Math.min(screenWidth, screenHeight) / 2.5 }
                  : { width: Math.min(screenWidth, screenHeight) / 2.5 }
              ]}
              selectedValue={this.props.selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                console.log(itemValue);
                this.props.function(itemIndex, itemValue);
              }}
            >
              {FILTERS.map(item => (
                <Picker.Item
                  label={item}
                  value={item}
                  key={nextKey++}
                  style={{ fontSize: 10 }}
                />
              ))}
            </Picker>
          </View>
        )}
      </View>
    );
  }
}

export default IntervalPicker;

const styles = StyleSheet.create({
  Picker: {
    height: 35,
    backgroundColor: "white",
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "#737373",
    borderRadius: 20
  },
  PickerIos: {
    borderWidth: 1,
    borderColor: "#737373",
    borderRadius: 20,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5
  },
  unselectedButtonText: {
    color: "black",
    fontSize: 10
  },
  insidePicker: {
    height: 35,
    justifyContent: "center",
    alignItems: "center"
  }
});
