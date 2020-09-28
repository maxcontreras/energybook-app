import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, SafeAreaView} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {connect} from 'react-redux';
import {PinGoogleMaps} from '../../Assets/Svg/Design/index';
import {isPortrait} from '../../Assets/constants';
const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  inCaseCoords: state.weatherReducer,
});
class SAmap extends Component {
  constructor(props) {
    isPortrait();
    super(props);
    this.state = {
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
            {this.props.coords.map((coords, index) => (
              <View key={index}>
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
