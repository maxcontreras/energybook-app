import React, {Component} from "react";
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
}from "react-native";
import Swiper from "react-native-web-swiper";
import Fecha from "./Fecha.js";


export default class SwiperC extends Component {

  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <View style={{flex: 3, elevation: 20, paddingTop: 10,}}>
        <Swiper index={0} containerStyle={styles.containerSlider}>
          <View style={styles.slides}>
          <View style={{elevation: 20 }}>
            <View style={styles.top}>
              <Text style={{paddingLeft:30}}>Hoy</Text>
              <Fecha/>
            </View>
            <View style={styles.bottom}></View>
            </View>
          </View>
          <View style={styles.slides}>
          <View style={styles.top}></View>
          <View style={styles.bottom}></View>
          </View>
          <View style={styles.slides}>
          <View style={styles.top}></View>
          <View style={styles.bottom}></View>
          </View>
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slides: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    paddingTop: 10,
    paddingBottom: 25,
  },
  containerSlider: {
    width: Dimensions.get('window').width,
    elevation: 20,
    height: 175,
  //  paddingTop: 10,
  },
  top: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    flex: 1,
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    elevation: 20,
    paddingTop: 10,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottom: {
    flex: 6,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    elevation: 20,

  }
});
