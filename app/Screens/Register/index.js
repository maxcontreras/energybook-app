/* @flow */

import React, { Component, PropTypes } from "react";
import { Select, Option } from "react-native-chooser";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
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
  Picker,
  ActionSheetIOS,
  Alert,
  AlertIOS
} from "react-native";

import { Formik } from "formik";
import * as yup from "yup";
import RegistroFondo from "../../Assets/Images/RegistroFondo.jpg";
import RegistroFondo2 from "../../Assets/Images/RegistroFondoLS.jpg";
import LogoCl from "../../Assets/Images/LogoCl.png";
import { validationSchema } from "../../Components/ValidationSchema.js";
import Orientation from "react-native-orientation";
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
    this.state = {
      portrait: false,
      landscape: false
    };
  }
  static navigationOptions = {
    header: null
  };
  Iniciar() {
    this.props.navigation.navigate("Home");
  }
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
  render() {
    const giroArray = [
      "Manufactura",
      "Automotríz",
      "Textil",
      "Metalúrgica",
      "Sidelúrgica",
      "Petroquímica",
      "Electríca",
      "Otro"
    ];

    return (
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
        <ImageBackground
          style={
            this.state.portrait ? styles.imageBack : styles.imageBackLandscape
          }
          source={this.state.portrait ? RegistroFondo : RegistroFondo2}
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
                      Alert.alert("Registro completo!", [
                        {
                          text: "Okay",
                          onPress: () => this.props.navigation.navigate("Home")
                        }
                      ]);
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
                      <Picker
                        style={styles.input2}
                        selectedValue={formikProps.values.businessR}
                        onValueChange={formikProps.handleChange("businessR")}
                        mode={"dropdown"}
                      >
                        <Picker.Item
                          label="Manufactura"
                          value={"Manufactura"}
                        />
                        <Picker.Item label="Automotriz" value={"Automotriz"} />
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
                        <Picker.Item label="Electrica" value={"Electrica"} />
                        <Picker.Item label="otro" value={"otro"} />
                      </Picker>

                      <Text style={styles.alert}>
                        {formikProps.touched.businessR &&
                          formikProps.errors.businessR}
                      </Text>
                    </View>
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
    height: screenHeight + 200
  },
  imageBackLandscape: {
    width: screenHeight,
    height: screenHeight + 150,
    resizeMode: "center"
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
export default Register;
