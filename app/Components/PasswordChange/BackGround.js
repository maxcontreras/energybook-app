import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import RegistroFondo2 from '../../Assets/Images/RegistroFondoLS.jpg';
import RegistroFondo from '../../Assets/Images/RegistroFondo.jpg';
import LogoCl from '../../Assets/Images/LogoCl.png';

export default class BackGround extends Component {
  constructor(props) {
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    super(props);
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  render() {
    return (
      <ImageBackground
        style={[styles.background]}
        source={
          this.state.orientation == 'portrait' ? RegistroFondo : RegistroFondo2
        }>
        <Image style={styles.logo} source={LogoCl} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 0.3,
    height: 'auto',
    alignItems: 'flex-end',
    padding: 50,
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    backgroundColor: 'transparent',
  },
});
