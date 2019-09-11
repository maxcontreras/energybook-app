import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
  FlatList,
  StatusBar,
  Platform,
  AsyncStorage
} from "react-native";
import axios from "axios";
import Logotip from "../../Assets/Images/Logotip.png";
import LoginFondo from "../../Assets/Images/LoginFondo.jpg";
import LoginFondoLS from "../../Assets/Images/LoginFondoLS.jpg";
import Orientation from "react-native-orientation";
import { connect } from "react-redux";
import {
  getUserInfo,
  getCompanyData,
  getCompanyId,
  isAsync
} from "../../../Actions/Actions.js";
const mapStateToProps = state => ({
  userData: state.initialValues[0],
  companyData: state.initialValues[1],
  companyInfo: state.initialValues[2]
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      statusCode: "",
      portrait: true,
      landscape: false
    };
  }
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    Orientation.unlockAllOrientations();
  }
  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
  }
  _orientationDidChange = orientation => {
    if (orientation === "LANDSCAPE") {
      this.setState({
        portrait: false,
        landscape: true
      });
    } else {
      this.setState({
        portrait: true,
        landscape: false
      });
    }
  };
  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
  }
  Registrar() {
    this.props.navigation.navigate("Register");
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
  };

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
  getCompany() {
    console.log(this.props);
    fetch(
      `http://api.ienergybook.com/api/eUsers/?filter={"where":{"id":"${this.props.userData.userId}"}}&access_token=${this.props.userData.accesToken}`,
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
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        this.props.dispatch(getCompanyId(json));
        this.getCompanyData();
      })
      .catch(err => {
        console.log("no se pudo");
      });
  }
  getCompanyData() {
    fetch(
      `http://api.ienergybook.com/api/Companies/?filter={"where":{"id":"${this.props.companyData.companyId}"}}&access_token=${this.props.userData.accesToken}`,
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
        this.props.dispatch(getCompanyData(json));
        this.Navigate();
      })
      .catch(err => {
        console.log("no se pudo");
      });
  }

  _storeData = async () => {
    let datos = {
      accesToken: this.props.userData.accesToken,
      userId: this.props.userData.userId,
      company: this.props.companyInfo.company,
      city: this.props.companyInfo.city,
      tipoTarifa: this.props.companyInfo.tipoTarifa,
      companyId: this.props.companyData.companyId
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
      this.props.navigation.navigate("PrincipalScreen");
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
    return (
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
        <ImageBackground
          style={
            this.state.portrait ? styles.imageBack : styles.imageBackLandscape
          }
          source={this.state.portrait ? LoginFondo : LoginFondoLS}
        >
          <View style={styles.container}>
            <View
              style={[
                this.state.portrait ? styles.logoV : styles.logoLandscape
              ]}
            >
              <Image style={styles.logo} source={Logotip} />
            </View>
            <View
              style={[
                this.state.portrait ? styles.loginPart : styles.loginPartLS
              ]}
            >
              <Text style={styles.usPassText}>USUARIO</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ username: text })}
                underlineColorAndroid="#889093"
                autoCapitalize="none"
                returnKeyType="done"
              />
              <Text style={styles.usPassText}>CONTRASEÑA</Text>
              <TextInput
                underlineColorAndroid="#889093"
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
                onPress={() => this.postLogin()}
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
  imageBack: {
    width: screenWidth,
    height: screenHeight
  },
  imageBackLandscape: {
    width: screenHeight,
    height: screenHeight - 100,
    resizeMode: "contain"
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
    backgroundColor: "transparent",
    borderRadius: 10
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
    color: "#889093"
  }
});
