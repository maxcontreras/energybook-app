import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default class Load extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../Assets/Images/loading.gif')}
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
    width: '100%',
    height: 'auto',
  },
  gif: {width: 70, height: 70},
});
