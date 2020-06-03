import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LogoObs from '../../Assets/Images/LogoObs.png';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ChartIcon,
  PriceIcon,
  CodeIcon,
  ClockIcon,
  CO2Icon,
  PanelIcon,
  EffIcon,
  BackAdmin,
} from '../../Assets/Svg/Menu/index';
import Weather from '../../Components/Global/Weather';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this._retrieveData();
    this.state = {
      userCity: this.props.userCity,
      values: [],
      userCompanyName: this.props.userCompanyName,
      id: '',
      button: '',
    };
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
            console.log(this.state.values);
          },
        );
      }
    } catch (error) {}
  };

  chartS() {
    this.setState({
      button: 'charts',
    });
    this.props.navigation.navigate('Charts');
  }

  render() {
    const data =
      this.state.values.role_id == 1
        ? [
            {screen: 'Partners', Icon: BackAdmin, titulo: 'Partners'},
            {screen: 'Charts', Icon: ChartIcon, titulo: 'Gráficas'},
            {screen: 'Costs', Icon: PriceIcon, titulo: 'Costos'},
            {screen: 'NetworkC', Icon: CodeIcon, titulo: 'Código de red'},
            {screen: 'Efficiency', Icon: EffIcon, titulo: 'Eficiencia'},
            {screen: 'Record', Icon: ClockIcon, titulo: 'Historial'},
            {screen: 'CarbonF', Icon: CO2Icon, titulo: 'Huella de Carbono'},
            {screen: 'Generation', Icon: PanelIcon, titulo: 'Generación'},
          ]
        : [
            {screen: 'Charts', Icon: ChartIcon, titulo: 'Gráficas'},
            {screen: 'Costs', Icon: PriceIcon, titulo: 'Costos'},
            {screen: 'NetworkC', Icon: CodeIcon, titulo: 'Código de red'},
            {screen: 'Efficiency', Icon: EffIcon, titulo: 'Eficiencia'},
            {screen: 'Record', Icon: ClockIcon, titulo: 'Historial'},
            {screen: 'CarbonF', Icon: CO2Icon, titulo: 'Huella de Carbono'},
            {screen: 'Generation', Icon: PanelIcon, titulo: 'Generación'},
          ];
    var key = 0;

    return (
      <View style={styles.container}>
        <View style={styles.topScreen}>
          <View style={styles.weather}>
            <Weather
              userCity={this.state.userCity}
              userCompanyName={this.state.userCompanyName}
              screen={this.props.screen}
            />
          </View>
          <View styles={styles.logoView}>
            <Image source={LogoObs} style={styles.logo} />
          </View>
        </View>
        {this.props.screen != 'SuperAdmin' && (
          <View style={styles.menu}>
            {data.map((screens, index) => (
              <View key={index}>
                {screens != null && (
                  <TouchableOpacity
                    key={key++}
                    onPress={() =>
                      this.props.navigation.navigate(
                        screens.screen == 'Partners'
                          ? 'PrincipalScreen'
                          : 'TopTabNavigator',
                        {
                          screen: screens.screen,
                        },
                      )
                    }
                    style={styles.btn}>
                    <screens.Icon style={styles.imageB} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }
}

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  logoView: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 'auto',
  },
  topScreen: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 2,
  },
  btn: {
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weather: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 2,
    width: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  scroll: {
    flex: 0,
    height: 'auto',
    flexGrow: 1,
  },
  btnTxt: {
    color: '#000000',
    fontSize: 10,
    textAlign: 'center',
  },
  imageB: {
    height: 30,
    width: 30,
  },
});
