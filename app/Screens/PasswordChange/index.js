/* @flow */

import React, { Component, PropTypes } from "react";
import { Select, Option } from "react-native-chooser";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import { Formik } from "formik";
import * as yup from "yup";
import RegistroFondo from "../../Assets/Images/RegistroFondo.jpg";
import RegistroFondo2 from "../../Assets/Images/RegistroFondoLS.jpg";
import LogoCl from "../../Assets/Images/LogoCl.png";
import { validationSchema } from "../../Components/ValidationSchemas/PasswordSchema";
import Orientation from "react-native-orientation";
import AsyncStorage from "@react-native-community/async-storage";
const StyledInput = ({
  label,
  formikProps,
  formikKey,
  placeholder,
  ...rest
}) => (
  <View>
    <TextInput
      style={styles.input2}
      placeholder={placeholder}
      placeHolderTextColor="black"
      onChangeText={formikProps.handleChange(formikKey)}
      onBlur={formikProps.handleBlur(formikKey)}
      autoCapitalize="none"
      returnKeyType="done"
      {...rest}
    />
    <Text style={styles.alert}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape",
      inCaseKey: "",
      email: "",
      emails: [],
      isVerified: false
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  componentWillMount() {
    Orientation.unlockAllOrientations();
    this._retrieveData();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }
  static navigationOptions = {
    header: null
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("inCaseKey");
      if (value !== null) {
        console.log(value);
        this.setState(
          {
            inCaseKey: value
          },
          () => {
            console.log(this.state.inCaseKey);
          }
        );
      }
    } catch (error) {}
  };

  email(emailsitos) {
    var index = emailsitos.indexOf(this.state.email);
    if (index == -1) {
      this.setState(
        {
          isVerified: false
        },
        () => {
          Alert.alert("Error", "Favor de ingresar una cuenta ya registrada.", [
            {
              text: "Ok"
            }
          ]);
        }
      );
    } else {
      this.setState({
        isVerified: true
      });
    }
  }

  verifyEmail() {
    fetch(
      `http://api.ienergybook.com/api/eUsers/?access_token=${this.state.inCaseKey}`,
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
        console.log(json);
        var emails = {
          data: []
        };
        for (var i in json[1]) {
          var item = json[1][i].email;
          emails.data.push(item);
        }
        this.email(emails.data);
      })
      .catch(err => {
        console.log("no se pudo");
      });
  }

  values(values) {
    console.log(this.state.inCaseKey);
    var jsonArray = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword
    };
    if (this.state.inCaseKey == "") {
      Alert.alert("Error", "Favor de antes iniciar una sesión de usuario", [
        {
          text: "Okay"
        }
      ]);
    } else {
      fetch(
        `http://api.ienergybook.com/api/eUsers/change-password?access_token=${this.state.inCaseKey}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ jsonArray })
        }
      )
        .then(res => {
          this.state.statusCode = res.status;
          const data = res.json();
          return Promise.all([this.state.statusCode, data]);
        })
        .then(json => {
          if (this.state.statusCode == 400) {
            Alert.alert("Lo siento", "La contraseña actual no existe", [
              {
                text: "Ok"
              }
            ]);
          } else if (this.state.statusCode == 200) {
            Alert.alert("Listo", "La contraseña ha sido cambiada con éxito.", [
              {
                text: "Ok",
                onPress: async () => {
                  await AsyncStorage.clear();
                  this.Iniciar();
                }
              }
            ]);
          }
        })
        .catch(err => {
          Alert.alert("Error", "No se ha podido actualizar la contraseña", [
            {
              text: "Ok"
            }
          ]);
        });
    }
  }

  Iniciar() {
    this.props.navigation.navigate("Home");
  }

  render() {
    return (
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
        <ImageBackground
          style={[
            styles.background,
            this.state.orientation == "portrait"
              ? { height: Math.max(screenWidth, screenHeight) }
              : { height: Math.max(screenWidth, screenHeight) - 200 }
          ]}
          source={
            this.state.orientation == "portrait"
              ? RegistroFondo
              : RegistroFondo2
          }
        >
          <View style={styles.container}>
            <View style={styles.logoV}>
              <Image style={styles.logo} source={LogoCl} />
            </View>
            <View style={styles.dataPart}>
              <Text style={styles.data}>
                Una contraseña segura contribuye a evitar el acceso no
                autorizado a la cuenta de correo electrónico.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    borderRadius: 50,
                    borderWidth: 1,
                    width: 30,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 5
                  }}
                >
                  <Text style={{ color: "black", fontSize: 10 }}>
                    {!this.state.isVerified ? "1" : "2"}
                  </Text>
                </View>
                <Text>
                  {!this.state.isVerified
                    ? "Ingresa tu correo electrónico para verificar tu cuenta."
                    : "Cambia tu contraseña!"}
                </Text>
              </View>
              {!this.state.isVerified && (
                <TextInput
                  style={styles.input2}
                  placeholder={"Email"}
                  placeHolderTextColor="black"
                  onChangeText={text => {
                    this.setState({ email: text });
                  }}
                  autoCapitalize="none"
                  returnKeyType="done"
                />
              )}
              {!this.state.isVerified && (
                <View style={styles.btnRegV}>
                  <TouchableOpacity
                    onPress={() => this.verifyEmail()}
                    style={styles.btn}
                  >
                    <Text style={[styles.btnTxt]}>Verifica tu Email!</Text>
                  </TouchableOpacity>
                </View>
              )}
              {this.state.isVerified && (
                <Formik
                  initialValues={{
                    oldPassword: "",
                    actualPassword: "",
                    newPassword: ""
                  }}
                  onSubmit={values => {
                    this.values(values);
                  }}
                  validationSchema={validationSchema}
                >
                  {formikProps => (
                    <React.Fragment>
                      <StyledInput
                        label="ContraseñaActual"
                        formikProps={formikProps}
                        formikKey={"oldPassword"}
                        placeholder="Contraseña actual"
                        secureTextEntry
                      />
                      <StyledInput
                        label="NuevaContraseña"
                        formikProps={formikProps}
                        formikKey={"actualPassword"}
                        placeholder="Nueva Contraseña"
                        secureTextEntry
                      />
                      <StyledInput
                        label="Confirmacion"
                        formikProps={formikProps}
                        formikKey={"newPassword"}
                        placeholder="Confirmar contraseña"
                        secureTextEntry
                      />
                      <View style={styles.btnRegV}>
                        <TouchableOpacity
                          onPress={formikProps.handleSubmit}
                          style={styles.btn}
                        >
                          <Text style={styles.btnTxt}>Cambiar Contraseña</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.Iniciar()}
                          style={styles.btn2}
                        >
                          <Text style={styles.btnTxt2}>
                            ¿Ya tienes cuenta? Inicia sesión
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </React.Fragment>
                  )}
                </Formik>
              )}
            </View>
          </View>
        </ImageBackground>
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
  background: { flex: 1 },
  input2: {
    borderRadius: 10,
    marginBottom: 5,
    height: 40,
    backgroundColor: "#F2F4FA",
    paddingLeft: 10
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "stretch",
    backgroundColor: "transparent"
  },
  logoV: {
    flex: 1,
    height: 180,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    paddingRight: 65
  },
  dataPart: {
    backgroundColor: "transparent",
    flex: 4,
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10
  },
  btnRegV: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    paddingTop: 5,
    paddingBottom: 20
  },
  btn: {
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    backgroundColor: "#586365",
    marginBottom: 30
  },
  btn2: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20
  },
  btnTxt: {
    color: "#FFFFFF",
    fontSize: 13
  },
  btnTxt2: {
    color: "#000000",
    fontSize: 12
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    borderRadius: 10
  },
  data: {
    color: "#000000",
    fontSize: 15,
    paddingBottom: 20,
    textAlign: "center"
  },
  container2: {
    flex: 1
  },
  alert: {
    color: "red",
    fontSize: 10,
    textAlign: "right",
    paddingRight: 10
  },
  picker: {
    padding: 10
  }
});
export default PasswordChange;
