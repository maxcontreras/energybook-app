import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class TopTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.infoView}>
        <View style={styles.infoSign}>
          <Text style={{color: 'white', fontSize: 13}}>Información</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoView: {
    height: 70,
    backgroundColor: '#E8ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  infoSign: {
    height: 45,
    width: 95,
    backgroundColor: '#586365',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
