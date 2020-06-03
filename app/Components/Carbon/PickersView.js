import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, Platform} from 'react-native';
import {isPortrait} from '../../Assets/constants';
import {CCPicker} from '../../Components/Global/index';
import FilterPicker from '../../Components/Pickers/FilterPicker';

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
    if (value == 'Calendario' || texto == 'Calendario') {
      var filtro = -1;
      steps = steps;
    } else if (value == 'Hoy' || texto == 'Hoy') {
      var filtro = 0;
      steps = '1';
    } else if (value == 'Ayer' || texto == 'Ayer') {
      var filtro = 1;
      steps = '1';
    } else if (value == 'Esta semana' || texto == 'Esta semana') {
      var filtro = 2;
      steps = '24';
    } else if (value == 'Este mes' || texto == 'Este mes') {
      var filtro = 3;
      steps = '24';
    } else if (value == 'Este año' || texto == 'Este año') {
      var filtro = 4;
      steps = '1';
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
      <View style={styles.calendarView}>
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
  calendarView: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
