import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';

export default class BlueButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToLink(url) {
    Linking.openURL(url);
  }

  render() {
    return (
      <View style={styles.infoSeccion}>
        <TouchableOpacity
          style={styles.blueButton}
          onPress={() => this.goToLink(this.props.file)}>
          <Text style={styles.text}>VER PDF</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoSeccion: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    height: 'auto',
  },
  text: {color: '#FFFFFF', fontSize: 15},
  blueButton: {
    height: 35,
    width: 100,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3791F4',
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
