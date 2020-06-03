import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    height: 'auto',
    width: '100%',
    backgroundColor: '#485658',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
  },
  headerText: {color: '#aaf70e', letterSpacing: 1},
});
