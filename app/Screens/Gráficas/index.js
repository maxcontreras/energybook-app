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
import SwiperC from "../../Components/SwiperC.js";
import LogoObs from "../../Assets/Images/LogoObs.png";
import Icon from 'react-native-vector-icons/FontAwesome';
import Dash from "../../Assets/Images/dash.png";
import Notificacion from "../../Assets/Images/not.png";
import Info from "../../Assets/Images/info.png";
import Perfil from "../../Assets/Images/perfil.png";
import SemiCircleProgress from "../../Components/SemiCircleProgress.js";
import Fecha from "../../Components/Fecha.js";

const axios = require('axios');

export default class Gráficas extends Component {
  constructor() {
    super();
    this.state = {
      active: "",
    };
  }

render() {
    return (
<ScrollView style={styles.scroll} keyboardShouldPersistTaps="never" >
  <SafeAreaView>
    <KeyboardAvoidingView enabled>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style = {styles.weather}>
            <Text>W E A T H E R</Text>
          </View>
          <View styles ={styles.logoV}>
            <Image source={LogoObs} style={styles.logo}/>
          </View>
        </View>
        <View style={styles.dashboard}>
        <TouchableOpacity
          onPress={() => this.postLogin()}
          style={styles.btn}>
          <Image source={Dash} style={styles.imageB}/>
          <Text style={styles.btnTxt}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.postLogin()}
          style={styles.btn}>
          <Image source={Notificacion} style={styles.imageB}/>
          <Text style={styles.btnTxt}>Notificaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.postLogin()}
          style={styles.btn}>
          <Image source={Info} style={styles.imageB}/>
          <Text style={styles.btnTxt}>Información</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.postLogin()}
          style={styles.btn}>
          <Image source={Perfil} style={styles.imageB}/>
          <Text style={styles.btnTxt}>Perfil</Text>
        </TouchableOpacity>
        </View>
        <SwiperC/>
        <View style={styles.card}>
        <View style={{elevation: 20 }}>
          <View style={styles.top2}>
          <Text style={{paddingLeft: 10}}>Periodo de facturación</Text>
            <Fecha/>
          </View>
          <View style={styles.bottom}></View>
          </View>
        </View>
        <View style={styles.graficas}>
        <SemiCircleProgress
          percentage={35}
          progressColor={"green"}
          >
          <Text style={{ fontSize: 10 }}>kW</Text>
        </SemiCircleProgress>
        </View>
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
</ScrollView>
  )
  }
}

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  logoV: {
    flex: 1,
    alignItems: 'flex-end',
  },
  logo: {
    width: screenWidth/2,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 10,
    height: 'auto',
    paddingBottom: 20,
    },
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: "transparent",
    borderBottomColor: '#939393',
    borderBottomWidth: 2,
},
btn: {
  height: 40,
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
},
weather: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: screenWidth/2,
},
dashboard: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  backgroundColor: "transparent",
  borderBottomColor: '#939393',
  borderBottomWidth: 2,
  width: 'auto',
  paddingTop: 10,
  paddingBottom: 10,
},
scroll: {
  flex: 0,
  height: 'auto',
  flexGrow: 1,
},
graficas: {
  flex: 1,
  paddingTop: 30,
  alignItems: 'center',
  justifyContent: 'center',

},
btnTxt: {
  color: "#000000",
  fontSize: 10
},
imageB: {
  height: 30,
  width: 30,
},
slides: {
  flex:1,
  alignItems:"center",
  justifyContent:"center",
  backgroundColor:"white"
},
containerSlider: {
  width: Dimensions.get('window').width,
  height: 300
},
card: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    paddingTop: 10,
    paddingBottom: 25,
    height: 300,
},
top2: {
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
  justifyContent: 'space-between',
  flexDirection: 'row'
},
bottom: {
  flex: 11,
  borderBottomEndRadius: 20,
  borderBottomStartRadius: 20,
  backgroundColor: 'white',
  width: Dimensions.get('window').width,
  borderColor: '#EEEEEE',
  borderWidth: 1,
  elevation: 20,

},

});
