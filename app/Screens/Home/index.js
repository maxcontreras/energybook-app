/* @flow */

import React, { Component } from "react";
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
import logo from "../../Assets/Images/logo.jpg";
import fondoLogin from "../../Assets/Images/fondoLogin.png";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      passsword: "",
      posts: []
    };
  }

  static navigationOptions = {
    header: null
  };

  checkLogin() {
    const { username, passsword } = this.state;
    if (username == "admin" && passsword == "admin") {
      this.props.navigation.navigate("Dashboard");
    } else {
      Alert.alert("Error", "Username/Password mismatch", [
        {
          text: "Okay"
        }
      ]);
    }
  }

  postLogin() {
    fetch("http://localhost:3000/api/eUsers/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "admin@ecgenergia.com",
        password: "Password123"
      })
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log(json);
      })
      .catch(err => {
        console.error("Error", err);
      });
  }

  render() {
    return (
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
        <SafeAreaView>
          <KeyboardAvoidingView enabled>
            <ImageBackground style={styles.imageBack} source={fondoLogin}>
              <View style={styles.todo}>
                <View style={styles.container}>
                  <View style={styles.loginTopV}>
                    <View style={styles.loginBottomV}>
                      <Image style={styles.logo} source={logo} />
                      <Text style={styles.slogan}>
                        MONITOREA, ANALIZA Y AHORRA {"\n"} ENERGIA
                      </Text>
                    </View>
                    <View style={styles.loginPart}>
                      <Text style={styles.welcomeText}>
                        ¡Bienvenido! Ingresa a tu cuenta
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Usuario"
                        onChangeText={text => this.setState({ username: text })}
                        autoCapitalize="none"
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        onChangeText={text =>
                          this.setState({ passsword: text })
                        }
                        autoCapitalize="none"
                      />
                    </View>
                    <View style={styles.loginBottomV}>
                      <TouchableOpacity
                        onPress={() => this.postLogin()}
                        style={styles.btn}
                      >
                        <Text style={styles.btnTxt}>Iniciar Sesión</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.newAccountView}>
                      <Text style={styles.accountTxt}>No tienes cuenta?</Text>
                      <TouchableOpacity
                        onPress={() => this.checkLogin()}
                        style={styles.btn}
                      >
                        <Text style={styles.btnTxt}>Regístrate</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  imageBack: {
    width: "100%",
    height: "100%"
  },
  logo: {
    width: 250,
    height: 100
  },
  slogan: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold"
  },
  loginPart: {
    paddingTop: 30
  },
  input: {
    borderRadius: 10,
    marginBottom: 5,
    height: 40,
    backgroundColor: "#EFEFEF",
    paddingLeft: 10
  },
  btn: {
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    backgroundColor: "#313544",
    elevation: 10,
    ...Platform.select({
      ios: {
        shadowRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 0.2
      }
    })
  },
  btnTxt: {
    color: "white",
    fontSize: 15
  },
  accountTxt: {
    color: "#A19C9C",
    paddingBottom: 20
  },
  loginBottomV: {
    //el de abajo
    flex: 1,
    paddingBottom: 50,
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingTop: 20,
    borderRadius: 10
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 15,
    ...Platform.select({
      ios: {
        shadowRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 0.2
      }
    })
  },
  todo: {
    flex: 1,
    borderRadius: 20,
    flexDirection: "column",
    padding: 30,
    justifyContent: "center",
    paddingBottom: 100,
    paddingTop: 60
  },

  welcomeText: {
    fontSize: 15,
    color: "#000000",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 20
  },
  loginTopV: {
    flex: 1,
    paddingBottom: 30,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10
  },
  newAccountView: {
    flex: 1,
    paddingBottom: 30,
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingTop: 20,
    borderTopColor: "#BAB1B1",
    borderTopWidth: 1
  }
});

export default Home;
