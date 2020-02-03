/* @flow */

import React, { Component, PropTypes } from "react";
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
  PermissionsAndroid,
  Linking,
  Alert
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Formik } from "formik";
import * as yup from "yup";
import RegistroFondo from "../../Assets/Images/RegistroFondo.jpg";
import RegistroFondo2 from "../../Assets/Images/RegistroFondoLS.jpg";
import LogoCl from "../../Assets/Images/LogoCl.png";
import { validationSchema } from "../../Components/ValidationSchemas/ValidationSchema.js";
import Orientation from "react-native-orientation";
import RegisterPicker from "../../Components/Pickers/RegisterPicker";
import AvisoDePrivacidad from "../../Components/AvisoDePrivacidad";
import { Overlay } from "react-native-elements";

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
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape",
      checked: false,
      aviso: false
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  componentWillMount() {
    Orientation.unlockAllOrientations();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }
  static navigationOptions = {
    header: null
  };

  Registrarse(values) {
    console.log(values);
    var datos1 = {
      name: values.name,
      lastname: values.lastname,
      email: values.email,
      password: values.confirmPassword,
      contact_data: {
        full_name: `${values.name} ${values.lastname}`,
        company_name: values.company,
        business_line: values.businessR,
        state: values.state,
        size: values.size,
        phone: values.phone
      },
      free_trial: true,
      phone: values.phone,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log(JSON.stringify(datos1));

    if (this.state.checked == false) {
      Alert.alert("Error", "Favor de aceptar el aviso de privacidad.", [
        {
          text: "Okay"
        }
      ]);
    } else if (this.state.checked == true) {
      var datos = {
        name: values.name,
        lastname: values.lastname,
        email: values.email,
        password: values.confirmPassword,
        contact_data: {
          full_name: `${values.name} ${values.lastname}`,
          company_name: values.company,
          business_line: values.businessR,
          state: values.state,
          size: values.size,
          phone: values.phone
        },
        free_trial: true,
        phone: values.phone,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      fetch("http://api.ienergybook.com/api/eUsers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      })
        .then(res => {
          this.state.statusCode = res.status;
          const data = res.json();
          return Promise.all([this.state.statusCode, data]);
        })
        .then(json => {
          console.log(json);
          if (this.state.statusCode == 200) {
            Alert.alert("Registro completo!", "Por favor, inicia sesión", [
              {
                text: "Ok",
                onPress: () => this.props.navigation.navigate("Home")
              }
            ]);
          } else if (this.state.statusCode == 422) {
            Alert.alert("Lo sentimos", "Ese correo ya está registrado.", [
              {
                text: "Ok"
              }
            ]);
          } else {
            Alert.alert(
              "Lo sentimos",
              "Hubo un error al registrar tus datos.",
              [
                {
                  text: "Ok"
                }
              ]
            );
          }
        })
        .catch(err => {
          console.log("no se pudo");
        });
    }
  }

  Iniciar() {
    this.props.navigation.navigate("Home");
  }

  setAviso() {
    this.setState({
      aviso: false
    });
  }

  render() {
    return (
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
        <ImageBackground
          style={[styles.background]}
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
                Llena este formulario para obtener una versión demo de nuestro
                Software de Gestión y Eficiencia Energética.
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
                  businessR: "Manufactura",
                  size: "2-10"
                }}
                onSubmit={values => {
                  this.Registrarse(values);
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
                    <View style={styles.container2}>
                      <Text style={{ padding: 10 }}>Giro de tu empresa</Text>
                      <RegisterPicker
                        tipo={"giro"}
                        function={formikProps.handleChange}
                        selectedValue={formikProps.values.businessR}
                      />
                      <Text style={styles.alert}>
                        {formikProps.touched.businessR &&
                          formikProps.errors.businessR}
                      </Text>
                      <Text style={{ padding: 10 }}>
                        ¿Cuántas personas trabajan en tu empresa?
                      </Text>
                      <RegisterPicker
                        tipo={"numPersonas"}
                        function={formikProps.handleChange}
                        selectedValue={formikProps.values.size}
                      />
                      <Text style={styles.alert}>
                        {formikProps.touched.size && formikProps.errors.size}
                      </Text>
                    </View>
                    <View style={styles.btnRegV}>
                      <View
                        style={{
                          flex: 1,
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 10,
                          paddingTop: 0
                        }}
                      >
                        <CheckBox
                          center
                          checkedColor="black"
                          checked={this.state.checked}
                          onPress={() =>
                            this.setState({ checked: !this.state.checked })
                          }
                        />
                        <Text style={[styles.btnTxt2, { fontSize: 15 }]}>
                          Acepto el
                        </Text>
                        <TouchableOpacity
                          onPress={() => this.setState({ aviso: true })}
                          style={[styles.btn2, { padding: 5 }]}
                        >
                          <Text
                            style={[
                              styles.btnTxt2,
                              { textDecorationLine: "underline", fontSize: 15 }
                            ]}
                          >
                            Aviso de privacidad
                          </Text>
                        </TouchableOpacity>
                      </View>
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
            <Overlay
              isVisible={this.state.aviso}
              onBackdropPress={() => this.setState({ aviso: false })}
            >
              <AvisoDePrivacidad function={this.setAviso.bind(this)} />
            </Overlay>
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
  background: {
    flex: 1
  },
  input2: {
    borderRadius: 10,
    marginBottom: 5,
    height: 40,
    backgroundColor: "#F2F4FA",
    paddingLeft: 10
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    backgroundColor: "transparent"
  },
  logoV: {
    flex: 1,
    height: 180,
    alignItems: "flex-end",
    backgroundColor: "transparent",
    paddingTop: 20,
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
    paddingVertical: 20,
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
