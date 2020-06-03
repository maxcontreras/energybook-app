import React, {Component} from 'react';
import {StyleSheet, Dimensions, Platform, View} from 'react-native';
import {isPortrait, screenHeight, screenWidth} from '../../Assets/constants';
import {CSButtons} from '../../Components/Global/index';
export default class FiltersView extends Component {
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
      <View style={styles.optionButtonsView}>
        {this.props.data.map((boton, index) => (
          <CSButtons
            key={index}
            setFunction={
              boton.titulo == 'Calendario'
                ? this.props.Calendario
                : this.setFilter.bind(this)
            }
            texto={boton.titulo}
            selected={this.props.filter}
            filter={boton.filter}
            width={Math.min(screenWidth, screenHeight) / 5}
            marginLeft={5}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  optionButtonsView: {
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    padding: 10,
    width: null,
    flex: 1.5,
  },
});
