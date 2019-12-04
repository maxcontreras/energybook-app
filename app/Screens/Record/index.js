import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert
} from "react-native";
import CCPicker from "../../Components/Pickers/CCPicker.js";
import MonthPicker from "../../Components/RecordC/MonthPicker.js";
import HeaderMenu from "../../Components/HeaderMenu.js";
import RecordCard from "../../Components/RecordC/RecordCard.js";
import Orientation from "react-native-orientation";
import { connect } from "react-redux";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import ActivityI from "../../Components/ActivityIndicator";
import "moment/min/moment-with-locales";
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
      pickerValue: "Servicio 1",
      newDate: moment()
        .startOf("month")
        .add(-1, "month")
        .format(),
      values: [],
      indicator: false
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
        <SafeAreaView>
          <View style={styles.header}>
            <HeaderMenu selected={"record"} />
          </View>
        </SafeAreaView>
      )
    };
  };

  componentWillMount() {
    this._retrieveData();
  }

  confirmar() {
    this.setState({
      indicator: true
    });
    console.log(this.state.values.accesToken);
    console.log(this.state.pickerValue);
    console.log(this.state.newDate);

    fetch(
      `http://api.ienergybook.com/api/Services/monthlyHistory?access_token=${this.state.values.accesToken}
`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          service: this.state.pickerValue,
          companyId: this.state.values.companyId,
          period: this.state.newDate
        })
      }
    )
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        console.log(json);
        this.setState({
          cardData: json[1].data,
          indicator: false
        });
      })
      .catch(err => {
        console.log("NO SE PUDO");
        this.setState({
          indicator: false
        });
        Alert.alert("Error", "Hubo un error al obtener los datos.", [
          {
            text: "Okay"
          }
        ]);
      });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }
  setService(itemValue) {
    this.setState({
      pickerValue: itemValue
    });
  }
  changeValue(months, years) {
    const oldDate = moment()
      .startOf("month")
      .add(-1, "month")
      .format();

    const newDate = moment(this.state.newDate)
      .add(months, "month")
      .add(years, "year")
      .format();

    console.log("OLD DATE:" + newDate);
    console.log("NEW DATE: " + oldDate);

    this.setState(
      {
        newDate: moment(newDate).isAfter(oldDate) ? oldDate : newDate
      },
      () => {
        console.log(this.state.newDate);
      }
    );
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      if (value !== null) {
        this.setState(
          {
            values: JSON.parse(value)
          },
          () => {
            console.log(this.props.meterId);
          }
        );
        console.log(this.state.values);
      }
    } catch (error) {}
  };

  render() {
    //console.log(this.state.newDate);
    return (
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
        <SafeAreaView>
          <KeyboardAvoidingView enabled>
            <View style={styles.container}>
              <View style={styles.title}>
                <Text style={styles.titleText}>Historial de mediciones</Text>
              </View>

              <View>
                <View style={styles.monthContainer}>
                  <CCPicker
                    function={this.setService.bind(this)}
                    selectedValue={this.state.pickerValue}
                    screen={"record"}
                  />
                  <MonthPicker function={this.changeValue.bind(this)} />
                  <TouchableOpacity
                    onPress={() => this.confirmar()}
                    style={styles.btn}
                  >
                    <Text style={styles.btnTxt}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardView}>
                  {this.state.indicator && <ActivityI />}
                  {!this.state.indicator && (
                    <RecordCard cardData={this.state.cardData} />
                  )}
                </View>
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
    alignItems: "center",
    marginVertical: 20
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
