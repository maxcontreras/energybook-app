import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {CSButtons} from '../../Components/Global/index';
import VariablePicker from '../../Components/Pickers/VariablePicker';
import {
  isPortrait,
  variablesNC,
  screenHeight,
  screenWidth,
} from '../../Assets/constants';

export default class VariableView extends Component {
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

  setVariabe(value, texto) {
    console.log('TEXTO');
    console.log(texto);

    let vari = '';
    if (texto == 'Voltaje') {
      vari = 'V';
    } else if (texto == 'Amperaje' || texto == 'THD') {
      vari = 'A';
    } else if (texto == 'Desbalance' || texto == 'FP') {
      vari = '%';
    } else if (texto == 'kVA') {
      vari = 'kVA';
    }
    this.props.functionVariable(value, texto, vari);
  }

  render() {
    return (
      <View>
        {this.state.orientation == 'landscape' && (
          <View style={[styles.variableView]}>
            {variablesNC.map((boton, index) => (
              <CSButtons
                key={index}
                setFunction={this.setVariabe.bind(this)}
                texto={boton.titulo}
                selected={this.props.caption}
                filter={boton.filter}
                width={Math.min(screenWidth, screenHeight) / 5.5}
                marginLeft={5}
              />
            ))}
          </View>
        )}
        {this.state.orientation == 'portrait' && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <VariablePicker
              function={this.setVariabe.bind(this)}
              selectedValue={this.props.caption}
            />
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
});
