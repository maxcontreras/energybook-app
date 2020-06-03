import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {getFontSize, screenHeight, screenWidth} from '../../Assets/constants';
import {Card as CardElement} from 'react-native-elements';
import {CardTitle, DeleteButton} from './index';

let fontSize = getFontSize('mid');
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let device = this.props.device;
    return (
      <CardElement
        title={<CardTitle type={device.intervalo} variable={device.tipo} />}
        containerStyle={[styles.notificationView]}
        wrapperStyle={{borderRadius: 10, height: '100%'}}>
        <View style={[styles.notificationBotView]}>
          <View style={styles.description}>
            <Text style={styles.text2}>{device.Descripcion}</Text>
            <Text style={[styles.text2]}>{device.Fecha.substr(0, 10)}</Text>
          </View>
          <View style={styles.services}>
            {device.Servicios.map((mensaje, index) => (
              <Text key={index} style={styles.text1}>
                {mensaje}
              </Text>
            ))}
            <DeleteButton id={device.id} afterDelete={this.props.afterDelete} />
          </View>
        </View>
      </CardElement>
    );
  }
}
const styles = StyleSheet.create({
  notificationView: {
    width: Math.min(screenWidth, screenHeight) - 20,
    alignItems: 'flex-end',
    height: 160,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 0,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  text2: {
    fontSize: 10,
    fontStyle: 'italic',
    textAlignVertical: 'bottom',
    paddingHorizontal: 5,
    paddingVertical: 2.5,
  },
  notificationBotView: {
    flex: 1,
    width: Math.min(screenWidth, screenHeight) - 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  description: {
    flex: 1,
    width: Math.min(screenWidth, screenHeight) - 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  logo: {width: 50, height: 50},
  services: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  text1: {fontSize: fontSize.normal, paddingVertical: 2.5},
  titleStyle: {
    color: 'black',
    fontWeight: 'normal',
    margin: 10,
    textAlign: 'right',
    height: 'auto',
    justifyContent: 'center',
  },
});
