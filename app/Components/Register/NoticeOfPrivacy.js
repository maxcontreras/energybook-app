//BUTTON TO ACCEPT THE NOTICE OF PRIVACY
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class NoticeOfPrivacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aviso: true,
    };
  }

  sendAviso() {
    this.setState({checked: !this.state.checked}, () => {
      this.props.setAviso(this.state.aviso);
    });
  }

  render() {
    return (
      <View style={styles.checkView}>
        <TouchableOpacity
          onPress={() => this.sendAviso()}
          style={[styles.btn2]}>
          <Text style={[styles.btnTxt2]}>Acepto el aviso de privacidad</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkView: {
    flex: 2,
  },
  btn2: {
    height: 40,
    padding: 5,
    justifyContent: 'center',
  },
  btnTxt2: {
    color: '#000000',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
});
