//PORTRAIT VIEW FOR BOTTOM CARDS IN CARBON FOOTPRINT
import Swiper from 'react-native-web-swiper';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Card} from 'react-native-elements';
import {
  n,
  date,
  mes,
  screenHeight,
  EffSwiperOptions,
  screenWidth,
  getFontSize,
  isPortrait,
} from '../../Assets/constants';
import {cardData} from '../../Assets/Functions/carbon';
let fontSize = getFontSize('small');
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

  lockSwiperGestures() {
    return false;
  }
  render() {
    var Fecha = date + ' ' + n + ' ' + 'de' + ' ' + mes;
    //Returns formatted array of data
    let values = cardData(this.props.response);
    return (
      <View style={styles.container}>
        {values && (
          <Swiper
            gesturesEnabled={this.lockSwiperGestures}
            controlsProps={EffSwiperOptions}>
            {values.map((datos, index) => (
              <Card
                key={index}
                title={Fecha}
                containerStyle={[styles.containerCard]}
                titleStyle={[styles.titleStyle]}
                wrapperStyle={{borderRadius: 10, height: '100%'}}>
                <View style={styles.innerCard}>
                  <View style={{flex: 1}}>
                    {datos.data.map((values, index) => (
                      <View key={index} style={styles.rowView}>
                        <View style={styles.iconView}>
                          <values.Icon style={styles.icon} />
                        </View>
                        <View style={styles.titleView}>
                          <Text style={styles.text}>{values.title}</Text>
                        </View>
                        <View style={styles.valueView}>
                          <Text style={styles.text}>
                            {values.value} {values.unidad}
                          </Text>
                        </View>
                      </View>
                    ))}
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
  cards: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 220,
    flexDirection: 'row',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  iconView: {
    flex: 0.5,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  titleView: {
    flex: 2,
    justifyContent: 'center',
  },
  valueView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  text: {fontSize: fontSize.normal},
  container: {
    height: 250,
    width: '100%',
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
    width: Math.min(screenWidth, screenHeight) - 20,
    height: 200,
    alignSelf: 'center',
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
  icon: {
    width: 35,
    height: 35,
  },
});
