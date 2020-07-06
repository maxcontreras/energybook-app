import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Card,
  MessageBox,
  Bar,
  PeriodPicker,
} from '../../Components/Notifications/index';
import {divider} from '../../Assets/Functions/notifications';
import {Load} from '../../Components/Global/index';

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      mensaje: ' ',
      values: [],
      new_notifications: [],
      old_notifications: [],
      statusCode: null,
      isLoaded: false,
      category: 'Mostrar todas',
    };
    OneSignal.init('e31f477a-2f06-4f77-b051-376694227a4c');
    this.onOpened = this.onOpened.bind(this);
    OneSignal.addEventListener('opened', this.onOpened);
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
            this.getNotifications();
          },
        );
      }
    } catch (error) {}
  };

  getNotifications() {
    this.setState({isLoaded: false});
    fetch(`http://api.ienergybook.com/api/notificaciones/VerNotificaciones`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        User_id: this.state.values.userId,
        Company_id: this.state.values.companyId,
      }),
    })
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        let not_new = divider(json[1].Resultado[0], this.state.category);
        let not_old = divider(json[1].Resultado[1], this.state.category);

        this.setState({
          new_notifications: not_new,
          old_notifications: not_old,
          isLoaded: true,
        });
      })
      .catch(err => {
        this.setState({
          isLoaded: true,
        });
      });
  }

  UNSAFE_componentWillMount() {
    this._retrieveData();
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('opened', this.onOpened);
  }
  onOpened(openResult) {
    this.setState({
      mensaje: openResult.notification.payload.body,
    });
  }

  changeCategory(value) {
    this.setState(
      {
        category: value,
      },
      () => {
        this.getNotifications();
      },
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          <KeyboardAvoidingView enabled>
            <View style={[styles.container]}>
              <PeriodPicker
                change={this.changeCategory.bind(this)}
                selected={this.state.category}
              />
              <View style={styles.cardContainer}>
                <Bar text={'Nuevas notificaciones!'} />
                {this.state.new_notifications.length == 0 &&
                  this.state.isLoaded && <MessageBox />}
                {!this.state.isLoaded && <Load />}
                {this.state.isLoaded && (
                  <View>
                    {this.state.new_notifications.map((device, index) => (
                      <Card
                        key={index}
                        device={device}
                        afterDelete={this.getNotifications.bind(this)}
                      />
                    ))}
                  </View>
                )}
              </View>
              <View style={styles.cardContainer}>
                <Bar text={'Notificaciones Pasadas'} />
                {this.state.old_notifications.length == 0 &&
                  this.state.isLoaded && <MessageBox />}
                {!this.state.isLoaded && <Load />}
                {this.state.isLoaded && (
                  <View>
                    {this.state.old_notifications.map((device, index) => (
                      <Card
                        key={index}
                        device={device}
                        afterDelete={this.getNotifications.bind(this)}
                      />
                    ))}
                  </View>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cardContainer: {
    flex: 1,
    paddingBottom: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
