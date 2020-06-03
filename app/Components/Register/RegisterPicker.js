import React, {Component} from 'react';
import {View, Text, Platform} from 'react-native';
import PickeriOS from './PickeriOS';
import PickerAndroid from './PickerAndroid';

class RegisterPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = [
      {
        type: 'giro',
        caption: this.props.businessCaption,
        title: 'Giro de tu empresa',
        FILTERS: [
          'Manufactura',
          'Automotríz',
          'Textil',
          'Metalúrgica',
          'Sidelúrgica',
          'Petroquímica',
          'Eléctrica',
          'Otro',
        ],
      },
      {
        type: 'size',
        caption: this.props.sizeCaption,
        title: 'Cuántas personas trabajan en tu empresa?',
        FILTERS: ['2-10', '11-50', '51-200', '201-1000'],
      },
    ];
    return (
      <View>
        {data.map((picker, index) => (
          <View key={index}>
            <Text style={{padding: 10}}>{picker.title}</Text>
            {Platform.OS == 'ios' && (
              <PickeriOS
                type={picker.type}
                selectedValue={picker.caption}
                function={this.props.function}
                filters={picker.FILTERS}
              />
            )}
            {Platform.OS == 'android' && (
              <PickerAndroid
                filters={picker.FILTERS}
                selectedValue={picker.caption}
                function={this.props.function}
                type={picker.type}
              />
            )}
          </View>
        ))}
      </View>
    );
  }
}

export default RegisterPicker;
