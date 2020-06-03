import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import {PickerIos, PickerAndroid} from './index';

export default class GlobalPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        {Platform.OS == 'ios' && (
          <PickerIos
            selectedValue={this.props.selectedValue}
            function={this.props.function}
            pickerArrayIos={this.props.array.concat('Cancelar')}
          />
        )}
        {Platform.OS == 'android' && (
          <PickerAndroid
            function={this.props.function}
            selectedValue={this.props.selectedValue}
            pickerItems={this.props.array}
          />
        )}
      </View>
    );
  }
}
