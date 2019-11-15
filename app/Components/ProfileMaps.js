import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import PinGoogleMaps from "../Assets/Svg/PinGoogleMaps.svg";
const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  inCaseCoords: state.weatherReducer
});

class ProfileMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    };
    this._retrieveData();
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
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: this.state.values.location
              ? this.state.values.location.lat
              : this.props.inCaseCoords.ftcoords[0],
            longitude: this.state.values.location
              ? this.state.values.location.lon
              : this.props.inCaseCoords.ftcoords[1],
            latitudeDelta: 0.002,
            longitudeDelta: 0.002
          }}
        >
          <Marker
            title={this.state.values.company}
            coordinate={{
              latitude: this.state.values.location
                ? this.state.values.location.lat
                : this.props.inCaseCoords.ftcoords[0],
              longitude: this.state.values.location
                ? this.state.values.location.lon
                : this.props.inCaseCoords.ftcoords[1]
            }}
          >
            <PinGoogleMaps width={60} height={60} />
          </Marker>
        </MapView>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ProfileMaps);

const styles = StyleSheet.create({
  container: {
    height: 250,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
