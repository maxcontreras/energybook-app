import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Badge, Icon, withBadge} from 'react-native-elements';

export default class TextIndications extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const text =
      this.props.number == '1'
        ? 'Ingresa tu correo electrónico.'
        : 'Cambia tu contraseña!';
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.data}>
            Una contraseña segura contribuye a evitar el acceso no autorizado a
            la cuenta de correo electrónico.
          </Text>
        </View>
        <View style={styles.dataView}>
          <Badge
            badgeStyle={{
              backgroundColor: '#aaf70e',
              borderWidth: 0.5,
              margin: 10,
              borderColor: 'lightgrey',
            }}
            textStyle={{color: 'black'}}
            value={this.props.number}
          />
          <Text style={styles.data}>{text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  data: {
    color: '#000000',
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dataView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
  },
  numText: {
    borderRadius: 50,
    borderWidth: 1,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    alignSelf: 'flex-start',
  },
  number: {
    color: 'black',
    fontSize: 9,
    textAlign: 'center',
  },
  container: {
    width: '100%',
    flexDirection: 'column',
  },
});
