//DEVICE PICKER FOR ALL SCREENS
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
