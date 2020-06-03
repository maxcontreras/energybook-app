import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, Platform} from 'react-native';
import {isPortrait} from '../../Assets/constants';
import {CCPicker} from '../../Components/Global/index';
import FilterPicker from '../../Components/Pickers/FilterPicker';
import {dataGeneration} from '../../Assets/constants';

export default class PickersView extends Component {
  constructor(props) {
    isPortrait();
    super(props);
    this.state = {
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
      arrayNameDevices[j - 1] = this.props.devices[j].name;
      arrayDescriptionDevices[j - 1] = this.props.devices[j].description;
    }
    this.setState(
      {
        pickerValue: itemValue,
      },
      () => {
        if (this.props.selectedDevice.substr(0, 8) !== 'Servicio') {
          var getIndex = arrayDescriptionDevices.indexOf(itemValue);
          this.props.functionDevice(
            itemValue,
            arrayNameDevices[getIndex],
            true,
            false,
            '',
            arrayNameDevices[getIndex],
          );
        } else {
          this.props.functionDevice(
            itemValue,
            this.props.selectedDevice,
            false,
            true,
            this.props.selectedDevice,
            '',
          );
        }
      },
    );
  }
  setFilter(value, texto) {
    var steps = this.props.numSteps;
    for (var i in dataGeneration) {
      if (
        value == dataGeneration[i].filterS ||
        texto == dataGeneration[i].filterS
      ) {
        var filtro = dataGeneration[i].filter;
        steps = dataGeneration[i].steps;
      }
    }
    this.props.functionFilter(
      filtro,
      {from: null, until: null},
      filtro == -1 ? true : false,
      texto,
      steps,
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <CCPicker
          function={this.setDevice.bind(this)}
          selectedValue={this.props.selectedDevice}
          type={'all'}
        />
        {this.state.orientation == 'portrait' && (
          <FilterPicker
            function={this.setFilter.bind(this)}
            selectedValue={this.props.selectedFilter}
            screen={'gene'}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
