import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {CSButtons} from '../../Components/Global/index';
import VariableView from '../../Components/Code/VariableView';
import {
  isPortrait,
  filtersNC,
  screenHeight,
  screenWidth,
} from '../../Assets/constants';

export default class TopView2 extends Component {
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
    var steps = this.props.numSteps;
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

  render() {
    return (
      <View
        style={[
          styles.variableView,
          {
            flex: this.state.orientation == 'landscape' ? 1 : null,
          },
        ]}>
        {this.state.orientation == 'portrait' && (
          <VariableView
            caption={this.props.caption}
            functionVariable={this.props.functionVariable}
          />
        )}
        {this.state.orientation == 'landscape' && (
          <View style={styles.optionButtonsView}>
            {filtersNC.map(boton => (
              <CSButtons
                setFunction={
                  boton.titulo == 'Calendario'
                    ? this.props.Calendario
                    : this.setFilter.bind(this)
                }
                texto={boton.titulo}
                selected={this.props.filter}
                filter={boton.filter}
                width={Math.min(screenWidth, screenHeight) / 5.5}
                marginLeft={5}
              />
            ))}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  variableView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButtonsView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
  },
});
