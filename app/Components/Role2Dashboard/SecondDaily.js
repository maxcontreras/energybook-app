import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import {date, n, mes} from '../../Assets/constants';
import {
  ConsumoIcon,
  Distribucion,
  Capacidad,
  Fp,
} from '../../Assets/Svg/Variables/index';
import {Card} from 'react-native-elements';
import {getCardWidth, getFontSize} from '../../Assets/constants';
const cardWidth = getCardWidth(2.2);
const fontSize = getFontSize('large');
export default class SecondDaily extends Component {
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
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  render() {
    var fecha = date + ' ' + n + ' ' + 'de' + ' ' + mes;
    if (this.props.title == 'Consumo') {
      var Icono = ConsumoIcon;
    } else if (this.props.title == 'Distribución') {
      var Icono = Distribucion;
    } else if (this.props.title == 'Cpacidad') {
      var Icono = Capacidad;
    } else {
      var Icono = Fp;
    }

    console.log('AQUI DATOS EN SECOND DAILY');
    console.log(this.props);

    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Card
          title={
            <View style={styles.titleContainer}>
              <Text style={{fontSize: fontSize.normal}}>Hoy</Text>
              <Text style={{fontSize: fontSize.normal}}>{fecha}</Text>
            </View>
          }
          containerStyle={[
            styles.containerCard,
            {
              width:
                this.state.orientation == 'portrait'
                  ? Math.min(screenWidth, screenHeight) - 20
                  : cardWidth,
            },
          ]}
          titleStyle={styles.titleStyle}
          wrapperStyle={{borderRadius: 10}}>
          <View>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View style={styles.iconView}>
                <Icono style={styles.icon} />
              </View>
              <View style={styles.view1}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: fontSize.title,
                  }}>
                  {this.props.title}
                </Text>
                <Text style={{fontSize: fontSize.normal}}>
                  {this.props.valuekwh}
                </Text>
              </View>

              <View style={styles.view2}>
                <Text style={{fontSize: fontSize.normal}}>
                  {this.props.valuePrice}
                </Text>
              </View>
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}} />

              <View style={styles.uaView}>
                <Text style={{fontSize: 10}}>
                  Última actualización: {this.props.ultima}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

var screenHeight = Math.round(Dimensions.get('window').height);
var screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
  },
  titleStyle: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'normal',
    margin: 10,
    textAlign: 'right',
    height: 'auto',
    justifyContent: 'center',
  },
  containerCard: {
    height: 120,
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
  icon: {
    height: 35,
    width: 35,
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
  iconView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view1: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  view2: {
    flex: 0.75,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },

  uaView: {
    flex: 0.75,
    padding: 10,
  },
});
