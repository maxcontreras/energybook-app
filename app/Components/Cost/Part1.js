//VIEW FOR DEVICE PICKER AND HOUR/DAY BUTTONS (PORTRAIT)
// VIEW FOR DEVICE PICKER ONLY (LANDSCAPE)
import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {CSButtons, CCPicker} from '../../Components/Global/index';
import {screenHeight, screenWidth, isPortrait} from '../../Assets/constants';
export default class Part1 extends Component {
  constructor(props) {
    isPortrait();
    super(props);
    this.state = {
      pickerValue: this.props.pickerValue,
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

  setDevice(itemValue) {
    var arrayDescriptionDevices = [];
    var arrayNameDevices = [];
    for (var j = 1; j < this.props.devices.length; j++) {
      // the first device in the array is not taken
      arrayNameDevices[j - 1] = this.props.devices[j].name;
      arrayDescriptionDevices[j - 1] = this.props.devices[j].description;
    }
    this.setState(
      {
        pickerValue: itemValue,
      },
      () => {
        if (this.props.pickerValue.substr(0, 8) !== 'Servicio') {
          //takes the index in device description array
          var getIndex = arrayDescriptionDevices.indexOf(itemValue);

          //sends the name of the device matching the description
          this.props.functionDevice(itemValue, '', arrayNameDevices[getIndex]);
        } else {
          this.props.functionDevice(itemValue, this.props.pickerValue, '');
        }
      },
    );
  }

  render() {
    return (
      <View
        style={[
          this.state.orientation == 'portrait'
            ? styles.pCalendarView
            : styles.lCalendarView,
        ]}>
        <CCPicker
          function={this.setDevice.bind(this)}
          selectedValue={this.props.pickerValue}
          type={'all'}
        />
        {this.state.orientation == 'portrait' && this.props.porDia && (
          <View
            style={[
              styles.timeButtons,
              {width: null, paddingBottom: 0, paddingRight: 0},
            ]}>
            <CSButtons
              setFunction={this.props.functionInterval}
              texto={'Cada hora'}
              selected={this.props.newInterval}
              filter={-1}
              width={Math.min(screenWidth, screenHeight) / 5.6}
              marginLeft={5}
            />
            <CSButtons
              setFunction={this.props.functionInterval}
              texto={'Cada día'}
              selected={this.props.newInterval}
              filter={0}
              width={Math.min(screenWidth, screenHeight) / 5.6}
              marginLeft={5}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pCalendarView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lCalendarView: {
    width: '100%',
    flexDirection: 'column',
    flex: 0.5,
  },
  timeButtons: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom: 10,
    paddingRight: 10,
    width: '100%',
    marginTop: 5,
  },
});
