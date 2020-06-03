/* @flow */

import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class FirstScreen extends Component {
  constructor() {
    super();
    this.loadNavigate();
  }

  loadNavigate = async () => {
    const userToken = await AsyncStorage.getItem('@MySuperStore:key');
    setTimeout(() => {
      this.props.navigation.navigate(userToken ? 'BottomTab' : 'Home');
    }, 1500);
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../Assets/Images/logoApp2.gif')}
          style={styles.gif}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {width: '100%', height: '100%'},
});
