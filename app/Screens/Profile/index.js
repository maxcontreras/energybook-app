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
    this.setState(
      {
        inCaseKey: this.state.values.accesToken
      },
      async () => {
        await AsyncStorage.clear();
        try {
          await AsyncStorage.setItem("inCaseKey", this.state.inCaseKey, () => {
            console.log(JSON.stringify(this.state.inCaseKey));
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
              {this.state.values.location  &&(
              <ProfileMaps lat={this.state.values.location ? this.state.values.location.lat : this.props.inCaseCoords.ftcoords[0]} lon={this.state.values.location ? this.state.values.location.lon : this.props.inCaseCoords.ftcoords[1]}/>
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
              <Text style={styles.categoryText}>Nombre</Text>
              <View style={styles.textView}>
                <Text style={styles.infoText}>{this.state.values.company}</Text>
              </View>
              <Text style={styles.categoryText}>Teléfono</Text>
              <View style={styles.textView}>
                <Text style={styles.infoText}>
                  {this.state.values.company_phone}
                </Text>
              </View>
              <Text style={styles.categoryText}>Tamaño de la empresa</Text>
              <View style={styles.textView}>
                <Text style={styles.infoText}>{this.state.values.size}</Text>
              </View>
              <Text style={styles.categoryText}>Puesto</Text>
              <View style={styles.textView}>
                <Text style={styles.infoText}>{this.state.values.puesto}</Text>
              </View>
              <Text style={styles.categoryText}>Giro</Text>
              <View style={styles.textView}>
                <Text style={styles.infoText}>{this.state.values.giro}</Text>
              </View>
              <Text style={styles.categoryText}>Ubicación</Text>
              <View style={styles.textView}>
                <Text style={styles.infoText}>
                  {this.state.values.direccion}
                </Text>
              </View>

              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => this._signOutAsync()}
                  style={[styles.buttonG, styles.elevation]}
                >
                  <Text style={styles.unselectedButtonText}>Salir</Text>
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
    fontSize: 15,
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
  }
});
