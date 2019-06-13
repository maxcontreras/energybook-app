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
import axios from 'axios';
import Logotip from "../../Assets/Images/Logotip.png";
import LoginFondo from "../../Assets/Images/LoginFondo.jpg";


class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      statusCode: "",
    };
  }
static navigationOptions = {
    header: null
};
  Registrar(){
    this.props.navigation.navigate("Dashboard");
  }
  postLogin() {
    fetch("http://192.168.1.69:3000/api/eUsers/login", {
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
      const data =  res.json();
      return Promise.all([this.state.statusCode,data])
      })
    .then(json => {
      console.log(json);
      if(this.state.statusCode == 200){
          this.props.navigation.navigate("Dashboard");
      }else{
        Alert.alert("Error", "Usuario o Contraseña incorrectos.", [
      {
        text: "Okay"
      }
      ]);
       AlertIOS.alert('Error', 'Usuario o Contraseña incorrectos',
      [
     {
      text: 'Reintentar',
      style: 'cancel',
    },
  ],
);
    }
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
            <ImageBackground style={styles.imageBack} source={LoginFondo}>
                <View style={styles.container}>
                    <View style={styles.logoV}>
                      <Image style={styles.logo} source={Logotip} />
                    </View>
                    <View style={styles.loginPart}>
                    <Text style={styles.usPassText}>USUARIO</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({ username: text })}
                    underlineColorAndroid= '#889093'
                    autoCapitalize="none"
                    returnKeyType='done'
                    />
                      <Text style={styles.usPassText}>CONTRASEÑA</Text>
                      <TextInput
                      underlineColorAndroid= '#889093'
                      secureTextEntry
                      returnKeyType='go'
                      style={styles.input}
                      onChangeText={text => this.setState({ password: text })}
                      autoCapitalize='none'
                      />
                      <View style={styles.btnInicV}>
                      <TouchableOpacity
                        onPress={() => this.postLogin()}
                        style={styles.btn}>
                        <Text style={styles.btnTxt}>Iniciar Sesión</Text>
                      </TouchableOpacity>
                      </View>
                      </View>
                    <View style={styles.newAccountView}>
                    <TouchableOpacity
                      onPress={() => this.Registrar()}
                      style={styles.btn2}>
                      <Text style={styles.btnTxt2}>¡Regístrate, es gratis!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.postLogin()}
                      style={styles.btn2}>
                      <Text style={styles.btnTxt2}>¿Olvidaste tu contraseña?</Text>
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
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  imageBack: {
    width: screenWidth,
    height: screenHeight,
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
  },
  loginPart: {
    paddingTop: 60,
    paddingLeft: 60,
    paddingRight: 60,
  },
  btnInicV:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  btn: {
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    backgroundColor: "#586365",
  },
  btn2: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
  },
  btnTxt: {
    color: "#A9F71B",
    fontSize: 15
  },
  btnTxt2: {
    color: "#FFFFFF",
    fontSize: 13
  },
  logoV: {
    flex: 2,
    paddingBottom: 50,
    alignItems: "center",
    backgroundColor: "transparent",
    paddingTop: 50,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderRadius: 10,
    paddingTop: 30,
    },
  newAccountView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "transparent",
    paddingTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
  },
  usPassText: {
    color: '#A9F71B',
    fontSize: 15,
    textAlign: 'center'
  },
  input: {
    borderRadius: 10,
    marginBottom: 5,
    height: 40,
    backgroundColor: "#586365",
    paddingLeft: 10,
    color: '#889093'
  },
});
export default Home
