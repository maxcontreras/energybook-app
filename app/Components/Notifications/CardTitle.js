import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Logo from '../../Assets/Images/LogoObs.png';
import {getFontSize, screenHeight, screenWidth} from '../../Assets/constants';
let fontSize = getFontSize('mid');
export default class CardTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.notificationTopView}>
        <Text style={[styles.notificationTitle]}>
          {this.props.type} - {this.props.variable}
        </Text>
        <Image source={Logo} style={styles.logo} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  notificationTitle: {
    color: '#000000',
    fontWeight: 'bold',
    paddingBottom: 2.5,
    fontSize: fontSize.title,
  },
  notificationTopView: {
    flexDirection: 'row',
    width: Math.min(screenWidth, screenHeight) - 20,
    height: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  logo: {width: 50, height: 50},
});
