import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Logotip from '../../Assets/Images/Logotip.png';
import LoginFondo from '../../Assets/Images/LoginFondo.jpg';
import LoginFondoLS from '../../Assets/Images/LoginFondoLS.jpg';
import OneSignal from 'react-native-onesignal';
import {connect} from 'react-redux';
import {getCompanyData, getCompanyId} from '../../../Actions/Actions.js';
import Input from '../../Components/Home/Input';
import {isPortrait, screenWidth, screenHeight} from '../../Assets/constants';

const mapStateToProps = state => ({
  homeData: state.initialValues,
});

class Home extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      statusCode: '',
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  static navigationOptions = {
    header: null,
  };

  UNSAFE_componentWillMount() {}
  _removeKey = async () => {
    try {
      await AsyncStorage.removeItem('inCaseKey');
    } catch (exception) {}
  };

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  Registrar() {
    this.props.navigation.navigate('Register');
  }

  PasswordChange() {
    this.props.navigation.navigate('PasswordChange');
  }

  getCompany = async () => {
    const accesToken = await this.props.homeData.accesToken;

    try {
      fetch(
        `http://api.ienergybook.com/api/eUsers/?filter={"where":{"id":"${
          this.props.homeData.userId
        }"}}&access_token=${accesToken}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
        .then(res => {
          this.state.statusCode = res.status;
          const data = res.json();
          return Promise.all([this.state.statusCode, data]);
        })
        .then(json => {
          console.log(json);
          if (this.state.statusCode == 200) {
            this.props.dispatch(getCompanyId(json));
            if (this.props.homeData.companyId) {
              this.getCompanyData();
            } else {
              this.Navigate();
            }
          }
        })
        .catch(err => {
          console.log('no se pudo');
        });
    } catch (exception) {}
  };
  getCompanyData() {
    fetch(
      `http://api.ienergybook.com/api/Companies/?filter={"where":{"id":"${
        this.props.homeData.companyId
      }"}}&access_token=${this.props.homeData.accesToken}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'appliscation/json',
        },
      },
    )
      .then(res => {
        this.state.statusCode = res.status;
        const data2 = res.json();
        return Promise.all([this.state.statusCode, data2]);
      })
      .then(json => {
        console.log(json);
        this.props.dispatch(getCompanyData(json));
        console.log(this.props);
        this._removeKey();
        if (this.props.homeData.companyId) {
          OneSignal.sendTag(this.props.homeData.company, '1');
          this.Navigate();
        }
      })
      .catch(err => {
        console.log('no se pudo');
      });
  }

  _storeData = async () => {
    let datos = {
      accesToken: this.props.homeData.accesToken,
      userId: this.props.homeData.userId,
      company: this.props.homeData.company,
      city: this.props.homeData.city,
      tipoTarifa: this.props.homeData.tipoTarifa,
      Division: this.props.homeData.Division,
      companyId: this.props.homeData.companyId,
      company_phone: this.props.homeData.company_phone,
      size: this.props.homeData.size,
      direccion: this.props.homeData.direccion,
      puesto: this.props.homeData.puesto,
      created_at: this.props.homeData.created_at,
      lastLogin: this.props.homeData.lastLogin,
      name: this.props.homeData.name,
      lastname: this.props.homeData.lastname,
      email: this.props.homeData.email,
      location: this.props.homeData.location,
      giro: this.props.homeData.giro,
      role_id: this.props.homeData.role_id,
      administrando: this.props.homeData.administrando,
    };
    try {
      await AsyncStorage.setItem(
        '@MySuperStore:key',
        JSON.stringify(datos),
        () => {
          console.log(datos);
        },
      );
    } catch (error) {}
  };
  Navigate() {
    this._storeData();
    this.props.navigation.navigate('BottomTab');
  }
  render() {
    return (
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
        <ImageBackground
          style={[styles.background]}
          source={
            this.state.orientation == 'portrait' ? LoginFondo : LoginFondoLS
          }>
          <View style={styles.container}>
            <View style={[styles.logoV]}>
              <Image style={styles.logo} source={Logotip} />
            </View>
            <Input company={this.getCompany.bind(this)} />
            <View style={styles.newAccountView}>
              <TouchableOpacity
                onPress={() => this.Registrar()}
                style={styles.btn2}>
                <Text style={styles.btnTxt2}>¡Regístrate,{'\n'}es gratis!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.PasswordChange()}
                style={styles.btn2}>
                <Text style={styles.btnTxt2}>
                  ¿Olvidaste{'\n'}tu contraseña?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#475659',
  },
  background: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
  },
  logoV: {
    width: '100%',
    height: Math.max(screenHeight, screenWidth) / 2.5,
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  btn2: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: 150,
  },
  btnTxt2: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'center',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    paddingBottom: 30,
    backgroundColor: 'transparent',
  },
  newAccountView: {
    height: Math.max(screenHeight, screenWidth) / 4.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 30,
  },
});
