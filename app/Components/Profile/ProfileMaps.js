import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {connect} from 'react-redux';
import {PinGoogleMaps} from '../../Assets/Svg/Design/index';

const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  inCaseCoords: state.weatherReducer,
});

const {width, height} = Dimensions.get('window');

class ProfileMaps extends Component {
  constructor(props) {
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    super(props);
    this.state = {
      values: [],
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
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
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
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
            this.setCoords();
          },
        );
      }
    } catch (error) {}
  };
  setCoords() {
    this.setState({
      latitude: this.state.values.location
        ? this.state.values.location.lat
        : this.props.inCaseCoords.ftcoords[0],
      longitude: this.state.values.location
        ? this.state.values.location.lon
        : this.props.inCaseCoords.ftcoords[1],
    });
    console.log(this.state.latitude);
    console.log(this.state.longitude);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          {this.state.latitude != 0 && (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}>
              <Marker
                title={this.state.values.company}
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: 0.002,
                  longitudeDelta: 0.002,
                }}>
                <PinGoogleMaps width={50} height={50} />
              </Marker>
            </MapView>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(ProfileMaps);

const styles = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  scrollview: {
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
