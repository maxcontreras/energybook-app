import React, {Component} from 'react';
import {StyleSheet, Dimensions, Platform, View} from 'react-native';
import {
  isPortrait,
  screenHeight,
  screenWidth,
  filtersGeneration,
  dataGeneration,
} from '../../Assets/constants';
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
      <View style={styles.optionButtonsView}>
        {filtersGeneration.map((boton, index) => (
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
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
  },
});
