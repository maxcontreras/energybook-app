import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import CCPicker from "../../Components/Pickers/CCPicker.js";
import MonthPicker from "../../Components/RecordC/MonthPicker.js";
import HeaderMenu from "../../Components/HeaderMenu.js";
import RecordCard from "../../Components/RecordC/RecordCard.js";
import Orientation from "react-native-orientation";
import { connect } from "react-redux";

const screenHeight =
  Dimensions.get("screen").height > Dimensions.get("screen").width
    ? Dimensions.get("screen").height
    : Dimensions.get("screen").width;
const screenWidth =
  Dimensions.get("screen").width > Dimensions.get("screen").height
    ? Dimensions.get("screen").width
    : Dimensions.get("screen").height;
const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer
});
class Record extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape",
      arrayDevices: [],
      arrayNameDevices: [],
      arrayDescriptionDevices: [],
      pickerValue: "Servicio 1"
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={styles.header}>
          <HeaderMenu selected="record" />
        </View>
      )
    };
  };
  componentWillMount() {
    Orientation.unlockAllOrientations();
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
      arrayDescriptionDevices: arrayDescriptionDevices,
      indicator: false
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }
  setDevice(itemValue) {
    this.setState(
      {
        pickerValue: itemValue
      },
      () => {
        /*  if (this.state.pickerValue.substr(0, 8) !== "Servicio") {
          var getIndex = this.state.arrayDescriptionDevices.indexOf(itemValue);
          this.setState(
            {
              service: "",
              device: this.state.arrayNameDevices[getIndex]
            },
            () => {
              this.getChartData();
            }
          );
        } else {
          this.setState(
            {
              service: this.state.pickerValue,
              device: ""
            },
            () => {
              this.getChartData();
            }
          );
        }*/
      }
    );
  }
  confirmar() {}
  render() {
    return (
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
        <SafeAreaView>
          <KeyboardAvoidingView enabled>
            <View style={styles.container}>
              <View style={styles.title}>
                <Text style={styles.titleText}>Historial de mediciones</Text>
              </View>
              <View style={styles.monthContainer}>
                <CCPicker
                  function={this.setDevice.bind(this)}
                  selectedValue={this.state.pickerValue}
                />
                <MonthPicker />
                <TouchableOpacity onPress={this.confirmar()} style={styles.btn}>
                  <Text style={styles.btnTxt}>Confirmar</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardView}>
                <RecordCard />
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Record);

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center"
  },
  scroll: {
    flex: 0,
    height: "auto",
    flexGrow: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    backgroundColor: "#586365"
  },
  btnTxt: {
    color: "#FFFFFF",
    fontSize: 15
  },
  monthContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  title: {
    width: "100%",
    height: 40,
    borderBottomWidth: 0.2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontWeight: "bold",
    color: "#586365",
    fontSize: 13
  },
  cardView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20
  }
});
