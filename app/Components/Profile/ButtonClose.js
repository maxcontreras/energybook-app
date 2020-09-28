import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SesionS} from '../../Assets/Svg/Design/index';
import RNRestart from 'react-native-restart';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';

export default class ButtonClose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inCaseKey: '',
      values: [],
    };
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        this.setState({
          values: JSON.parse(value),
        });
      }
    } catch (error) {}
  };

  _signOutAsync = async () => {
    //deletes OneSignal tag to stop notifications from being sent to the user when logout
    OneSignal.getTags(receivedTags => {
      console.log(receivedTags);
    });
    OneSignal.deleteTag(this.state.values.company);
    this.setState(
      {
        inCaseKey: this.state.values.accesToken,
      },
      async () => {
        this.logOut();
        //clears all data storaged in app
        await AsyncStorage.clear();
        try {
          //saves "inCaseKey" so the user can be able to change its password when logout
          await AsyncStorage.setItem('inCaseKey', this.state.inCaseKey, () => {
            //restarts the app (it clears everything)
            RNRestart.Restart();
            //navigates home
            this.props.navigation.navigate('Home');
          });
        } catch (error) {}
      },
    );
  };

  logOut() {
    //logs out from the api
    fetch(
      `http://api.ienergybook.com/api/eUsers/logout?access_token=${
        this.state.values.accesToken
      }`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({accessToken: this.state.values.accesToken}),
      },
    )
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        console.log(json);
      })
      .catch(err => {
        console.log('no se pudo');
      });
  }

  render() {
    return (
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => this._signOutAsync()}
          style={styles.logoutButton}>
          <SesionS style={{width: 35, height: 35}} />
          <Text style={[styles.unselectedButtonText]}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  unselectedButtonText: {
    color: 'black',
    fontSize: 10,
    paddingHorizontal: 10,
    fontSize: 15,
  },
});
