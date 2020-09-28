// VIEW FOR DEVICE PICKER AND FILTER PICKER (PORTRAIT)
//VIEW FOR DEVICE PICKER ONLY (LANDSCAPE)
import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {CCPicker} from '../../Components/Global/index';
import FilterPicker from '../../Components/Pickers/FilterPicker';
import {isPortrait} from '../../Assets/constants';

export default class TopPickers extends Component {
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

  setFilter(value, texto) {
    // steps are for the number of labels inside the chart
    var steps = this.props.numSteps;
    //array of number of steps per filter
    var numSteps = [
      {interval: 300, steps1: '12', steps2: '288'},
      {interval: 900, steps1: '4', steps2: '96'},
      {interval: 1800, steps1: '2', steps2: '48'},
      {interval: 3600, steps1: '1', steps2: '24'},
    ];

    if (value == 'Calendario' || texto == 'Calendario') {
      var filtro = -1;
      steps = this.props.numSteps;
    } else if (value == 'Hoy' || texto == 'Hoy') {
      var filtro = 0;
      for (var i in numSteps) {
        if (this.props.interval == numSteps[i].interval) {
          steps = numSteps[i].steps1;
        }
      }
    } else if (value == 'Ayer' || texto == 'Ayer') {
      var filtro = 1;
      for (var i in numSteps) {
        if (this.props.interval == numSteps[i].interval) {
          steps = numSteps[i].steps1;
        }
      }
    } else if (value == 'Esta semana' || texto == 'Esta semana') {
      var filtro = 2;
      for (var i in numSteps) {
        if (this.props.interval == numSteps[i].interval) {
          steps = numSteps[i].steps2;
        }
      }
    }
    this.props.functionFilter(filtro, texto, steps);
  }

  setDevice(itemValue) {
    var arrayDescriptionDevices = [];
    var arrayNameDevices = [];
    for (var j = 1; j < this.props.devices.length; j++) {
      // the first device in the array is not taken
      arrayNameDevices[j - 1] = this.props.devices[j].name;
      arrayDescriptionDevices[j - 1] = this.props.devices[j].description;
    }
    //takes the index in device description array
    var getIndex = arrayDescriptionDevices.indexOf(itemValue);
    //sends the name of the device matching the description
    this.props.functionDevice(arrayNameDevices[getIndex], itemValue);
  }

  render() {
    return (
      <View style={styles.pickers}>
        <CCPicker
          function={this.setDevice.bind(this)}
          selectedValue={this.props.selectedService}
          type={'devices'}
        />

        {this.state.orientation == 'portrait' && (
          <FilterPicker
            function={this.props.functionFilter}
            selectedValue={this.props.selectedFilter}
            width={100}
            screen={'network'}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    flex: 1,
  },
});
