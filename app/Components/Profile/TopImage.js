import React, {Component} from 'react';
import {View, Text, Image, ImageBackground, StyleSheet} from 'react-native';
import ProfilePic from '../../Assets/Images/temporayProfile.png';
import profileBack from '../../Assets/Images/profileBack.jpg';

export default class TopImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ImageBackground style={styles.userView} source={profileBack}>
        <Image style={styles.logo} source={ProfilePic} />
        <Text style={styles.text}>
          {this.props.name + ' ' + this.props.lastname}
        </Text>
        <Text style={styles.company}>{this.props.company}</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  userView: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  text: {color: 'white', fontSize: 20, fontWeight: 'bold'},
  company: {color: 'white', fontSize: 15},
});
