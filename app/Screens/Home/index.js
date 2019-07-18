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
  Platform
} from "react-native";
import axios from "axios";
import Logotip from "../../Assets/Images/Logotip.png";
import LoginFondo from "../../Assets/Images/LoginFondo.jpg";
import Orientation from "react-native-orientation";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      statusCode: "",
      id: "",
      userId: "",
      datos: [],
      data2: [],
      company: "",
      companyName: "",
      city: "",
      portrait: false,
      landscape: false
    };
  }
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    if (initial === "PORTRAIT") {
      this.setState({
        portrait: true,
        landscape: false
      });
    } else {
      this.setState({
        portrait: false,
        landscape: true
      });
    }
  }
  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
  }
  _orientationDidChange = orientation => {
    if (orientation === "LANDSCAPE") {
      console.log("LANDSCAPE");
      this.setState({
        portrait: false,
        landscape: true
      });
    } else {
      this.setState({
        portrait: true,
        landscape: false
      });
      console.log("PORTRAIT");
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
        this.setState({
          id: json[1].id,
          userId: json[1].userId
        });
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
    fetch(
      `http://api.ienergybook.com/api/eUsers/?filter={"where":{"id":"${this.state.userId}"}}&access_token=${this.state.id}`,
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
        this.setState({
          datos: json[1]
        });
        this.setState({
          companyId: this.state.datos[0].company_id
        });
        if (!this.state.companyId) {
          this.setState({
            companyId: "5c2e7d9d51e9f51b9e5de809"
          });
        } else {
          this.setState({
            companyId: this.state.companyId
          });
        }
        this.getCompanyData();
      })
      .catch(err => {
        console.log("no se pudo");
      });
  }
  getCompanyData() {
    fetch(
      `http://api.ienergybook.com/api/Companies/?filter={"where":{"id":"${this.state.companyId}"}}&access_token=${this.state.id}`,
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
        //console.log(json);
        this.setState({
          datos2: json[1]
        });
        this.setState({
          companyName: this.state.datos2[0].company_name,
          city: this.state.datos2[0].city
        });
        //console.log(this.state.city, this.state.companyName);
        this.Navigate();
      })
      .catch(err => {
        console.log("no se pudo");
      });
  }
  Navigate() {
    if (this.state.statusCode == 200) {
      this.props.navigation.navigate("PrincipalScreen", {
        prevScreenTitlle: this.state.id,
        company: this.state.companyId,
        city: this.state.city,
        companyName: this.state.companyName
      });
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
        <SafeAreaView>
          <KeyboardAvoidingView enabled>
            <ImageBackground
              style={
                this.state.portrait
                  ? styles.imageBack
                  : styles.imageBackLandscape
              }
              source={LoginFondo}
            >
              <View style={styles.container}>
                <View
                  style={[
                    this.state.portrait ? styles.logoV : styles.logoLandscape
                  ]}
                >
                  <Image style={styles.logo} source={Logotip} />
                </View>
                <View style={styles.loginPart}>
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
                    <Text style={styles.btnTxt2}>
                      ¿Olvidaste tu contraseña?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
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
    height: screenHeight
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
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "flex-start"
  },
  loginPart: {
    paddingTop: 60,
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
export default Home;
