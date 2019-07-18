/* @flow */

import React, { Component, PropTypes } from "react";
import { Select, Option } from "react-native-chooser";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
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
  Picker
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import RegistroFondo from "../../Assets/Images/RegistroFondo.jpg";
import LogoCl from "../../Assets/Images/LogoCl.png";
import { validationSchema } from "../../Components/ValidationSchema.js";
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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
    header: null
  };
  Iniciar() {
    this.props.navigation.navigate("Home");
  }
  render() {
    return (
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
        <SafeAreaView>
          <KeyboardAvoidingView enabled>
            <ImageBackground style={styles.imageBack} source={RegistroFondo}>
              <View style={styles.container}>
                <View style={styles.logoV}>
                  <Image style={styles.logo} source={LogoCl} />
                </View>
                <View style={styles.dataPart}>
                  <Text style={styles.data}>
                    Llena este formulario para obtener una versión demo de
                    nuestro Software de Gestión y Eficiencia Energética.
                  </Text>
                  <Formik
                    initialValues={{
                      name: "",
                      lastname: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      company: "",
                      phone: "",
                      state: "",
                      businessR: ""
                    }}
                    onSubmit={values => {
                      console.log(values);
                      fetch("http://api.ienergybook.com/api/eUsers", {
                        method: "POST",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ values })
                      })
                        .then(res => {
                          this.state.statusCode = res.status;
                          const data = res.json();
                          return Promise.all([this.state.statusCode, data]);
                        })
                        .then(json => {
                          //console.log(json);
                        })
                        .catch(err => {
                          console.log("no se pudo");
                        });
                    }}
                    validationSchema={validationSchema}
                  >
                    {formikProps => (
                      <React.Fragment>
                        <StyledInput
                          label="Nombre"
                          formikProps={formikProps}
                          formikKey={"name"}
                          placeholder="Nombre"
                        />

                        <StyledInput
                          label="Apellido"
                          formikProps={formikProps}
                          formikKey={"lastname"}
                          placeholder="Apellido"
                        />
                        <StyledInput
                          label="Email"
                          formikProps={formikProps}
                          formikKey={"email"}
                          placeholder="Email"
                        />
                        <StyledInput
                          label="Contraseña"
                          formikProps={formikProps}
                          formikKey={"password"}
                          placeholder="Contraseña"
                          secureTextEntry
                        />
                        <StyledInput
                          label="Confirmacion"
                          formikProps={formikProps}
                          formikKey={"confirmPassword"}
                          placeholder="Confirma tu contraseña"
                          secureTextEntry
                        />
                        <StyledInput
                          label="Compañia"
                          formikProps={formikProps}
                          formikKey={"company"}
                          placeholder="Compañia"
                        />
                        <View style={styles.container2}>
                          <Picker
                            style={styles.input2}
                            selectedValue={formikProps.values.businessR}
                            onValueChange={formikProps.handleChange(
                              "businessR"
                            )}
                          >
                            <Picker.Item
                              label="Manufactura"
                              value={"Manufactura"}
                            />
                            <Picker.Item
                              label="Automotriz"
                              value={"Automotriz"}
                            />
                            <Picker.Item label="Textil" value={"Textil"} />
                            <Picker.Item
                              label="Metalurgica"
                              value={"Metalurgica"}
                            />
                            <Picker.Item
                              label="Sidelurgica"
                              value={"Sidelurgica"}
                            />
                            <Picker.Item
                              label="Petroquimica"
                              value={"Petroquimica"}
                            />
                            <Picker.Item
                              label="Electrica"
                              value={"Electrica"}
                            />
                            <Picker.Item label="otro" value={"otro"} />
                          </Picker>
                          <Text style={styles.alert}>
                            {formikProps.touched.businessR &&
                              formikProps.errors.businessR}
                          </Text>
                        </View>
                        <StyledInput
                          label="Telefono"
                          formikProps={formikProps}
                          formikKey={"phone"}
                          placeholder="Telefono"
                          keyboardType="phone-pad"
                        />
                        <StyledInput
                          label="Estado"
                          formikProps={formikProps}
                          formikKey={"state"}
                          placeholder="Estado"
                        />
                        <View style={styles.btnRegV}>
                          <TouchableOpacity
                            onPress={formikProps.handleSubmit}
                            style={styles.btn}
                          >
                            <Text style={styles.btnTxt}>Registrarse</Text>
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
    height: "auto"
  },
  imageBack: {
    width: "auto",
    height: "auto"
  },
  input2: {
    borderRadius: 10,
    marginBottom: 5,
    height: 40,
    backgroundColor: "#F2F4FA",
    paddingLeft: 10
  },
  logo: {
    width: 270,
    height: 120,
    resizeMode: "contain"
  },
  logoV: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "transparent"
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
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingTop: 5
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
    alignItems: "center"
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
    justifyContent: "space-between",
    borderRadius: 10,
    height: "auto"
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
export default Register;
