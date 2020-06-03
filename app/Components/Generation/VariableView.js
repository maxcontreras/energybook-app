import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, Platform} from 'react-native';
import {
  variablesGene,
  isPortrait,
  screenHeight,
  screenWidth,
} from '../../Assets/constants';
import {CSButtons} from '../../Components/Global/index';
export default class VariableView extends Component {
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
  render() {
    return (
      <View
        style={[
          this.state.orientation == 'portrait'
            ? styles.variableP
            : styles.variableL,
        ]}>
        {variablesGene.map((boton, index) => (
          <CSButtons
            key={index}
            setFunction={this.props.functionVariable}
            texto={boton.titulo}
            selected={this.props.caption}
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
  variableP: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 0,
    justifyContent: 'space-between',
  },
  variableL: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
