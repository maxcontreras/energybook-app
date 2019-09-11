import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Button,
  TouchableOpacity,
  Picker,
  Platform
} from "react-native";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

const mapStateToProps = state => ({
  userData: state[0],
  readings: state[3]
});

class ChartsPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValue: "Servicio 1",
      arrayDevices: [],
      arrayNameDevices: [],
      arrayDescriptionDevices: []
    };
  }

  componentWillMount() {
    var arrayDevices = [];
    var arrayNameDevices = [];
    var arrayDescriptionDevices = [];
    for (var j = 1; j < this.props.readings.devices.length; j++) {
      arrayDevices[j - 1] = this.props.readings.devices[j];
      arrayNameDevices[j - 1] = this.props.readings.devices[j].name;
      arrayDescriptionDevices[j - 1] = this.props.readings.devices[
        j
      ].description;
    }

    this.setState({
      arrayDevices: arrayDevices,
      arrayNameDevices: arrayNameDevices,
      arrayDescriptionDevices: arrayDescriptionDevices
    });
  }

  render() {
    var arrayOfServices = [this.state.numberOfServices];
    for (j = 0; j < this.state.numberOfServices; j++) {
      arrayOfServices[j] = `Servicio ${j + 1}`;
    }
    if (this.state.arrayDevices) {
      var arrayOfDevices = [this.state.arrayDevices.length];
      for (i = 0; i < this.state.arrayDevices.length; i++) {
        arrayOfDevices[i] = this.state.arrayDevices[i].description;
      }
      var arreglito = arrayOfServices.concat(arrayOfDevices);
    }
    var pickerItems = arreglito;
    let nextKey = 0;

    return (
      <View style={[styles.Picker, styles.elevation]}>
        <Picker
          style={{
            height: 40,
            width: 180,
            fontSize: 10
          }}
          selectedValue={this.state.pickerValue}
          onValueChange={(itemValue, itemIndex) =>
            this.props.setDevice(itemValue)
          }
        >
          {pickerItems.map(item => (
            <Picker.Item label={item} value={item} key={nextKey++} />
          ))}
        </Picker>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ChartsPicker);

const styles = StyleSheet.create({
  Picker: {
    height: 40,
    width: 180,
    backgroundColor: "white",
    marginLeft: 10
  },
  elevation: {
    ...Platform.select({
      ios: {
        shadowRadius: 0,
        shadowColor: "black",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2
      },
      android: {
        elevation: 0
      }
    }),
    borderWidth: 1,
    borderColor: "#737373",
    borderRadius: 20
  }
});
