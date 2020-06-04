import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
export default class DayInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputProduccion: 0,
      valorProduccion: this.props.valueDayProd
        ? this.props.valueDayProd.toString()
        : '0',
    };
  }
  render() {
    return (
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          keyboardType={'numeric'}
          editable={this.props.type == 'mensual' ? false : true}
          onChangeText={text => this.props.changeInput(text)}
          placeholder={this.state.valorProduccion}
          value={this.state.inputProduccion}
        />
        <Text>tnl</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    padding: 10,
    height: 40,
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#F1F2F4',
    marginRight: 10,
  },
});
