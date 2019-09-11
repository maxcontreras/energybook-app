import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Button,
  TouchableOpacity,
  RefreshControl,
  AsyncStorage
} from "react-native";

import Orientation from "react-native-orientation";

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Home");
  };

  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    Orientation.unlockAllOrientations();
    if (initial === "PORTRAIT") {
      this.setState({
        portrait: true,
        landscape: false
      });
    } else {
      this.setState({
        portrait: false,
        landscape: true
      });
    }
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
  }
  _orientationDidChange = orientation => {
    if (orientation === "LANDSCAPE") {
      console.log("LANDSCAPE");
      this.setState({
        portrait: false,
        landscape: true
      });
    } else {
      this.setState({
        portrait: true,
        landscape: false
      });
      console.log("PORTRAIT");
    }
  };
  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  render() {
    return (
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
        <SafeAreaView>
          <KeyboardAvoidingView enabled>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: screenHeight,
                width: screenWidth
              }}
            >
              <TouchableOpacity
                onPress={() => this._signOutAsync()}
                style={[styles.buttonG, styles.elevation]}
              >
                <Text style={styles.unselectedButtonText}>Salir</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 0,
    height: "auto",
    flexGrow: 1
  },
  unselectedButtonText: {
    color: "black",
    fontSize: 10
  },
  buttonG: {
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    marginLeft: 5
  },
  elevation: {
    borderWidth: 1,
    borderColor: "#737373",
    borderRadius: 20
  }
});
