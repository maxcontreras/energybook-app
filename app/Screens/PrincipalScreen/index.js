import React, {Component, PropTypes} from 'react';
import {SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import Role2Dashboard from '../Role2Dashboard';
import SADashboard from '../SADashboard';
import AdminDashboard from '../AdminDashboard';

const Stack = createStackNavigator();
export default class PrincipalScreen1 extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
  }
  static navigationOptions = {
    header: null,
  };
  UNSAFE_componentWillMount() {
    this._retrieveData();
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

  render() {
    if (
      this.state.values.role_id == 1 &&
      this.state.values.administrando == null
    ) {
      return (
        <SafeAreaView style={{flex: 1}}>
          <Stack.Navigator>
            <Stack.Screen
              name="PrincipalScreen"
              component={SADashboard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Role2Dashboard"
              component={Role2Dashboard}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      );
    } else if (
      this.state.values.role_id == 1 &&
      this.state.values.administrando != null
    ) {
      return (
        <SafeAreaView style={{flex: 1}}>
          <Stack.Navigator initialRouteName="PrincipalScreen">
            <Stack.Screen
              name="PrincipalScreen"
              component={AdminDashboard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Role2Dashboard"
              component={Role2Dashboard}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={{flex: 1}}>
          <Stack.Navigator initialRouteName="PrincipalScreen">
            <Stack.Screen
              name="PrincipalScreen"
              component={Role2Dashboard}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      );
    }
  }
}
