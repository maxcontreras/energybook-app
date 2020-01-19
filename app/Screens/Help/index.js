import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
import HeaderMenu from "../../Components/HeaderMenu.js";
import Orientation from "react-native-orientation";
import AsyncStorage from "@react-native-community/async-storage";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import HelpCard from "../../Components/HelpCard";

export default class Help extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape",
      values: []
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

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      if (value !== null) {
        this.setState(
          {
            values: JSON.parse(value)
          },
          () => {
            console.log(this.state.values);

            fetch(
              `http://api.ienergybook.com/api/InformationFiles?access_token=${this.state.values.accesToken}`,
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                }
              }
            )
              .then(res => {
                this.state.statusCode = res.status;
                const data = res.json();
                return Promise.all([this.state.statusCode, data]);
              })
              .then(json => {
                console.log(json);
                if (this.state.statusCode == 200) {
                  this.setState({
                    pdfs: json[1]
                  });
                }
              })
              .catch(err => {});
          }
        );
      }
    } catch (error) {}
  };

  componentWillMount() {
    this._retrieveData();
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

  render() {
    var key = 0;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          <KeyboardAvoidingView enabled>
            <View style={styles.container}>
              <View style={styles.headerTitle}>
                <Text style={{ fontSize: 20, letterSpacing: 1 }}>
                  Sección de ayuda
                </Text>
              </View>
              {this.state.pdfs && <HelpCard pdfs={this.state.pdfs} />}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  header: {
    height: 60,
    justifyContent: "center"
  },
  headerTitle: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.2
  },
  container: {
    flex: 1,
    height: "auto",
    paddingBottom: 20,
    backgroundColor: "white"
  },
  tableHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerSeccion: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  seccionText: { fontSize: 15 },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: "black",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2
      },
      android: {
        elevation: 5
      }
    })
  },
  titleStyle: {
    color: "black",
    fontSize: 15,
    fontWeight: "normal",
    margin: 10,
    textAlign: "center",
    justifyContent: "center"
  },

  infoContainer2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%"
  },
  infoSeccion: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  blueButton: {
    height: 40,
    width: 100,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3791F4",
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: "black",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2
      },
      android: {
        elevation: 5
      }
    })
  }
});
