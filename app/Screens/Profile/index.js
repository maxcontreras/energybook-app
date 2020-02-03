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
  RefreshControl
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Orientation from "react-native-orientation";
import { connect } from "react-redux";
import ProfilePic from "../../Assets/Images/temporayProfile.png";
import ProfileMaps from "../../Components/ProfileMaps";
import Sesion from "../../Assets/Svg/sesion.svg";
import SesionS from "../../Assets/Svg/sesionS.svg";
import RNRestart from "react-native-restart";
import OneSignal from "react-native-onesignal";

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);
const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,

  inCaseCoords: state.weatherReducer
});

class Profile extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape",
      values: [],
      inCaseKey: []
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
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
          }
        );
      }
    } catch (error) {}
  };

  _signOutAsync = async () => {
    OneSignal.getTags(receivedTags => {
      console.log(receivedTags);
    });
    console.log(this.state.values.company);

    OneSignal.deleteTag(this.state.values.company);
    this.setState(
      {
        inCaseKey: this.state.values.accesToken
      },
      async () => {
        await AsyncStorage.clear();
        try {
          await AsyncStorage.setItem("inCaseKey", this.state.inCaseKey, () => {
            console.log(JSON.stringify(this.state.inCaseKey));
            RNRestart.Restart();
            this.props.navigation.navigate("Home");
          });
        } catch (error) {
          // Error saving data
        }
      }
    );
  };
  componentWillMount() {
    Orientation.unlockAllOrientations();
    this._retrieveData();
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }

  render() {
    var data = [
      { titulo: "Nombre", valor: this.state.values.company },
      { titulo: "Teléfono", valor: this.state.values.company_phone },
      { titulo: "Tamaño de la empresa", valor: this.state.values.size },
      { titulo: "Puesto", valor: this.state.values.puesto },
      { titulo: "Giro", valor: this.state.values.giro },
      { titulo: "Ubicación", valor: this.state.values.direccion }
    ];

    return (
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
        <SafeAreaView>
          <KeyboardAvoidingView enabled>
            <View style={styles.container}>
              <View style={styles.userView}>
                <Image style={styles.logo} source={ProfilePic} />
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  {this.state.values.name + " " + this.state.values.lastname}
                </Text>
                <Text style={{ color: "white", fontSize: 15 }}>
                  {this.state.values.company}
                </Text>
              </View>
              {this.state.values && (
                <ProfileMaps
                  lat={
                    this.state.values.location
                      ? this.state.values.location.lat
                      : this.props.inCaseCoords.ftcoords[0]
                  }
                  lon={
                    this.state.values.location
                      ? this.state.values.location.lon
                      : this.props.inCaseCoords.ftcoords[1]
                  }
                />
              )}
              <View style={styles.infoView}>
                <View style={styles.infoSign}>
                  <Text style={{ color: "white", fontSize: 13 }}>
                    Información
                  </Text>
                </View>
              </View>

              <Text style={styles.categoryText}>Email</Text>
              <View style={styles.textView}>
                <Text style={styles.infoText}>{this.state.values.email}</Text>
              </View>
              <Text style={styles.companyText}>Mi compañía</Text>
              <View>
                {data.map(file => (
                  <View>
                    <Text style={styles.categoryText}>{file.titulo}</Text>
                    <View style={styles.textView}>
                      <Text style={styles.infoText}>{file.valor}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => this._signOutAsync()}
                  style={styles.logoutButton}
                >
                  <SesionS style={{ width: 35, height: 35 }} />
                  <Text
                    style={[
                      styles.unselectedButtonText,
                      { paddingHorizontal: 10, fontSize: 15 }
                    ]}
                  >
                    Cerrar Sesión
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(Profile);
const styles = StyleSheet.create({
  scroll: {
    flex: 0,
    height: "auto",
    flexGrow: 1
  },
  unselectedButtonText: {
    color: "black",
    fontSize: 10
  },
  buttonG: {
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    marginLeft: 5
  },
  elevation: {
    borderWidth: 1,
    borderColor: "#737373",
    borderRadius: 20
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    width: "100%"
  },
  textView: {
    borderRadius: 10,
    marginBottom: 5,
    height: "auto",
    backgroundColor: "#E8ECEF",
    width: "100%",
    justifyContent: "center",
    padding: 10
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    height: "auto"
  },
  infoText: {
    color: "black",
    fontSize: 13
  },
  categoryText: {
    color: "black",
    fontSize: 13,
    padding: 10,
    textAlign: "left"
  },
  companyText: {
    color: "black",
    fontSize: 20,
    padding: 10,
    textAlign: "center"
  },
  infoView: {
    //  width: screenWidth,
    height: 70,
    backgroundColor: "#E8ECEF",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  infoSign: {
    height: 45,
    width: 95,
    backgroundColor: "#586365",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  userView: {
    //  width: screenWidth,
    height: 350,
    backgroundColor: "#586365",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain"
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  }
});
