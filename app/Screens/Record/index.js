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
  readings: state.dailyReducer,
  prices: state.costReducer
});
class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValue: "Servicio 1",
      newDate: moment()
        .startOf("month")
        .add(-1, "month")
        .format(),
      values: [],
      indicator: false,
      meterId: "",
      consumptionPrice: null
    };
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
    this._getMeter;
  }
  confirmar() {
    this.setState({
      indicator: true
    });
    console.log(this.state.pickerValue);
    console.log(this.state.values.companyId);
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
        this.getPrices();
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
  getPrices() {
    console.log(moment(this.state.newDate).format("YYYY-MM-DD"));
    console.log(
      moment(this.state.newDate)
        .endOf("month")
        .format("YYYY-MM-DD")
    );
    fetch(
      `http://api.ienergybook.com/api/Meters/getConsumptionCostsByFilter?access_token=${this.state.values.accesToken}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: this.state.meterId,
          service: this.state.pickerValue,
          filter: -1,
          interval: 86400,
          custom_dates: {
            from: `${moment(this.state.newDate).format("YYYY-MM-DD")}`,
            until: `${moment(this.state.newDate)
              .endOf("month")
              .format("YYYY-MM-DD")}`
          }
        })
      }
    )
      .then(res => {
        let statusCode = res.status;
        const data = res.json();
        return Promise.all([statusCode, data]);
      })
      .then(json => {
        var jsonResponse = json[1];
        var response = [];
        for (var i = 0; i < jsonResponse.length; i++) {
          response[i] = jsonResponse[i].cost;
        }
        var addPrices = response
          .reduce((a, b) => a + b, 0)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        this.setState({
          consumptionPrice: addPrices
        });
      })
      .catch(err => {
        console.log("no se pudo");
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
            this.getMeterId();
          }
        );
      }
    } catch (error) {}
  };
  getMeterId = async () => {
    try {
      const value = await AsyncStorage.getItem("meterId");
      if (value !== null) {
        this.setState({
          meterId: JSON.parse(value).meterId
        });
        console.log(this.state.meterId);
      }
    } catch (error) {}
  };

  render() {
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
                    <RecordCard
                      cardData={this.state.cardData}
                      consumptionPrice={this.state.consumptionPrice}
                    />
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
