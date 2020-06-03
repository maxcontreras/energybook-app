import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {CSButtons} from '../../Components/Global/index';
import FilterPicker from '../../Components/Pickers/FilterPicker';
import {
  isPortrait,
  filtersCharts,
  stepsCharts,
  screenWidth,
  screenHeight,
} from '../../Assets/constants';

const buttons = [
  {caption: 'Consumo', filter: 'EPimp'},
  {caption: 'Demanda', filter: 'DP'},
];

export default class TopView2 extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        numSteps: this.props.numSteps,
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  setFilter(value, texto) {
    var steps = this.state.numSteps;
    if (value == 'Calendario' || texto == 'Calendario') {
      var filtro = -1;
      steps = this.state.numSteps;
    } else if (value == 'Hoy' || texto == 'Hoy') {
      var filtro = 0;
      for (var i in stepsCharts) {
        if (this.props.interval == stepsCharts[i].interval) {
          steps = stepsCharts[i].steps1;
        }
      }
    } else if (value == 'Ayer' || texto == 'Ayer') {
      var filtro = 1;
      for (var i in stepsCharts) {
        if (this.props.interval == stepsCharts[i].interval) {
          steps = stepsCharts[i].steps1;
        }
      }
    } else if (value == 'Esta semana' || texto == 'Esta semana') {
      var filtro = 2;
      for (var i in stepsCharts) {
        if (this.props.interval == stepsCharts[i].interval) {
          steps = stepsCharts[i].steps2;
        }
      }
    } else if (value == 'Este mes' || texto == 'Este mes') {
      var filtro = 3;
      for (var i in stepsCharts) {
        if (this.props.interval == stepsCharts[i].interval) {
          steps = stepsCharts[i].steps2;
        }
      }
    }
    console.log('AQUI TOPVIEW2');
    console.log(texto);

    this.props.functionFilter(
      filtro,
      null,
      filtro == -1 ? true : false,
      texto,
      steps,
    );
  }

  render() {
    return (
      <View style={styles.topView2}>
        <View style={[styles.variableButtons]}>
          {buttons.map((boton, index) => (
            <CSButtons
              key={index}
              setFunction={this.props.functionVariable}
              texto={boton.caption}
              selected={this.props.selectedVar}
              filter={boton.filter}
              width={Math.min(screenWidth, screenHeight) / 5}
              marginRight={5}
            />
          ))}
        </View>
        <View style={styles.filterOptions}>
          {this.state.orientation == 'portrait' && (
            <FilterPicker
              function={this.setFilter.bind(this)}
              selectedValue={this.props.selectedFilter}
              screen={'charts'}
            />
          )}
          {this.state.orientation == 'landscape' && (
            <View style={{flex: 1, flexDirection: 'row'}}>
              {filtersCharts.map((boton, index) => (
                <CSButtons
                  key={index}
                  setFunction={
                    boton.titulo == 'Calendario'
                      ? this.props.functionCalendar
                      : this.setFilter.bind(this)
                  }
                  texto={boton.titulo}
                  selected={this.props.selectedFilter}
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
  topView2: {
    height: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  variableButtons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: Math.min(screenWidth, screenHeight) / 2.5,
  },
  filterOptions: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
