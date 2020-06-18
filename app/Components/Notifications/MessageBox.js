import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {screenWidth, screenHeight} from '../../Assets/constants';

export default class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.noNotifications}>
        <Text style={{fontSize: 10, textAlign: 'center'}}>
          No hay notificaciones por el momento
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noNotifications: {
    flex: 1,
    height: 'auto',
    width: Math.min(screenWidth, screenHeight) - 20,
    margin: 10,
    borderRadius: 10,
    marginBottom: 0,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'white',
  },
});
