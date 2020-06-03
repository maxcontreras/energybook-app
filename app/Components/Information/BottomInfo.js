import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class BottomInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.infoContainer2}>
        <View style={[styles.infoSeccion, {height: 'auto'}]}>
          <Text style={{fontSize: 10}}>
            {`ULTIMA ACTUALIZACIÓN: ${this.props.date.substr(0, 10)}`}
          </Text>
        </View>

        <View style={[styles.infoSeccion, {flex: 0.7}]}>
          <Icon name="ios-checkmark-circle" size={30} color="#21900F" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoContainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
  infoSeccion: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
