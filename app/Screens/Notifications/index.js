import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView
} from "react-native";
import HeaderMenu from "../../Components/HeaderMenu.js";
import OneSignal from "react-native-onesignal";
import AsyncStorage from "@react-native-community/async-storage";
import Consumo from "../../Assets/Svg/Consumo.svg";

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape",
      devices: [],
      mensaje: " ",
      values: [],
      new_notifications: [],
      old_notifications: [],
      newServices: [],
      oldServices: [],
      statusCode: null
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
    OneSignal.init("e31f477a-2f06-4f77-b051-376694227a4c");
    OneSignal.addEventListener("received", this.onReceived);
    this.onOpened = this.onOpened.bind(this);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      if (value !== null) {
        this.setState(
          {
            values: JSON.parse(value)
          },
          () => {
            console.log(this.state.values);

            fetch(
              `http://192.168.8.44:3000/api/notificaciones/VerNotificaciones`,
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  User_id: this.state.values.userId,
                  Company_id: this.state.values.companyId
                })
              }
            )
              .then(res => {
                this.state.statusCode = res.status;
                const data = res.json();
                return Promise.all([this.state.statusCode, data]);
              })
              .then(json => {
                console.log(json);
                var newServices = [];
                var oldServices = [];
                //notificaciones nuevas
                for (i in json[1].Resultado[0]) {
                  newServices[i] = json[1].Resultado[0][i];
                }
                //notificaciones pasadas
                for (i in json[1].Resultado[1]) {
                  oldServices[i] = json[1].Resultado[1][i];
                }
                this.setState(
                  {
                    new_notifications: newServices,
                    old_notifications: oldServices
                  },
                  () => {
                    console.log(this.state.new_notifications);
                    console.log(this.state.old_notifications);
                  }
                );
              })
              .catch(err => {
                console.log("NO SE PUDO");
              });
          }
        );
      }
    } catch (error) {}
  };

  componentWillMount() {
    this._retrieveData();
  }
  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
    Dimensions.removeEventListener("change");
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
    this.setState({
      mensaje: openResult.notification.payload.body
    });
    console.log(this.state.mensaje);
  }

  onIds(device) {
    console.log("Device info: ", device);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={styles.header}>
          <HeaderMenu selected="record" />
        </View>
      )
    };
  };

  render() {
    var key = 0;
    var arreglo = [];
    for (i = 7; i < this.state.old_notifications.length; i++) {
      arreglo[i - 7] = this.state.old_notifications[i];
    }
    console.log(arreglo);
    console.log(this.state.new_notifications);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          <KeyboardAvoidingView enabled>
            <View
              style={{
                flex: 1,
                justifyContent: "center"
              }}
            >
              <View style={styles.headerTitle}>
                <Text style={styles.headerText}>Nuevas notificaciones!</Text>
              </View>
              {this.state.new_notifications && (
                <View
                  style={{
                    flex: 1,
                    height: "auto",
                    margin: 10,
                    padding: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    ...Platform.select({
                      ios: {
                        shadowRadius: 5,
                        shadowColor: "black",
                        shadowOffset: { width: 5, height: 5 },
                        shadowOpacity: 0.2
                      },
                      android: {
                        elevation: 5
                      }
                    }),
                    backgroundColor: "white"
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    No hay nuevas notificaciones por el momento
                  </Text>
                </View>
              )}
              {this.state.new_notifications.map(device => (
                <View key={key++} style={styles.notificationView}>
                  <View style={styles.notificationTopView}>
                    {device.tipo == "Semanal" && (
                      <Text style={styles.notificationTitle}>
                        Costo de consumo de la semana pasada!
                      </Text>
                    )}
                    {device.tipo == "Diaria" && (
                      <Text style={styles.notificationTitle}>
                        Costo de consumo del día de ayer!
                      </Text>
                    )}
                    {device.tipo == "Mensual" && (
                      <Text style={styles.notificationTitle}>
                        Costo de consumo del mes pasado!
                      </Text>
                    )}
                    <Consumo style={{ width: 35, height: 35 }} />
                  </View>
                  <View
                    style={[
                      styles.notificationTopView,
                      { alignItems: "flex-end" }
                    ]}
                  >
                    <View style={{ flex: 1, flexDirection: "column" }}>
                      {device.Servicios.map(mensaje => (
                        <Text key={key++} style={styles.mensajeText}>
                          {mensaje.substr(0, 8) == "Servicio"
                            ? `${mensaje.substr(0, 10)}: $${mensaje.substr(
                                11,
                                mensaje.length
                              )}`
                            : `${mensaje.replace(" ", ": $")}`}
                        </Text>
                      ))}
                    </View>
                    <Text style={[styles.mensajeText, styles.mensajeTextadd1]}>
                      {device.Fecha}
                    </Text>
                  </View>
                </View>
              ))}
              <View style={styles.headerTitle}>
                <Text style={styles.headerText}>Notificaciones Pasadas</Text>
              </View>
              {arreglo.map(device => (
                <View key={key++} style={styles.notificationView}>
                  <View style={styles.notificationTopView}>
                    {device.tipo == "Semanal" && (
                      <Text style={styles.notificationTitle}>
                        Costo de consumo de la semana pasada!
                      </Text>
                    )}
                    {device.tipo == "Diaria" && (
                      <Text style={styles.notificationTitle}>
                        Costo de consumo del día de ayer!
                      </Text>
                    )}
                    {device.tipo == "Mensual" && (
                      <Text style={styles.notificationTitle}>
                        Costo de consumo del mes pasado!
                      </Text>
                    )}
                    <Consumo style={{ width: 35, height: 35 }} />
                  </View>
                  <View
                    style={[
                      styles.notificationTopView,
                      { alignItems: "flex-end" }
                    ]}
                  >
                    <View style={{ flex: 1, flexDirection: "column" }}>
                      {device.Servicios.map(mensaje => (
                        <Text key={key++} style={styles.mensajeText}>
                          {mensaje.substr(0, 8) == "Servicio"
                            ? `${mensaje.substr(0, 10)}: $${mensaje.substr(
                                11,
                                mensaje.length
                              )}`
                            : `${mensaje.replace(" ", ": $")}`}
                        </Text>
                      ))}
                    </View>
                    <Text style={[styles.mensajeText, styles.mensajeTextadd1]}>
                      {device.Fecha}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  header: {
    height: 60,
    justifyContent: "center"
  },
  headerTitle: {
    height: "auto",
    width: null,
    backgroundColor: "#E8ECEF",
    justifyContent: "center",
    padding: 10,
    marginBottom: 5
  },
  headerText: { color: "#000000", letterSpacing: 1 },
  notificationView: {
    height: "auto",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
    margin: 5,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: "black",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2
      },
      android: {
        elevation: 5
      }
    })
  },
  notificationTitle: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 2.5
  },
  mensajeText: {
    paddingVertical: 2.5
  },
  mensajeTextadd1: {
    fontSize: 10,
    fontStyle: "italic",
    textAlignVertical: "bottom"
  },
  notificationTopView: {
    flexDirection: "row",
    width: null,
    height: "auto",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
