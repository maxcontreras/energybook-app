import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { connect } from "react-redux";
import PinGoogleMaps from "../Assets/Svg/PinGoogleMaps.svg";

const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  inCaseCoords: state.weatherReducer
});

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class SAmap extends Component {
  constructor(props) {
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    super(props);
    this.state = {
      values: [],
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    this._retrieveData();
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      if (value !== null) {
        this.setState({
          values: JSON.parse(value)
        });
      }
    } catch (error) {}
  };

  render() {
    const region = {
      latitude: this.props.lat,
      longitude: this.props.lon,
      latitudeDelta: 15,
      longitudeDelta: 15
    };
    var key = 0;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {Platform.OS == "ios" && (
            <MapView
              provider={this.props.provider}
              style={styles.map}
              scrollEnabled={true}
              zoomEnabled={true}
              pitchEnabled={true}
              rotateEnabled={true}
              initialRegion={region}
            >
              {this.props.coords.map(coords => (
                <View key={key++}>
                  {coords.location && (
                    <MapView.Marker
                      title={coords.company_name}
                      coordinate={{
                        latitude: coords.location.lat,
                        longitude: coords.location.lon
                      }}
                    >
                      <PinGoogleMaps width={60} height={60} />
                    </MapView.Marker>
                  )}
                </View>
              ))}
            </MapView>
          )}
          {Platform.OS == "android" && (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: this.state.values.location
                  ? this.state.values.location.lat
                  : this.props.inCaseCoords.ftcoords[0],
                longitude: this.state.values.location
                  ? this.state.values.location.lon
                  : this.props.inCaseCoords.ftcoords[1],
                latitudeDelta: 15,
                longitudeDelta: 15
              }}
            >
              {this.props.coords.map(coords => (
                <View key={key++}>
                  {coords.location && (
                    <Marker
                      title={coords.company_name}
                      coordinate={{
                        latitude: coords.location.lat,
                        longitude: coords.location.lon
                      }}
                    >
                      <PinGoogleMaps width={60} height={60} />
                    </Marker>
                  )}
                </View>
              ))}
            </MapView>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(SAmap);

const styles = StyleSheet.create({
  container: {
    height: 250,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%"
  },
  scrollview: {
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 500
  }
});
