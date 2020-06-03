import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActionSheetIOS,
  StyleSheet,
} from 'react-native';
import {screenHeight, screenWidth} from '../../Assets/constants';

export default class PickerIos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  iosFunction(pickerArrayIos) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: pickerArrayIos,
        cancelButtonIndex: pickerArrayIos.length - 1,
      },
      buttonIndex => {
        if (buttonIndex != pickerArrayIos.indexOf('Cancelar')) {
          this.props.function(pickerArrayIos[buttonIndex]);
        }
      },
    );
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.iosFunction(this.props.pickerArrayIos)}
          style={[styles.PickerIos]}>
          <Text style={[styles.unselectedButtonText]}>
            {this.props.selectedValue}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  PickerIos: {
    borderWidth: 1,
    borderColor: '#737373',
    borderRadius: 20,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.min(screenWidth, screenHeight) / 2.5,
  },
  unselectedButtonText: {
    color: 'black',
    fontSize: 10,
  },
});
