import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
import Menu from "../../Components/PrincipalScreenC/Menu.js";
import StaticSafeAreaInsets from "react-native-static-safe-area-insets";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import SAmap from "../../Components/SAmap";
import { mesesito } from "../../Components/Fecha";
import { setAdminIds } from "../../../Actions/Actions.js";

const mapStateToProps = state => ({
  readings: state.dailyReducer,
  inCaseCoords: state.weatherReducer
});

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape",
      values: [],
      companies: [],
      bothIds: []
    };
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    this._retrieveData();
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
              `http://192.168.1.66:3000/api/Companies?access_token=${this.state.values.accesToken}`,
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                }
              }
            )
              .then(res => {
                this.state.statusCode = res.status;
                const data = res.json();
                return Promise.all([this.state.statusCode, data]);
              })
              .then(json => {
                console.log(json);
                var companies = {
                  data: []
                };
                for (var i in json[1]) {
                  var name = json[1][i].company_name;
                  var coords = json[1][i].location;
                  var created_at = json[1][i].created_at;
                  var id = json[1][i].id;
                  var city = json[1][i].city;
                  companies.data.push({
                    company_name: name,
                    location: coords,
                    created_at: created_at,
                    company_id: id,
                    city: city
                  });
                }
                this.setState({
                  companies: companies.data
                });
                console.log(this.state.companies);
                this.getIds();
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
    this._isMounted = true;
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }
  navigate(company_id, company_name, city) {
    fetch(
      `http://api.ienergybook.com/api/DesignatedMeters/?filter={"include":["services"],"where":{"company_id":"${company_id}"}}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        console.log(json);
        const array = [
          {
            company_id: company_id,
            meter_id: json[1][0].meter_id,
            city: city,
            company_name: company_name
          }
        ];
        this.props.dispatch(setAdminIds(array));
        this.props.navigation.navigate("Role2Dashboard");
      })
      .catch(err => {});
  }

  render() {
    const insetsIos =
      (Math.max(screenHeight, screenWidth) -
        (Math.max(
          StaticSafeAreaInsets.safeAreaInsetsTop,
          StaticSafeAreaInsets.safeAreaInsetsRight
        ) +
          Math.max(
            StaticSafeAreaInsets.safeAreaInsetsBottom,
            StaticSafeAreaInsets.safeAreaInsetsLeft
          ))) /
      2;
    const insetsAndroid = Math.max(screenHeight, screenWidth) / 2;
    var key = 0;
    console.log(mesesito[new Date("2019-12-25").getMonth()]);

    return (
      <SafeAreaView>
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          <KeyboardAvoidingView enabled>
            <View style={styles.container}>
              {this.props.readings && (
                <View style={styles.menu}>
                  <Menu screen={"SuperAdmin"} />
                </View>
              )}

              <View style={styles.infoContainer}>
                {this.state.companies.map(company => (
                  <TouchableOpacity
                    key={key++}
                    style={styles.companyButton}
                    onPress={() =>
                      this.navigate(
                        company.company_id,
                        company.company_name,
                        company.city
                      )
                    }
                  >
                    <View style={styles.companyPart}>
                      <Text style={styles.CompanyText}>
                        {company.company_name}
                      </Text>
                      {company.created_at && (
                        <Text style={styles.CompanyText}>
                          {`${company.created_at.substr(8, 2)} de ${
                            mesesito[
                              new Date(
                                company.created_at.substr(0, 10)
                              ).getMonth()
                            ]
                          } de ${company.created_at.substr(0, 4)}`}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={[styles.infoContainer, { height: 520 }]}>
                {this.props.inCaseCoords.ftcoords[1] && (
                  <SAmap coords={this.state.companies} />
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(AdminDashboard);

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  scroll: {
    flex: 0,
    height: "auto",
    flexGrow: 1
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    height: "auto"
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white"
  },
  companyPart: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%"
  },
  CompanyText: {
    fontSize: 12,
    color: "black",
    textTransform: "uppercase"
  },
  companyButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: 5,
    padding: 10,
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
