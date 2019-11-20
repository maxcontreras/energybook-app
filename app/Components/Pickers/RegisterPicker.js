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

class RegisterPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.tipo == "giro") {
      var FILTERS = [
        "Manufactura",
        "Automotríz",
        "Textil",
        "Metalúrgica",
        "Sidelúrgica",
        "Petroquímica",
        "Eléctrica",
        "Otro"
      ];
    } else if (this.props.tipo == "numPersonas") {
      var FILTERS = ["2-10", "11-50", "51-200", "201-1000"];
    }
    var handleChange = this.props.tipo == "numPersonas" ? "size" : "businessR";

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
              onValueChange={this.props.function(handleChange)}
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

export default RegisterPicker;

const styles = StyleSheet.create({
  Picker: {
    borderRadius: 10,
    marginBottom: 5,
    height: 40,
    backgroundColor: "#F2F4FA",
    paddingLeft: 10
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
    height: 40,

    justifyContent: "center",
    alignItems: "center"
  }
});
