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

class ProfileMaps extends Component {
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
      latitudeDelta: 0.002,
      longitudeDelta: 0.002
    };

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
              <MapView.Marker
                title={this.state.values.company}
                coordinate={region}
              >
                <PinGoogleMaps width={50} height={50} />
              </MapView.Marker>
            </MapView>
          )}
          {Platform.OS == "android" && (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={region}
            >
              <Marker title={this.state.values.company} coordinate={region}>
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
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%"
  },
  scrollview: {
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
