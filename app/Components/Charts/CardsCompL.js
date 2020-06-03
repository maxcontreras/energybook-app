import React, {Component} from 'react';
import {View, Text, Dimensions, Platform, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import {Maximum, Minimum, Average} from '../../Assets/Svg/Design/index';
import 'moment/min/moment-with-locales';
import {
  isPortrait,
  screenHeight,
  screenWidth,
  getFontSize,
} from '../../Assets/constants';
const fontSize = getFontSize('small');

export default class CardsCompL extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      data: [],
      maxValue: 0,
      minValue: 0,
      date: ' ',
      average: 0,
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

  render() {
    const datillos = [
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
        {datillos.map((datos, index) => (
          <Card
            key={index}
            title={datos.date}
            containerStyle={[styles.containerCard]}
            titleStyle={[styles.titleStyle, {fontSize: fontSize.normal}]}
            wrapperStyle={{borderRadius: 10, height: '100%'}}>
            <View style={styles.innerCard}>
              <View style={[styles.dataPart, {flex: 0.75}]}>
                <datos.Icon />
              </View>
              <View style={styles.dataPart}>
                <Text style={{fontSize: fontSize.title}}>{datos.title}</Text>
              </View>
              <View style={[styles.dataPart, {flex: 1.5}]}>
                <Text style={{fontSize: fontSize.title}}>
                  {datos.value} {this.props.cardVariable}
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleStyle: {
    color: 'black',
    fontWeight: 'normal',
    margin: 10,
    textAlign: 'right',
    height: 'auto',
    justifyContent: 'center',
  },

  containerCard: {
    width: Math.max(screenWidth, screenHeight) / 3.5,
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
    height: 40,
  },
});
