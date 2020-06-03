import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native';
import {connect} from 'react-redux';
import {Card} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {cardData} from './data';
const mapStateToProps = state => ({
  readings: state.dailyReducer,
  meterId: state.dailyReducer.meterId,
  prices: state.costReducer,
});

class RecordCard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    this.state = {
      url: '',
      monthlyTCC: '',
      values: [],
      data: [],
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  UNSAFE_componentWillMount() {
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        this.setState(
          {
            values: JSON.parse(value),
          },
          () => {
            this.setValues();
          },
        );
      }
    } catch (error) {}
  };

  setValues() {
    this.setState({
      data: cardData(
        this.props.prices,
        this.props.cardData,
        this.props.consumptionPrice,
      ),
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  render() {
    return (
      <View style={styles.container}>
        <Card
          containerStyle={[
            styles.containerCard,
            {width: Math.min(screenWidth, screenHeight) - 20},
          ]}
          wrapperStyle={styles.wrapper}>
          <View style={styles.innerCard}>
            {this.state.data.map((datos, index) => (
              <View key={index} style={styles.parte}>
                <View style={styles.iconView}>
                  <datos.Icono style={styles.icon} />
                </View>
                <View style={styles.datos}>
                  <Text style={styles.titulo}>{datos.title}</Text>
                  <Text style={styles.texto}>{datos.reading}</Text>
                </View>
                <View style={styles.datoView}>
                  <Text style={styles.texto}>{datos.price}</Text>
                </View>
              </View>
            ))}
          </View>
        </Card>
      </View>
    );
  }
}

export default connect(mapStateToProps)(RecordCard);

var screenHeight = Math.round(Dimensions.get('window').height);
var screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parte: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    height: 30,
    flexDirection: 'row',
  },
  icon: {
    width: 35,
    height: 35,
  },
  iconView: {
    flex: 1,
    alignItems: 'center',
  },
  datos: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 30,
  },
  titulo: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 12,
  },
  datoView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    height: 30,
  },
  containerCard: {
    flex: 1,
    height: 280,
    padding: 0,
    margin: 20,
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
  innerCard: {
    alignItems: 'center',
    height: 280,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
  },
  wrapper: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
