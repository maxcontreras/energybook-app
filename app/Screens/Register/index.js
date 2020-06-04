/* @flow */

import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Formik} from 'formik';
import {StyledInput} from '../../Components/PasswordChange/index';
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
  AvisoDePrivacidad,
} from '../../Components/Register/index';
import {validationSchema} from '../../Components/Register/ValidationSchema';
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
      stateCaption: 'Aguascalientes',
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
    //Checks if the email is real
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
    //Register function
    this.goForAxios(values.email);
    const contactData = {
      full_name: `${values.name} ${values.lastname}`,
      company_name: values.company,
      business_line: this.state.businessCaption,
      state: this.state.stateCaption,
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
    //Alert validations
    if (this.state.checked == false) {
      alert('Favor de aceptar el aviso de privacidad.');
    }
    if (!this.state.realEmail) {
      alert('Favor de ingresar una cuenta de correo real.');
    }
    //If the validations are correct
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
    //Changes pickers values (size,state,business)
    //Triggered by RegisterPicker.js
    tipo == 'size'
      ? this.setState({
          sizeCaption: value,
        })
      : tipo == 'estado'
      ? this.setState({
          stateCaption: value,
        })
      : this.setState({
          businessCaption: value,
        });
  }
  setAviso() {
    //Boolean, (Triggered by AvisoDePrivacidad.js
    //and NoticeOfPrivacy.js)
    this.setState({
      aviso: !this.state.aviso,
    });
  }
  setChecked(value) {
    //Boolean, (Triggered by CheckView.js )
    this.setState({checked: value});
  }

  render() {
    const registerValues = {
      name: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      company: '',
      phone: '',
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
                        <StyledInput
                          label={text.placeholder}
                          formikProps={formikProps}
                          formikKey={text.key}
                          placeholder={text.placeholder}
                          secureTextEntry={text.secure}
                        />
                      </View>
                    ))}
                    <View style={styles.container2}>
                      <RegisterPicker
                        function={this.prueba.bind(this)}
                        businessCaption={this.state.businessCaption}
                        sizeCaption={this.state.sizeCaption}
                        stateCaption={this.state.stateCaption}
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
              <AvisoDePrivacidad function={this.setAviso.bind(this)} />
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
