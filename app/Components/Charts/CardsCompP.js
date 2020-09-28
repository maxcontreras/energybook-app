//PORTRAIT VIEW FOR BOTTOM CARDS IN CHARTS

import React, {Component} from 'react';
import {View, Text, Dimensions, Platform, StyleSheet} from 'react-native';
import Swiper from 'react-native-web-swiper';
import {Card} from 'react-native-elements';
import {Maximum, Minimum, Average} from '../../Assets/Svg/Design/index';
import 'moment/min/moment-with-locales';
import {
  isPortrait,
  screenHeight,
  screenWidth,
  getFontSize,
  EffSwiperOptions,
} from '../../Assets/constants';
const fontSize = getFontSize('small');
export default class CardsCompP extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      data: [],
      date: ' ',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  UNSAFE_componentWillMount() {}

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  aver() {
    return false;
  }
  render() {
    var datillos = [
      {
        title: 'Máximo',
        value: this.props.data.maxValue,
        Icon: Maximum,
        date: this.props.data.date ? this.props.data.date : this.state.date,
      },
      {
        title: 'Mínimo',
        value: this.props.data.minValue,
        Icon: Minimum,
        date: this.props.data.date ? this.props.data.date : this.state.date,
      },
      {
        title: 'Promedio',
        value: this.props.data.average,
        Icon: Average,
        date: this.props.data.date ? this.props.data.date : this.state.date,
      },
    ];
    return (
      <View style={styles.container}>
        {this.props.data && (
          <Swiper gesturesEnabled={this.aver} controlsProps={EffSwiperOptions}>
            {datillos.map((datos, index) => (
              <Card
                key={index}
                title={datos.date}
                containerStyle={[
                  styles.containerCard,
                  {width: Math.min(screenWidth, screenHeight) - 20},
                ]}
                titleStyle={styles.titleStyle}
                wrapperStyle={{borderRadius: 10, height: '100%'}}>
                <View style={styles.innerCard}>
                  <View style={[styles.dataPart, {flex: 0.75}]}>
                    <datos.Icon />
                  </View>
                  <View style={styles.dataPart}>
                    <Text style={{fontSize: fontSize.title}}>
                      {datos.title}
                    </Text>
                  </View>
                  <View style={styles.dataPart}>
                    <Text style={{fontSize: fontSize.title}}>
                      {datos.value} {this.props.data.cardVariable}
                    </Text>
                  </View>
                </View>
              </Card>
            ))}
          </Swiper>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 155,
  },
  titleStyle: {
    color: 'black',
    fontWeight: 'normal',
    margin: 10,
    textAlign: 'right',
    height: 'auto',
    justifyContent: 'center',
    fontSize: fontSize.normal,
  },
  containerCard: {
    height: 110,
    margin: 5,
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
  innerCard: {flex: 1, flexDirection: 'row'},
  dataPart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 40,
  },
});
