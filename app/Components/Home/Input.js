import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {PasswordHide, PasswordLook} from '../../Assets/Svg/Design/index';
import {alert} from '../../Assets/Functions/setAlert';
import {homeInputs, screenHeight, screenWidth} from '../../Assets/constants';

import {getUserInfo} from '../../../Actions/Actions';

const mapStateToProps = state => ({
  homeData: state.initialValues,
});

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordHide: true,
      user: '',
      password: '',
    };
  }

  setValue(text, value) {
    value == 'USUARIO'
      ? this.setState({
          user: text,
        })
      : this.setState({
          password: text,
        });
  }

  setHideButton() {
    this.setState({
      passwordHide: !this.state.passwordHide,
    });
  }

  postLogin() {
    fetch('http://api.ienergybook.com/api/eUsers/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.user,
        password: this.state.password,
      }),
    })
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        console.log(json);
        this.props.dispatch(getUserInfo(json));
        if (this.state.statusCode == 200) {
          this.props.company();
        } else {
          alert('Usuario o Contraseña incorrectos.');
        }
      })
      .catch(err => {});
  }

  render() {
    return (
      <View style={[styles.loginPart]}>
        {homeInputs.map((input, index) => (
          <View key={index}>
            <Text style={styles.usPassText}>{input.title}</Text>
            <View
              style={
                input.title == 'USUARIO' ? styles.inputUser : styles.inputPass
              }>
              <TextInput
                style={[styles.input]}
                onChangeText={text => this.setValue(text, input.title)}
                autoCapitalize="none"
                secureTextEntry={
                  input.secureTextEntry
                    ? this.state.passwordHide
                      ? true
                      : false
                    : false
                }
              />
              {input.button && (
                <TouchableOpacity
                  style={{marginLeft: 5}}
                  onPress={() => this.setHideButton()}>
                  {this.state.passwordHide ? (
                    <PasswordHide />
                  ) : (
                    <PasswordLook />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
        <View style={styles.btnInicV}>
          <TouchableOpacity onPress={() => this.postLogin()} style={styles.btn}>
            <Text style={styles.btnTxt}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default connect(mapStateToProps)(Input);
const styles = StyleSheet.create({
  loginPart: {
    flex: 1,
    height: Math.max(screenHeight, screenWidth) / 3,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  btnInicV: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    width: '100%',
    height: 100,
  },
  btn: {
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    backgroundColor: '#586365',
  },
  btnTxt: {
    color: '#A9F71B',
    fontSize: 15,
  },

  usPassText: {
    color: '#A9F71B',
    fontSize: 15,
    textAlign: 'center',
    margin: 5,
  },
  input: {
    borderRadius: 10,
    height: 'auto',
    backgroundColor: '#586365',
    padding: 10,
    width: '90%',
    color: 'white',
    fontSize: 15,
  },
  inputPass: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    backgroundColor: '#586365',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: Math.min(screenHeight, screenWidth) - 120,
  },
  inputUser: {
    height: 'auto',
    backgroundColor: '#586365',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: Math.min(screenHeight, screenWidth) - 120,
  },
});
