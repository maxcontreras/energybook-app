/* @flow */

import React, {Component, PropTypes} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import {screenHeight, screenWidth, isPortrait} from '../../Assets/constants';
import AsyncStorage from '@react-native-community/async-storage';
import {
  VerifiedInput,
  NotVerifiedInput,
  TextIndications,
  BackGround,
} from '../../Components/PasswordChange/index';

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      inCaseKey: '',
      email: '',
      emails: [],
      isVerified: false,
      values: '',
      userIdforPass: '',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  UNSAFE_componentWillMount() {
    this._retrieveData();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  static navigationOptions = {
    header: null,
  };

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

  setEmailValues(verified, email, id) {
    this.setState({
      isVerified: verified,
      userIdforPass: id,
      email: email,
    });
  }

  Iniciar() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          <View
            style={[
              styles.container,
              {
                height:
                  this.state.orientation == 'portrait' ? screenHeight : 'auto',
              },
            ]}>
            <BackGround />
            <View style={styles.dataPart}>
              <TextIndications number={!this.state.isVerified ? '1' : '2'} />
              {!this.state.isVerified && (
                <NotVerifiedInput sendEmail={this.setEmailValues.bind(this)} />
              )}
              {this.state.isVerified && (
                <View>
                  <VerifiedInput
                    values={this.state.values}
                    userId={this.state.userIdforPass}
                    navigation={this.props.navigation}
                  />
                </View>
              )}
            </View>
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
  dataPart: {
    backgroundColor: 'white',
    flex: 1,
    height: '100%',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btn2: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
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
});
export default PasswordChange;
