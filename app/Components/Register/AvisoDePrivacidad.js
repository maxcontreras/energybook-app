import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {privacyText} from '../../Assets/constants';

export default class AvisoDePrivacidad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aviso: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.innerView}>
            <Text style={styles.text1}>
              {
                <Text style={styles.text2}>
                  {' '}
                  Aviso de Privacidad para la Protección de Datos Personales.
                </Text>
              }
              {privacyText}
            </Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.function()}>
          <Text style={styles.btnTxt}>Entendido!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    backgroundColor: '#586365',
    margin: 10,
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
  text1: {textAlign: 'justify', fontSize: 15, color: 'black'},
  text2: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  innerView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#F6F5F5',
  },
});
