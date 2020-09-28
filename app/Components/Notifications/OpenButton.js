//OVERLAY FOR NOTIFICATIONS
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Eye} from '../../Assets/Svg/Design/index';
import {Overlay} from 'react-native-elements';
import Logo from '../../Assets/Images/LogoObs.png';
import {ScrollView} from 'react-native-gesture-handler';

export default class OpenButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: false,
    };
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            this.setState({overlay: true});
          }}>
          <Eye />
        </TouchableOpacity>
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={this.state.overlay}
          onBackdropPress={() => {
            this.setState({overlay: false});
          }}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.topOverlay}>
              <Text>{this.props.intervalo}</Text>
              <Image source={Logo} style={{width: 50, height: 50}} />
            </View>
            <View style={styles.allDevices}>
              <Text style={styles.title}>Dispositivos</Text>
              <View style={styles.devices}>
                {this.props.devices.map((device, index) => (
                  <Text style={styles.deviceTxt} key={index}>
                    {device}
                  </Text>
                ))}
              </View>

              <Text style={styles.title}>Servicios</Text>
              <View style={styles.services}>
                {this.props.services.map((service, index) => (
                  <Text style={styles.deviceTxt} key={index}>
                    {service}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.viewButton}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({overlay: false});
                }}
                style={styles.button}>
                <Text style={styles.btnText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Overlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    height: 300,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  button: {
    height: 'auto',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 'auto',
    backgroundColor: '#586365',
  },
  viewButton: {
    height: 'auto',
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#DBDBDB',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  services: {
    height: 'auto',
    width: '100%',
  },
  devices: {
    height: 'auto',
    width: '100%',
  },
  topOverlay: {
    height: 'auto',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  allDevices: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  btnText: {color: 'white', fontSize: 12},
  deviceTxt: {padding: 5, fontSize: 12},
  title: {fontSize: 15, padding: 5},
});
