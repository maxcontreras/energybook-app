import React, {Component, PropTypes} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import GetLocation from 'react-native-get-location';

import {getWeather, setFTcoords} from '../../../Actions/Actions';
import {weatherIcons} from '../../Assets/constants';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  datosClima: state.weatherReducer,
  adminIds: state.adminReducer,
});

class Weather extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      lugar: '',
      datos: [],
      clima: [],
      values: [],
      icon: '',
    };
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        this.setState({
          values: JSON.parse(value),
        });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  UNSAFE_componentWillMount() {
    this._retrieveData();
    //gets user location
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        this.setState(
          {
            location: location,
          },
          () => {
            //get weather data with user coordinates
            fetch(
              `http://api.ienergybook.com/api/DesignatedMeters/getWeather`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  lat: this.state.location.latitude,
                  lon: this.state.location.longitude,
                }),
              },
            )
              .then(res => {
                this.state.statusCode = res.status;
                const data = res.json();
                return Promise.all([this.state.statusCode, data]);
              })
              .then(json => {
                //saves weather data into store
                this.props.dispatch(getWeather(json));
                //saves user coordinates into store
                this.props.dispatch(
                  setFTcoords(
                    this.state.location.latitude,
                    this.state.location.longitude,
                  ),
                );
              })
              .catch(err => {});
          },
        );
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }

  render() {
    var key = 0;
    return (
      <View style={styles.container}>
        {this.state.location && this.props.datosClima && (
          <View style={styles.weather}>
            <View style={styles.topView}>
              {weatherIcons.map(icons => (
                <View key={key++} style={styles.icon}>
                  {icons.title == this.props.datosClima.icon && (
                    <icons.Icon width={70} height={70} />
                  )}
                </View>
              ))}
              <Text style={styles.degrees}>
                {this.props.datosClima.temp}º C
              </Text>
            </View>
            {this.props.datosClima && (
              <View style={styles.middleView}>
                <Text style={styles.description}>
                  {this.props.datosClima.clima.charAt(0).toUpperCase() +
                    this.props.datosClima.clima.slice(1)}
                </Text>
                <Text style={styles.description}>
                  {this.props.datosClima.lugar}
                </Text>
              </View>
            )}
            {this.props.screen != 'SuperAdmin' && (
              <Text style={styles.description2}>
                {this.props.adminIds.company_name != ''
                  ? this.props.adminIds.company_name
                  : this.state.values.company}
              </Text>
            )}
          </View>
        )}
      </View>
    );
  }
}

export default connect(mapStateToProps)(Weather);

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 5,
  },
  topView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
  },
  middleView: {
    width: '100%',
  },
  weather: {
    flex: 1,
    width: screenWidth / 2,
    alignItems: 'flex-start',
    paddingBottom: 5,
  },
  degrees: {
    fontSize: 35,
    color: 'black',
    textAlignVertical: 'bottom',
  },
  description: {
    fontSize: 12,
    color: 'black',
    paddingLeft: 20,
  },
  icon: {
    justifyContent: 'flex-end',
  },
  description2: {
    paddingTop: 5,
    fontSize: 17,
    color: 'black',
    paddingLeft: 20,
  },
});
