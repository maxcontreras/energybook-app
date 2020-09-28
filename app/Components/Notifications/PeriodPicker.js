import React, {Component} from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
import {PickerIos, PickerAndroid} from '../../Components/Global/index';
const opciones = [
  'Mostrar todas',
  'Consumo',
  'Demanda',
  'Costos',
  'Generación',
  'Desconexión de equipos',
  'Código de red',
  'Cambio de horario',
];

const adminOptions = ['Desconexión de equipos'];

export default class PeriodPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS == 'ios' && (
          <PickerIos
            selectedValue={this.props.selected}
            function={this.props.change}
            pickerArrayIos={
              this.props.role == 1
                ? adminOptions.concat('Cancelar')
                : opciones.concat('Cancelar')
            }
          />
        )}
        {Platform.OS == 'android' && (
          <PickerAndroid
            function={this.props.change}
            selectedValue={this.props.selected}
            pickerItems={this.props.role == 1 ? adminOptions : opciones}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
