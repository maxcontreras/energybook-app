import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class DevicesOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.allDevices}>
        <Text style={styles.title}>{this.props.title}</Text>
        <View style={styles.devices}>
          {this.props.devices.map((device, index) => (
            <Text style={styles.deviceTxt} key={index}>
              {device}
            </Text>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  allDevices: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  devices: {
    height: 'auto',
    width: '100%',
    paddingBottom: 20,
  },
  deviceTxt: {padding: 5, fontSize: 12},
});
