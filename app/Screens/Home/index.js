import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import Logotip from "../../Assets/Images/Logotip.png";
import LoginFondo from "../../Assets/Images/LoginFondo.jpg";
import LoginFondoLS from "../../Assets/Images/LoginFondoLS.jpg";
import Orientation from "react-native-orientation";
import OneSignal from "react-native-onesignal";
import { connect } from "react-redux";
import {
  getUserInfo,
  getCompanyData,
  getCompanyId
} from "../../../Actions/Actions.js";

const mapStateToProps = state => ({
  homeData: state.initialValues
});

class Home extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    this.state = {
      username: "",
      password: "",
      statusCode: "",
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    Orientation.unlockAllOrientations();
  }
  _removeKey = async () => {
    try {
      await AsyncStorage.removeItem("inCaseKey");
    } catch (exception) {}
  };

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }

  Registrar() {
    this.props.navigation.navigate("Register");
  }

  PasswordChange() {
    this.props.navigation.navigate("PasswordChange");
  }

  postLogin() {
    fetch("http://api.ienergybook.com/api/eUsers/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password
      })
    })
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        console.log(json);
        this.props.dispatch(getUserInfo(json));
        if (this.state.statusCode == 200) {
          this.getCompany();
        } else {
          Alert.alert("Error", "Usuario o Contraseña incorrectos.", [
            {
              text: "Okay"
            }
          ]);
          AlertIOS.alert("Error", "Usuario o Contraseña incorrectos", [
            {
              text: "Reintentar",
              style: "cancel"
            }
          ]);
        }
      })
      .catch(err => {});
  }

  getCompany = async () => {
    console.log(this.props);

    const accesToken = await this.props.homeData.accesToken;

    try {
      var url = `http://api.ienergybook.com/api/eUsers/?filter={"where":{"id":"${this.props.homeData.userId}"}}&access_token=${accesToken}`;
      console.log(url);

      fetch(
        `http://api.ienergybook.com/api/eUsers/?filter={"where":{"id":"${this.props.homeData.userId}"}}&access_token=${accesToken}`,
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
            this.props.dispatch(getCompanyId(json));
            if (this.props.homeData.companyId) {
              this.getCompanyData();
            } else {
              this.Navigate();
            }
          }
        })
        .catch(err => {
          console.log("no se pudo");
        });
    } catch (exception) {}
  };
  getCompanyData() {
    console.log(this.props.homeData.companyId);
    fetch(
      `http://api.ienergybook.com/api/Companies/?filter={"where":{"id":"${this.props.homeData.companyId}"}}&access_token=${this.props.homeData.accesToken}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "appliscation/json"
        }
      }
    )
      .then(res => {
        this.state.statusCode = res.status;
        const data2 = res.json();
        return Promise.all([this.state.statusCode, data2]);
      })
      .then(json => {
        console.log(json);
        this.props.dispatch(getCompanyData(json));
        console.log(this.props);
        this._removeKey();
        if (this.props.homeData.companyId) {
          OneSignal.sendTag(this.props.homeData.company, "1");
          this.Navigate();
        }
      })
      .catch(err => {
        console.log("no se pudo");
      });
  }

  _storeData = async () => {
    let datos = {
      accesToken: this.props.homeData.accesToken,
      userId: this.props.homeData.userId,
      company: this.props.homeData.company,
      city: this.props.homeData.city,
      tipoTarifa: this.props.homeData.tipoTarifa,
      companyId: this.props.homeData.companyId,
      company_phone: this.props.homeData.company_phone,
      size: this.props.homeData.size,
      direccion: this.props.homeData.direccion,
      puesto: this.props.homeData.puesto,
      created_at: this.props.homeData.created_at,
      lastLogin: this.props.homeData.lastLogin,
      name: this.props.homeData.name,
      lastname: this.props.homeData.lastname,
      email: this.props.homeData.email,
      location: this.props.homeData.location,
      giro: this.props.homeData.giro,
      role_id: this.props.homeData.role_id,
      administrando: this.props.homeData.administrando
    };
    try {
      await AsyncStorage.setItem(
        "@MySuperStore:key",
        JSON.stringify(datos),
        () => {
          console.log(datos);
        }
      );
    } catch (error) {
      // Error saving data
    }
  };
  Navigate() {
    if (this.state.statusCode == 200) {
      this._storeData();
      this.props.navigation.navigate("Dashboard");
    } else {
      Alert.alert("Error", "Usuario o Contraseña incorrectos.", [
        {
          text: "Okay"
        }
      ]);
      AlertIOS.alert("Error", "Usuario o Contraseña incorrectos", [
        {
          text: "Reintentar",
          style: "cancel"
        }
      ]);
    }
  }
  render() {
    console.log(this.state.orientation);
    return (
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
        <ImageBackground
          style={[
            styles.background,
            { height: Math.max(screenWidth, screenHeight) }
          ]}
          source={
            this.state.orientation == "portrait" ? LoginFondo : LoginFondoLS
          }
        >
          <View style={styles.container}>
            <View
              style={[
                this.state.orientation == "portrait"
                  ? styles.logoV
                  : styles.logoLandscape
              ]}
            >
              <Image style={styles.logo} source={Logotip} />
            </View>
            <View
              style={[
                this.state.orientation == "portrait"
                  ? styles.loginPart
                  : styles.loginPartLS
              ]}
            >
              <Text style={styles.usPassText}>USUARIO</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ username: text })}
                underlineColorAndroid="#ffffff"
                autoCapitalize="none"
                returnKeyType="done"
              />
              <Text style={styles.usPassText}>CONTRASEÑA</Text>
              <TextInput
                underlineColorAndroid="#ffffff"
                secureTextEntry
                returnKeyType="go"
                style={styles.input}
                onChangeText={text => this.setState({ password: text })}
                autoCapitalize="none"
              />
              <View style={styles.btnInicV}>
                <TouchableOpacity
                  onPress={() => this.postLogin()}
                  style={styles.btn}
                >
                  <Text style={styles.btnTxt}>Iniciar Sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.newAccountView}>
              <TouchableOpacity
                onPress={() => this.Registrar()}
                style={styles.btn2}
              >
                <Text style={styles.btnTxt2}>¡Regístrate, es gratis!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.PasswordChange()}
                style={styles.btn2}
              >
                <Text style={styles.btnTxt2}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);

var screenHeight = Math.round(Dimensions.get("window").height);
var screenWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  background: {
    height: "100%",
    width: "100%"
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: "contain"
  },
  logoV: {
    flex: 2,
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "center"
  },
  logoLandscape: {
    flex: 2,
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "center"
  },
  loginPart: {
    paddingTop: 60,
    paddingLeft: 60,
    paddingRight: 60
  },
  loginPartLS: {
    paddingTop: 120,
    paddingLeft: 60,
    paddingRight: 60
  },
  btnInicV: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30
  },
  btn: {
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    backgroundColor: "#586365"
  },
  btn2: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 150
  },
  btnTxt: {
    color: "#A9F71B",
    fontSize: 15
  },
  btnTxt2: {
    color: "#FFFFFF",
    fontSize: 13
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    borderRadius: 10,
    height: "100%",
    width: "100%"
  },
  newAccountView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingTop: 40,
    paddingLeft: 30,
    paddingRight: 30
  },
  usPassText: {
    color: "#A9F71B",
    fontSize: 15,
    textAlign: "center"
  },
  input: {
    borderRadius: 10,
    marginBottom: 5,
    height: 40,
    backgroundColor: "#586365",
    paddingLeft: 10,
    color: "#ffffff"
  }
});
