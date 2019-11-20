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
    super(props);
    this.state = {};
  }

  render() {
    const FILTERS = ["15 minutos", "30 minutos", "1 hora"];
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
              style={[styles.PickerIos]}
            >
              <Text style={[styles.unselectedButtonText]}>
                {this.props.selectedValue}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {Platform.OS == "android" && (
          <View style={[styles.Picker]}>
            <Picker
              style={[styles.insidePicker]}
              selectedValue={this.props.selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                console.log(itemValue);
                this.props.function(itemValue, itemIndex);
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
    width: 90,
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
    marginLeft: 5,
    width: 90
  },
  unselectedButtonText: {
    color: "black",
    fontSize: 10
  },

  width: {
    width: screenHeight / 5
  },
  height: {
    width: screenWidth / 5
  },
  insidePicker: {
    height: 35,
    width: 90,
    justifyContent: "center",
    alignItems: "center"
  }
});
