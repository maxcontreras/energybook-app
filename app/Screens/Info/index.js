import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {PDFcard} from '../../Components/Information/index';

export default class Info extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      values: [],
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

            fetch(
              `http://api.ienergybook.com/api/InformationFiles?access_token=${
                this.state.values.accesToken
              }`,
              {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              },
            )
              .then(res => {
                this.state.statusCode = res.status;
                const data = res.json();
                return Promise.all([this.state.statusCode, data]);
              })
              .then(json => {
                console.log(json);
                if (this.state.statusCode == 200) {
                  this.setState({
                    pdfs: json[1],
                  });
                }
              })
              .catch(err => {});
          },
        );
      }
    } catch (error) {}
  };

  UNSAFE_componentWillMount() {
    this._retrieveData();
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.headerTitle}>
          <Text style={{fontSize: 20, letterSpacing: 1, color: '#ffffff'}}>
            Información
          </Text>
        </View>
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          <View style={styles.container}>
            {this.state.pdfs && <PDFcard pdfs={this.state.pdfs} />}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {flex: 1},
  headerTitle: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#485658',
    height: 'auto',
  },
  container: {
    flex: 1,
    height: 'auto',
    paddingBottom: 20,
    backgroundColor: 'white',
  },
});
