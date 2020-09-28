//VIEW FOR DEVICE PICKER AND INTERVAL PICKER (PORTRAIT)
// VIEW FOR DEVICE PICKER AND INTERVAL BUTTONS (LANDSCAPE)
import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {
  isPortrait,
  intervalsCharts,
  screenHeight,
  screenWidth,
} from '../../Assets/constants';
import {CCPicker, CSButtons} from '../../Components/Global/index';
import IntervalPicker from '../../Components/Pickers/IntervalPicker';

export default class TopView1 extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      numSteps: '4',
      pickerValue: this.props.selectedService,
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
        if (this.props.selectedService.substr(0, 8) !== 'Servicio') {
          //takes the index in device description array
          var getIndex = arrayDescriptionDevices.indexOf(itemValue);
          //sends the name of the device matching the description
          this.props.functionDevice(itemValue, '', arrayNameDevices[getIndex]);
        } else {
          this.props.functionDevice(itemValue, this.props.selectedService, '');
        }
      },
    );
  }

  setInterval(value, texto) {
    var steps = this.state.numSteps;
    //Array of the number of steps for the labels inside the chart per filter
    var numSteps = [
      {
        filter: -1,
        min5: this.state.steps,
        min15: this.state.steps,
        min30: this.state.steps,
        hr: this.state.steps,
      },
      {filter: 0, min5: '12', min15: '4', min30: '2', hr: '1'},
      {filter: 1, min5: '12', min15: '4', min30: '2', hr: '1'},
      {filter: 2, min5: '288', min15: '96', min30: '48', hr: '24'},
      {filter: 3, min5: '288', min15: '96', min30: '48', hr: '24'},
    ];
    if (value == '15 minutos' || texto == '15 minutos') {
      //interval in seconds for 15 minutes
      var intervalo = 900;
      for (var i in numSteps) {
        if (this.props.filter == numSteps[i].filter) {
          steps = numSteps[i].min15;
        }
      }
    } else if (value == '30 minutos' || texto == '30 minutos') {
      //interval in seconds for 30 minutes
      var intervalo = 1800;
      for (var i in numSteps) {
        if (this.props.filter == numSteps[i].filter) {
          steps = numSteps[i].min30;
        }
      }
    } else if (value == '1 hora' || texto == '1 hora') {
      //interval in seconds for 1 hour
      var intervalo = 3600;
      for (var i in numSteps) {
        if (this.props.filter == numSteps[i].filter) {
          steps = numSteps[i].hr;
        }
      }
    } else if (value == '5 minutos' || texto == '5 minutos') {
      //interval in seconds for 5 minutes
      var intervalo = 300;
      for (var i in numSteps) {
        if (this.props.filter == numSteps[i].filter) {
          steps = numSteps[i].min5;
        }
      }
    }
    this.props.setIntervals(intervalo, texto, steps);
  }

  render() {
    return (
      <View style={styles.topView1}>
        <View style={{flex: 1}}>
          <CCPicker
            function={this.setDevice.bind(this)}
            selectedValue={this.props.selectedService}
            type={'all'}
          />
        </View>
        <View style={styles.outsideTB}>
          {this.state.orientation == 'portrait' &&
            this.props.selectedVar == 'Consumo' && (
              <IntervalPicker
                function={this.setInterval.bind(this)}
                selectedValue={this.props.selectedInterval}
                screen={'charts'}
              />
            )}
          {this.state.orientation == 'landscape' && (
            <View style={styles.landscapeButtons}>
              {intervalsCharts.map((boton, index) => (
                <CSButtons
                  key={index}
                  setFunction={this.setInterval.bind(this)}
                  texto={boton.titulo}
                  selected={this.props.interval}
                  filter={boton.filter}
                  width={Math.min(screenWidth, screenHeight) / 5}
                  marginLeft={5}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topView1: {
    height: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  outsideTB: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  landscapeButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
