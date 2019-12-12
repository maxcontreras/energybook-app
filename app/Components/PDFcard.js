import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking
} from "react-native";
import Orientation from "react-native-orientation";
import AsyncStorage from "@react-native-community/async-storage";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

export default class PDFcard extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    this.state = {
      url: "",
      dailyTCC: "",
      values: [],
      pdfs: [],
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }

  componentWillMount() {
    this.setState({
      pdfs: this.props.pdfs
    });
  }

  goToLink(url) {
    Linking.openURL(url);
  }

  render() {
    var key = 0;
    return (
      <View>
        {this.state.pdfs.length != 0 && (
          <View>
            {this.state.pdfs.map(file => (
              <View key={key++} style={{ flex: 1 }}>
                <Card
                  title={file.title}
                  containerStyle={[styles.infoContainer, { padding: 0 }]}
                  titleStyle={styles.titleStyle}
                  wrapperStyle={{ borderRadius: 10 }}
                >
                  <View
                    key={key++}
                    style={[styles.infoContainer, { width: "100%" }]}
                  >
                    <View style={styles.infoContainer2}>
                      <View style={[styles.infoSeccion, { flex: 0.5 }]}>
                        <Text style={{ fontSize: 15 }}>{file.number}</Text>
                      </View>

                      <View style={styles.infoSeccion}>
                        <Text style={{ fontSize: 15, textAlign: "justify" }}>
                          {file.description}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.infoContainer2}>
                      <View style={[styles.infoSeccion, { height: 60 }]}>
                        <Text style={{ fontSize: 10 }}>
                          {`ULTIMA ACTUALIZACIÓN: ${file.date.substr(0, 10)}`}
                        </Text>
                      </View>
                      <View style={[styles.infoSeccion, { flex: 0.7 }]}>
                        <Icon
                          name="ios-checkmark-circle"
                          size={30}
                          color="#21900F"
                        />
                      </View>
                    </View>
                  </View>
                </Card>
                <View style={[styles.infoSeccion, { height: 60 }]}>
                  <TouchableOpacity
                    style={styles.blueButton}
                    onPress={() => this.goToLink(file.pdfFile)}
                  >
                    <Text style={{ color: "#FFFFFF", fontSize: 15 }}>
                      VER PDF
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }
}

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  header: {
    height: 60,
    justifyContent: "center"
  },
  headerTitle: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.2
  },
  container: {
    flex: 1,
    height: "auto",
    paddingBottom: 20,
    backgroundColor: "white"
  },
  tableHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerSeccion: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  seccionText: { fontSize: 15 },
  infoContainer: {
    flex: 1,
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
    })
  },
  titleStyle: {
    color: "black",
    fontSize: 15,
    fontWeight: "normal",
    margin: 10,
    textAlign: "center",
    justifyContent: "center"
  },

  infoContainer2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%"
  },
  infoSeccion: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  blueButton: {
    height: 40,
    width: 100,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3791F4",
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
  }
});
