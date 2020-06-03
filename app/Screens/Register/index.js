/* @flow */

import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Formik} from 'formik';
import {AlertSVG} from '../../Assets/Svg/Design/index';
import {Overlay} from 'react-native-elements';
import axios from 'axios';
import {
  formIndications,
  inputsRegister,
  isPortrait,
} from '../../Assets/constants';
import {
  CheckView,
  NoticeOfPrivacy,
  BackGround,
  RegisterPicker,
  validationSchema,
  AvisoDePrivacidad,
} from '../../Components/Register/index';
import {alertRegister, alert} from '../../Assets/Functions/setAlert';

class Register extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      checked: false,
      aviso: false,
      businessCaption: 'Manufactura',
      sizeCaption: '2-10',
      realEmail: false,
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  static navigationOptions = {
    header: null,
  };

  goForAxios = email => {
    axios
      .get(
        `https://emailverification.whoisxmlapi.com/api/v1?apiKey=at_MTLMWalq44cfd7nhWV4xrpo41yOHn&emailAddress=${email}`,
      )
      .then(response => {
        console.log('getting data from axios', response.data);
        this.setState({
          realEmail: response.data.smtpCheck,
        });
        setTimeout(() => {
          console.log(response.data);
        }, 2000);
      })
      .catch(error => {
        console.log(error);
      });
  };

  Registrarse(values) {
    this.goForAxios(values.email);
    const contactData = {
      full_name: `${values.name} ${values.lastname}`,
      company_name: values.company,
      business_line: this.state.businessCaption,
      state: values.state,
      size: this.state.sizeCaption,
      phone: values.phone,
    };
    const newUser = {
      name: values.name,
      lastname: values.lastname,
      email: values.email,
      password: values.confirmPassword,
      phone: values.phone,
    };

    console.log({contactData, newUser});

    if (this.state.checked == false) {
      alert('Favor de aceptar el aviso de privacidad.');
    }
    if (!this.state.realEmail) {
      alert('Favor de ingresar una cuenta de correo real.');
    }
    if (this.state.checked == true && this.state.realEmail) {
      fetch('http://api.ienergybook.com/api/Companies/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({contactData: contactData, user: newUser}),
      })
        .then(res => {
          this.state.statusCode = res.status;
          const data = res.json();
          return Promise.all([this.state.statusCode, data]);
        })
        .then(json => {
          console.log(json);
          alertRegister(
            this.state.statusCode,
            this.props.navigation.navigate('Home'),
          );
        })
        .catch(err => {
          console.log('no se pudo');
        });
    }
  }
  prueba(value, tipo) {
    tipo == 'size'
      ? this.setState({
          sizeCaption: value,
        })
      : this.setState({
          businessCaption: value,
        });
  }

  setAviso(value) {
    this.setState({
      aviso: value,
    });
  }

  setAviso2() {
    this.setState({
      aviso: !this.state.aviso,
    });
  }

  setChecked(value) {
    this.setState({checked: value});
  }

  render() {
    var registerValues = {
      name: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      company: '',
      phone: '',
      state: '',
    };

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          <View style={styles.container}>
            <BackGround />
            <View style={styles.dataPart}>
              <Text style={styles.data}>{formIndications}</Text>
              <Formik
                initialValues={registerValues}
                onSubmit={values => {
                  this.Registrarse(values);
                }}
                validationSchema={validationSchema}>
                {formikProps => (
                  <React.Fragment>
                    {inputsRegister.map((text, index) => (
                      <View key={index} style={styles.inputField}>
                        <TextInput
                          style={[styles.input2]}
                          placeholder={text.placeholder}
                          placeHolderTextColor="black"
                          onChangeText={formikProps.handleChange(text.key)}
                          onBlur={formikProps.handleBlur(text.key)}
                          autoCapitalize={text.cap}
                          returnKeyType="done"
                          secureTextEntry={text.secure}
                        />
                        {formikProps.touched[text.key] &&
                          formikProps.values[text.key] == '' && (
                            <View style={styles.alertV}>
                              <Text style={styles.alert}>
                                {formikProps.touched[text.key] &&
                                  formikProps.errors[text.key]}
                              </Text>
                              <AlertSVG />
                            </View>
                          )}
                      </View>
                    ))}
                    <View style={styles.container2}>
                      <RegisterPicker
                        function={this.prueba.bind(this)}
                        businessCaption={this.state.businessCaption}
                        sizeCaption={this.state.sizeCaption}
                      />
                    </View>
                    <View style={styles.btnRegV}>
                      <View style={styles.checkView}>
                        <CheckView setChecked={this.setChecked.bind(this)} />
                        <NoticeOfPrivacy setAviso={this.setAviso.bind(this)} />
                      </View>
                      <TouchableOpacity
                        onPress={formikProps.handleSubmit}
                        style={styles.btn}>
                        <Text style={styles.btnTxt}>Registrarse</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Home')}
                        style={styles.btn2}>
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
              onBackdropPress={() => this.setState({aviso: false})}>
              <AvisoDePrivacidad function={this.setAviso2.bind(this)} />
            </Overlay>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  input2: {
    borderRadius: 10,
    marginBottom: 10,
    height: 40,
    backgroundColor: '#F2F4FA',
    paddingLeft: 10,
  },
  dataPart: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnRegV: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingTop: 5,
  },
  btn: {
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    backgroundColor: '#586365',
  },
  btn2: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  btnTxt2: {
    color: '#000000',
    fontSize: 12,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 10,
    height: 'auto',
    paddingBottom: 30,
  },
  data: {
    color: '#000000',
    fontSize: 15,
    paddingVertical: 20,
    textAlign: 'center',
  },
  container2: {
    flex: 1,
  },
  alert: {
    color: 'red',
    fontSize: 10,
    textAlign: 'right',
    paddingRight: 10,
  },
  alertV: {
    padding: 10,
    paddingTop: 0,
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    padding: 10,
  },
  checkView: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Register;
