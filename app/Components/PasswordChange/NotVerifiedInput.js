import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {alert, alertPassword} from '../../Assets/Functions/setAlert';

export default class NotVerifiedInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      values: [],
      emails: [],
      isVerified: false,
      id: '',
    };
  }

  UNSAFE_componentWillMount() {
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('inCaseKey');
      if (value !== null) {
        console.log(value);
        this.setState(
          {
            values: value,
          },
          () => {
            console.log(this.state.values);
          },
        );
      }
    } catch (error) {}
  };

  verifyEmail() {
    //Takes all users from api
    fetch(
      `http://api.ienergybook.com/api/eUsers/?access_token=${
        this.state.values
      }`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'appliscation/json',
        },
      },
    )
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        console.log(json);
        this.setState(
          {
            emails: json[1],
          },
          () => {
            this.email();
          },
        );
      })
      .catch(err => {
        console.log('no se pudo');
      });
  }

  email() {
    let contador = 0;
    // looks for the email given by the user in this.state.emails
    for (var i = 0; i < this.state.emails.length; i++) {
      console.log(this.state.emails[i]);
      //if theres a match
      if (this.state.emails[i].email == this.state.email) {
        contador++;
        this.setState({
          id: this.state.emails[i].id,
        });
      }
    }
    if (contador == 0) {
      //if the email doesnt exists
      this.setWarning();
    }
    this.setState(
      {
        isVerified: contador == 0 ? false : true,
      },
      () => {
        this.props.sendEmail(
          this.state.isVerified,
          this.state.email,
          this.state.id,
        );
      },
    );
  }

  setWarning() {
    if (!this.state.isVerified) {
      alert('Favor de ingresar una cuenta ya registrada.');
    }
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.input2}
          placeholder={'Email'}
          placeHolderTextColor="black"
          onChangeText={text => {
            this.setState({email: text});
          }}
          autoCapitalize="none"
          returnKeyType="done"
        />

        <View style={styles.btnRegV}>
          <TouchableOpacity
            onPress={() => this.verifyEmail()}
            style={styles.btn}>
            <Text style={[styles.btnTxt]}>Verifica tu Email!</Text>
          </TouchableOpacity>
        </View>
      </View>
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
});
