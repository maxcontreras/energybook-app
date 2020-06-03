import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';
import {screenWidth, screenHeight} from '../../Assets/constants';
export default class PickerAndroid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let nextKey = 0;

    return (
      <View style={[styles.Picker]}>
        <Picker
          style={[styles.insidePicker]}
          selectedValue={this.props.selectedValue}
          onValueChange={(itemValue, itemIndex) =>
            this.props.function(itemValue, this.props.type)
          }>
          {this.props.filters.map(item => (
            <Picker.Item
              label={item}
              value={item}
              key={nextKey++}
              style={{fontSize: 10}}
            />
          ))}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  insidePicker: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.min(screenHeight, screenWidth) / 2,
  },
  Picker: {
    borderRadius: 10,
    marginBottom: 5,
    height: 40,
    backgroundColor: '#F2F4FA',
    paddingLeft: 10,
    width: Math.min(screenHeight, screenWidth) / 2,
  },
});
