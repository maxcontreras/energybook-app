import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, SafeAreaView} from 'react-native';
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
class SAmap extends Component {
  constructor(props) {
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    super(props);
    this.state = {
      values: [],
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    this._retrieveData();
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
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

  render() {
    var key = 0;
    console.log(this.props.coords);
    const aver = {
      data: [],
    };
    for (var i in this.props.coords) {
      if (this.props.coords[i].location) {
        console.log(this.props.coords[i].location);
      }
    }

    console.log(aver);

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: this.props.coords[0].location.lat,
              longitude: this.props.coords[0].location.lon,
              latitudeDelta: 15,
              longitudeDelta: 15,
            }}>
            {this.props.coords.map(coords => (
              <View key={key++}>
                {coords.location && (
                  <Marker
                    title={coords.company_name}
                    coordinate={{
                      latitude: coords.location.lat,
                      longitude: coords.location.lon,
                    }}>
                    <PinGoogleMaps width={60} height={60} />
                  </Marker>
                )}
              </View>
            ))}
          </MapView>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(SAmap);

const styles = StyleSheet.create({
  container: {
    height: 250,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  scrollview: {
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 500,
  },
});
