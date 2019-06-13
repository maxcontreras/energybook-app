/* @flow */

import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, DrawerNavigator } from "react-navigation";
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
} from 'react-native';

import RegistroFondo from "../../Assets/Images/RegistroFondo.jpg";
import LogoCl from "../../Assets/Images/LogoCl.png";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: ""
    };
  }
static navigationOptions = {
    header: null
};

Iniciar(){
  this.props.navigation.navigate("Home");
}
Registrar(){
}

render() {
  return (
    <ScrollView style={styles.scroll}
      keyboardShouldPersistTaps="never"
      >
      <SafeAreaView>
        <KeyboardAvoidingView enabled>
          <ImageBackground style={styles.imageBack} source={RegistroFondo}>
              <View style={styles.container}>
                  <View style={styles.logoV}>
                    <Image style={styles.logo} source={LogoCl} />
                  </View>
                  <View style={styles.dataPart}>
                    <Text style={styles.data}>Llena este formulario para
                    obtener una versión demo de nuestro Software de Gestión y
                    Eficiencia Energética.</Text>
                  <TextInput
                    style={styles.input2}
                    placeholder='Nombre'
                    placeHolderTextColor='black'
                    onChangeText={text => this.setState({ nombre: text })}
                    autoCapitalize="none"
                    returnKeyType='done'
                  />
                  <TextInput
                    style={styles.input2}
                    placeholder='Apellido'
                    placeHolderTextColor='black'
                    onChangeText={text => this.setState({ apellido: text })}
                    autoCapitalize="none"
                    returnKeyType='done'
                  />
                  <TextInput
                    style={styles.input2}
                    placeholder='Email'
                    placeHolderTextColor='black'
                    onChangeText={text => this.setState({ email: text })}
                    autoCapitalize="none"
                    returnKeyType='done'
                  />
                  <TextInput
                    style={styles.input2}
                    placeholder='Contraseña'
                    placeHolderTextColor='black'
                    secureTextEntry
                    onChangeText={text => this.setState({ contraseña: text })}
                    autoCapitalize="none"
                    returnKeyType='done'
                  />
                  <TextInput
                    style={styles.input2}
                    placeholder='Confirmar Contraseña'
                    placeHolderTextColor='black'
                    secureTextEntry
                    onChangeText={text => this.setState({ confirm: text })}
                    autoCapitalize="none"
                    returnKeyType='done'
                  />
                  <TextInput
                    style={styles.input2}
                    placeholder='Nombre de la empresa'
                    placeHolderTextColor='black'
                    onChangeText={text => this.setState({ nombreEmp: text })}
                    autoCapitalize="none"
                    returnKeyType='done'
                  />
                  <TextInput
                    style={styles.input2}
                    placeholder='Giro de tu empresa'
                    placeHolderTextColor='black'
                    onChangeText={text => this.setState({ giro: text })}
                    autoCapitalize="none"
                    returnKeyType='done'
                  />
                  <TextInput
                    style={styles.input2}
                    placeholder='Telefono'
                    placeHolderTextColor='black'
                    onChangeText={text => this.setState({ telefono: text })}
                    autoCapitalize="none"
                    returnKeyType='done'
                    keyboardType='phone-pad'
                  />
                  <TextInput
                    style={styles.input2}
                    placeholder='Estado'
                    placeHolderTextColor='black'
                    onChangeText={text => this.setState({ estado: text })}
                    autoCapitalize="none"
                    returnKeyType='go'
                  />
                </View>
                <View style={styles.btnRegV}>
                  <TouchableOpacity
                    onPress={() => this.Registrar()}
                    style={styles.btn}>
                    <Text style={styles.btnTxt}>Registrarse</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.Iniciar()}
                    style={styles.btn2}>
                    <Text style={styles.btnTxt2}>¿Ya tienes cuenta? Inicia sesión</Text>
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
const styles = StyleSheet.create({
  scroll: {
    flex: 0,
    height: 'auto'
  },
  imageBack: {
    width: 'auto',
    height: 'auto',
  },
  input2: {
    borderRadius: 10,
    marginBottom: 5,
    height: 40,
    backgroundColor: "#F2F4FA",
    paddingLeft: 10,
  },
  logo: {
    width: 270,
    height: 120,
    resizeMode: 'contain',
  },
  logoV: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "transparent",

  },
  dataPart: {
    backgroundColor: 'transparent',
    flex: 4,
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnRegV:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingTop: 5,
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
  },
  btnTxt: {
    color: "#FFFFFF",
    fontSize: 15
  },
  btnTxt2: {
    color: "#000000",
    fontSize: 12
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: 'space-between',
    borderRadius: 10,
    height: 'auto'
    },
  data: {
    color: '#000000',
    fontSize: 15,
    paddingBottom: 20,
  }
});
export default Register
