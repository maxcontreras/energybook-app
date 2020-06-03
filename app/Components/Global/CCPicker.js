import React, {Component} from 'react';
import {View, Dimensions, Platform} from 'react-native';
import {connect} from 'react-redux';
import {PickerIos, PickerAndroid} from './index';
const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
});

class CCPicker extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    this.state = {
      numberOfServices: this.props.readings.numberOfServices,
      arrayNameDevices: [],
      arrayDescriptionDevices: [],
      numberOfServices: this.props.readings.numberOfServices,
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  UNSAFE_componentWillMount() {
    var arrayNameDevices = [];
    var arrayDescriptionDevices = [];
    for (var j = 1; j < this.props.readings.devices.length; j++) {
      arrayNameDevices[j - 1] = this.props.readings.devices[j].name;
      arrayDescriptionDevices[j - 1] = this.props.readings.devices[
        j
      ].description;
    }
    this.setState({
      arrayNameDevices: arrayNameDevices,
      arrayDescriptionDevices: arrayDescriptionDevices,
    });
  }

  render() {
    if (this.props.readings) {
      var arrayOfServices = [];
      var devices = [];
      for (j = 1; j < this.props.readings.devices.length; j++) {
        devices[j - 1] = this.props.readings.devices[j].description;
      }
      for (j = 0; j < this.state.numberOfServices; j++) {
        arrayOfServices[j] = `Servicio ${j + 1}`;
      }
      var pickerArrayIos =
        this.props.type == 'services'
          ? arrayOfServices.concat('Cancelar')
          : this.props.type == 'all'
          ? arrayOfServices.concat(devices).concat('Cancelar')
          : devices.concat('Cancelar');
      var pickerArrayAndroid =
        this.props.type == 'services'
          ? arrayOfServices
          : this.props.type == 'all'
          ? arrayOfServices.concat(devices)
          : devices;
    }
    var pickerItems = pickerArrayAndroid;
    return (
      <View>
        {Platform.OS == 'ios' && (
          <PickerIos
            selectedValue={this.props.selectedValue}
            function={this.props.function}
            pickerArrayIos={pickerArrayIos}
          />
        )}
        {Platform.OS == 'android' && (
          <PickerAndroid
            function={this.props.function}
            selectedValue={this.props.selectedValue}
            pickerItems={pickerItems}
          />
        )}
      </View>
    );
  }
}

export default connect(mapStateToProps)(CCPicker);
