import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import {screenHeight, screenWidth, getFontSize} from '../../Assets/constants';
import {cardData} from './Data';
let fontSize = getFontSize('small');

export default class CardsCompL extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let values = cardData(this.props.response);
    return (
      <View style={styles.container}>
        {values.map((datos, index) => (
          <Card
            key={index}
            title={datos.fecha}
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
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
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
    width: Math.max(screenWidth, screenHeight) / 3.5,
    height: null,
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
  icon: {
    width: 35,
    height: 35,
  },
});
