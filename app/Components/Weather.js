import React, { Component, PropTypes } from "react";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Animated,
  FlatList,
  Dimensions
} from "react-native";
import RNLocation from "react-native-location";
const repoUrl = "https://github.com/timfpark/react-native-location";
import AsyncStorage from "@react-native-community/async-storage";

import Cloudy from "../Assets/WeatherSvg/Cloudy.svg";
import CloudyDay1 from "../Assets/WeatherSvg/CloudyDay1.svg";
import CloudyNight1 from "../Assets/WeatherSvg/CloudyNight1.svg";
import Day from "../Assets/WeatherSvg/Day.svg";
import Night from "../Assets/WeatherSvg/Night.svg";
import Rainy5 from "../Assets/WeatherSvg/Rainy5.svg";
import Rainy6 from "../Assets/WeatherSvg/Rainy6.svg";
import Rainy7 from "../Assets/WeatherSvg/Rainy7.svg";
import RainySun2 from "../Assets/WeatherSvg/RainySun2.svg";
import Snowy6 from "../Assets/WeatherSvg/Snowy6.svg";
import SnowySun3 from "../Assets/WeatherSvg/SnowySun3.svg";
import Thunder from "../Assets/WeatherSvg/Thunder.svg";
import { getWeather, setFTcoords } from "../../Actions/Actions.js";

import { connect } from "react-redux";

const mapStateToProps = state => ({
  datosClima: state.weatherReducer,
  adminIds: state.adminReducer
});

class Weather extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      lugar: "",
      datos: [],
      clima: [],
      values: [],
      icon: ""
    };
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      if (value !== null) {
        this.setState({
          values: JSON.parse(value)
        });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
    this._stopUpdatingLocation();
  }
  componentWillMount() {
    this._isMounted = true;
    this._retrieveData();
    RNLocation.configure({
      distanceFilter: 5.0
    });
    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "fine",
        rationale: {
          title: "Location permission",
          message: "We use your location to demo the library",
          buttonPositive: "OK",
          buttonNegative: "Cancel"
        }
      }
    }).then(granted => {
      if (granted) {
        this._startUpdatingLocation();
      }
    });
  }
  _startUpdatingLocation = () => {
    this.locationSubscription = RNLocation.subscribeToLocationUpdates(
      locations => {
        this.setState({ location: locations[0] }, () => {
          fetch(`http://api.ienergybook.com/api/DesignatedMeters/getWeather`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              lat: this.state.location.latitude,
              lon: this.state.location.longitude
            })
          })
            .then(res => {
              this.state.statusCode = res.status;
              const data = res.json();
              return Promise.all([this.state.statusCode, data]);
            })
            .then(json => {
              if (this._isMounted) {
                this.props.dispatch(getWeather(json));
                this.props.dispatch(
                  setFTcoords(
                    this.state.location.latitude,
                    this.state.location.longitude
                  )
                );
              }
            })
            .catch(err => {});
        });
      }
    );
  };
  _stopUpdatingLocation = () => {
    this.locationSubscription && this.locationSubscription();
    this.setState({ location: null });
  };
  _openRepoUrl = () => {
    Linking.openURL(repoUrl).catch(err =>
      console.error("An error occurred", err)
    );
  };

  render() {
    const { location } = this.state;
    console.log(this.props);
    return (
      <View style={styles.container}>
        {location && this.props.datosClima && (
          <View style={styles.weather}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                backgroundColor: "white"
              }}
            >
              <View style={styles.icon}>
                {this.props.datosClima.icon == "03d" && (
                  <Cloudy width={70} height={70} />
                )}
                {this.props.datosClima.icon == "03n" && (
                  <Cloudy width={70} height={70} />
                )}
                {this.props.datosClima.icon == "04n" && (
                  <Cloudy width={70} height={70} />
                )}
                {this.props.datosClima.icon == "04d" && (
                  <Cloudy width={70} height={70} />
                )}
                {this.props.datosClima.icon == "02d" && (
                  <CloudyDay1 width={70} height={70} />
                )}
                {this.props.datosClima.icon == "02n" && (
                  <CloudyNight1 width={70} height={70} />
                )}
                {this.props.datosClima.icon == "01d" && (
                  <Day width={70} height={70} />
                )}
                {this.props.datosClima.icon == "01n" && (
                  <Night width={70} height={70} />
                )}
                {this.props.datosClima.icon == "10n" && (
                  <Rainy5 width={70} height={70} />
                )}
                {this.props.datosClima.icon == "09d" && (
                  <Rainy6 width={70} height={70} />
                )}
                {this.props.datosClima.icon == "09n" && (
                  <Rainy6 width={70} height={70} />
                )}
                {this.props.datosClima.icon == "50d" && (
                  <Rainy7 width={70} height={70} />
                )}
                {this.props.datosClima.icon == "50n" && (
                  <Rainy7 width={70} height={70} />
                )}
                {this.props.datosClima.icon == "10d" && (
                  <RainySun2 width={70} height={70} />
                )}
                {this.props.datosClima.icon == "13n" && (
                  <Snowy6 width={70} height={70} />
                )}
                {this.props.datosClima.icon == "13d" && (
                  <SnowySun3 width={70} height={70} />
                )}
                {this.props.datosClima.icon == "11d" && (
                  <Thunder width={70} height={70} />
                )}
                {this.props.datosClima.icon == "11n" && (
                  <Thunder width={70} height={70} />
                )}
              </View>
              <Text style={styles.degrees}>
                {this.props.datosClima.datos.temp}º C
              </Text>
            </View>
            <Text style={styles.description}>
              {this.props.datosClima.clima}
            </Text>
            {this.props.screen != "SuperAdmin" && (
              <Text style={[styles.description, styles.description2]}>
                {this.props.adminIds.company_name != ""
                  ? this.props.adminIds.company_name
                  : this.state.values.company}
              </Text>
            )}
            <Text style={styles.description}>
              {this.props.datosClima.lugar}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default connect(mapStateToProps)(Weather);

const screenWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 5
  },
  weather: {
    flex: 1,
    width: screenWidth / 2,
    alignItems: "flex-start",
    paddingBottom: 5
  },
  degrees: {
    fontSize: 35,
    color: "black",
    textAlignVertical: "bottom",
    paddingBottom: 10
  },
  description: {
    fontSize: 13,
    color: "black",
    textAlign: "center",
    paddingLeft: 20
  },
  icon: {
    justifyContent: "flex-end"
  },
  description2: {
    paddingTop: 5
  }
});
