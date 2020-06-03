import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class TopInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.infoContainer2}>
        <View style={[styles.infoSeccion, {flex: 0.5}]}>
          <Text style={{fontSize: 15}}>{this.props.number}</Text>
        </View>
        <View style={styles.infoSeccion}>
          <Text style={{fontSize: 15, textAlign: 'justify'}}>
            {this.props.description}
          </Text>
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
