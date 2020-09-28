//NETWORK CODE PICKER
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Picker,
  Platform,
  ActionSheetIOS,
} from 'react-native';
import {connect} from 'react-redux';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
});

class PickerAndroid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfServices: this.props.readings.numberOfServices,
      arrayNameDevices: [],
      arrayDescriptionDevices: [],
    };
  }

  componentWillMount() {
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
      var devices = [];
      for (j = 1; j < this.props.readings.devices.length; j++) {
        devices[j - 1] = this.props.readings.devices[j].description;
      }
      var pickerArrayIos = devices.concat('Cancelar');
      var pickerArrayAndroid = devices;
      let counter = 0;
    }
    var pickerItems = pickerArrayAndroid;
    let nextKey = 0;
    return (
      <View>
        {Platform.OS == 'ios' && (
          <View>
            <TouchableOpacity
              onPress={() =>
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
                )
              }
              style={[
                styles.PickerIos,
                screenWidth < screenHeight ? styles.width : styles.height,
              ]}>
              <Text style={[styles.unselectedButtonText]}>
                {this.props.selectedValue}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {Platform.OS == 'android' && (
          <View
            style={[
              styles.Picker,
              screenWidth < screenHeight ? styles.width : styles.height,
            ]}>
            <Picker
              style={[
                styles.insidePicker,
                screenWidth < screenHeight ? styles.width : styles.height,
              ]}
              selectedValue={this.props.selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                this.props.function(itemValue, itemIndex)
              }>
              {pickerItems.map(item => (
                <Picker.Item label={item} value={item} key={nextKey++} />
              ))}
            </Picker>
          </View>
        )}
      </View>
    );
  }
}

export default connect(mapStateToProps)(PickerAndroid);

const styles = StyleSheet.create({
  Picker: {
    height: 30,
    width: screenHeight / 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#737373',
    borderRadius: 20,
  },
  PickerIos: {
    borderWidth: 1,
    borderColor: '#737373',
    borderRadius: 20,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
  },
  unselectedButtonText: {
    color: 'black',
    fontSize: 10,
  },

  width: {
    width: screenHeight / 4,
  },
  height: {
    width: screenWidth / 4,
  },
  insidePicker: {
    height: 30,
    fontSize: 10,
  },
});
