import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import {StyledInput} from '../../Components/PasswordChange/index';
import {alert, alertPassword} from '../../Assets/Functions/setAlert';
import AsyncStorage from '@react-native-community/async-storage';
import {validationSchema} from '../../Components/PasswordChange/PasswordSchema';

export default class VerifiedInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusCode: null,
    };
  }

  values(values) {
    if (this.props.values == '') {
      alert('Favor de antes iniciar una sesión de usuario');
    } else {
      fetch(
        `http://api.ienergybook.com/api/eUsers/resetPasswordEdited?access_token=${
          this.props.values
        }`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: this.props.userId,
            password: values.newPassword,
          }),
        },
      )
        .then(res => {
          this.state.statusCode = res.status;
          const data = res.json();
          return Promise.all([this.state.statusCode, data]);
        })
        .then(json => {
          console.log(json);
          alertPassword(this.state.statusCode, async () => {
            await AsyncStorage.clear();
            this.props.navigation.navigate('Home');
          });
        })
        .catch(err => {
          //alert('No se ha podido actualizar la contraseña');
        });
    }
  }

  render() {
    console.log(this.props);

    return (
      <Formik
        initialValues={{
          actualPassword: '',
          newPassword: '',
        }}
        onSubmit={values => {
          this.values(values);
        }}
        validationSchema={validationSchema}>
        {formikProps => (
          <React.Fragment>
            <StyledInput
              label="NuevaContraseña"
              formikProps={formikProps}
              formikKey={'actualPassword'}
              placeholder="Nueva Contraseña"
              secureTextEntry
            />
            <StyledInput
              label="Confirmacion"
              formikProps={formikProps}
              formikKey={'newPassword'}
              placeholder="Confirmar contraseña"
              secureTextEntry
            />
            <View style={styles.btnRegV}>
              <TouchableOpacity
                onPress={formikProps.handleSubmit}
                style={styles.btn}>
                <Text style={styles.btnTxt}>Cambiar Contraseña</Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  input2: {
    borderRadius: 10,
    marginBottom: 5,
    height: 40,
    backgroundColor: '#F2F4FA',
    paddingLeft: 10,
  },
  btnRegV: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingTop: 5,
    paddingBottom: 20,
  },
  btn: {
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    backgroundColor: '#586365',
    marginBottom: 30,
  },
  btnTxt: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  alert: {
    color: 'red',
    fontSize: 10,
    textAlign: 'right',
    paddingRight: 10,
  },
  alertV: {
    padding: 10,
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
