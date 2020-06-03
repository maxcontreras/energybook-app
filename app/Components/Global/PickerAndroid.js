import React, {Component} from 'react';
import {View, Text, Picker, StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../Assets/constants';

export default class PickerAndroid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.Picker]}>
        <Picker
          style={[styles.insidePicker]}
          selectedValue={this.props.selectedValue}
          onValueChange={(itemValue, itemIndex) =>
            this.props.function(itemValue)
          }>
          {this.props.pickerItems.map((item, index) => (
            <Picker.Item label={item} value={item} key={index} />
          ))}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Picker: {
    height: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#737373',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.min(screenWidth, screenHeight) / 2.5,
  },
  unselectedButtonText: {
    color: 'black',
    fontSize: 10,
  },
  insidePicker: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.min(screenWidth, screenHeight) / 2.3,
  },
});
