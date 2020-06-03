import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native';
import {connect} from 'react-redux';
import {Card} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getFontSize,
  getCardWidth,
  isPortrait,
  screenHeight,
  screenWidth,
} from '../../Assets/constants';
import {cfeValues} from './data';
const cardWidth = getCardWidth(2.2);
const fontSize = getFontSize('small');
const mapStateToProps = state => ({
  readings: state.dailyReducer,
  meterId: state.dailyReducer.meterId,
  prices: state.costReducer,
  adminIds: state.adminReducer,
});
class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      values: [],
      data: [],
      card: false,
    };
    Dimensions.addEventListener('change', () => {
      console.log(Dimensions.get('screen'));
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
    this._retrieveData();
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        this.setState({
          values: JSON.parse(value),
        });
      }
    } catch (error) {}
  };
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.prices.length != 0 && (
          <Card
            title={
              <View style={styles.titleContainer}>
                <Text style={{fontSize: fontSize.normal}}>
                  Precios CFE del periodo
                </Text>
              </View>
            }
            containerStyle={[
              styles.containerCard,
              this.state.orientation == 'portrait'
                ? {width: Math.min(screenWidth, screenHeight) - 20}
                : {width: cardWidth},
            ]}
            titleStyle={styles.titleStyle}
            wrapperStyle={{borderRadius: 10}}>
            <View style={styles.innerCard}>
              {cfeValues(this.state.values.tipoTarifa, this.props.prices).map(
                (datos, index) => (
                  <View key={index} style={{flex: datos.flex}}>
                    <View style={[styles.textPart]}>
                      <Text
                        style={[
                          {fontSize: fontSize.normal},
                          styles.titleWeight,
                        ]}>
                        {datos.title}
                      </Text>
                      <Text
                        style={[
                          styles.middleText,
                          {fontSize: fontSize.normal},
                        ]}>
                        $ {datos.price}
                      </Text>
                    </View>
                  </View>
                ),
              )}
            </View>
          </Card>
        )}
      </View>
    );
  }
}

export default connect(mapStateToProps)(Data);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  titleStyle: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'normal',
    margin: 10,
    textAlign: 'left',
    height: 'auto',
    justifyContent: 'center',
  },
  containerCard: {
    height: 110,
    padding: 0,
    width: screenWidth - 20,
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
  middleText: {fontSize: 11, marginBottom: 10},
  innerCard: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    borderRadius: 10,
    paddingVertical: 10,
  },
  textPart: {
    justifyContent: 'center',
    flex: 1,
    height: 70,
    alignItems: 'center',
    paddingVertical: 10,
  },
  titleContainer: {
    height: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#CDCBCB',
  },
  titleWeight: {
    fontWeight: 'bold',
  },
});
