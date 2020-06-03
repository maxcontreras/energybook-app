import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {
  ButtonClose,
  TopImage,
  CompanyInfo,
  TopTitle,
  ProfileMaps,
} from '../../Components/Profile';

const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  inCaseCoords: state.weatherReducer,
});

class Profile extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      values: [],
      inCaseKey: [],
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
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
          },
        );
      }
    } catch (error) {}
  };

  UNSAFE_componentWillMount() {
    this._retrieveData();
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  render() {
    var data = [
      {titulo: 'Nombre', valor: this.state.values.company},
      {titulo: 'Teléfono', valor: this.state.values.company_phone},
      {titulo: 'Tamaño de la empresa', valor: this.state.values.size},
      {titulo: 'Puesto', valor: this.state.values.puesto},
      {titulo: 'Giro', valor: this.state.values.giro},
      {titulo: 'Ubicación', valor: this.state.values.direccion},
    ];
    var key = 0;

    return (
      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
        <SafeAreaView>
          <KeyboardAvoidingView enabled>
            <View style={styles.container}>
              <TopImage
                name={this.state.values.name}
                lastname={this.state.values.lastname}
                company={this.state.values.company}
              />
              <ProfileMaps />
              <TopTitle />
              <CompanyInfo data={data} email={this.state.values.email} />
              <ButtonClose navigation={this.props.navigation} />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(Profile);
const styles = StyleSheet.create({
  scroll: {
    flex: 0,
    height: 'auto',
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    height: 'auto',
  },
});
