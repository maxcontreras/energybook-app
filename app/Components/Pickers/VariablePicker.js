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

class VariablePicker extends Component {
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
    var FILTERS = ["Voltaje", "Amperaje", "THD", "Desbalance", "kVA", "FP"];
    var VARIABLES = [
      ["Vab", "Vbc", "Vca"],
      ["Ia", "Ib", "Ic"],
      ["THDIa", "THDIb", "THDIc"],
      ["Vunbl", "Iunbl"],
      ["Ssist"],
      ["FPa", "FPb", "FPc"]
    ];
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
                      this.props.function(
                        VARIABLES[buttonIndex],
                        FILTERS[buttonIndex]
                      );
                    }
                  }
                )
              }
              style={[styles.PickerIos, this.state.orientation == "portrait"]}
            >
              <Text style={[styles.unselectedButtonText]}>
                {this.props.selectedValue}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {Platform.OS == "android" && (
          <View style={[styles.Picker, this.state.orientation == "portrait"]}>
            <Picker
              style={[styles.insidePicker]}
              selectedValue={this.props.selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                console.log(itemValue);
                this.props.function(VARIABLES[itemIndex], itemValue);
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

export default VariablePicker;

const styles = StyleSheet.create({
  Picker: {
    height: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#737373",
    borderRadius: 20,
    width: Math.min(screenWidth, screenHeight) - 20
  },
  PickerIos: {
    borderWidth: 1,
    borderColor: "#737373",
    borderRadius: 20,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    width: Math.min(screenWidth, screenHeight) - 20
  },
  unselectedButtonText: {
    color: "black",
    fontSize: 10
  },
  insidePicker: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    width: Math.min(screenWidth, screenHeight) - 20
  }
});
