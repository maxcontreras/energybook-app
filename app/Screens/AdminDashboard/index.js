import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Menu from '../../Components/Role2Dashboard/Menu.js';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import SAmap from '../../Components/Admin/SAmap';
import {setAdminIds} from '../../../Actions/Actions.js';
import {isPortrait, mesesito} from '../../Assets/constants';

const mapStateToProps = state => ({
  readings: state.dailyReducer,
  inCaseCoords: state.weatherReducer,
});

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      values: [],
      companies: [],
      bothIds: [],
      aver: false,
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
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

            fetch(
              `http://api.ienergybook.com/api/Companies?filter={"where":{"id":"${
                this.state.values.companyId
              }"}}&access_token=${this.state.values.accesToken}`,
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
                if (json[1][0].Administrando != null) {
                  console.log('si lo agarra');
                  for (var j in json[1][0].Administrando) {
                    console.log(json[1][0].Administrando[j]);
                    this.getOtherCompanies(json[1][0].Administrando[j]);
                  }
                }
              })
              .catch(err => {
                console.log('NO SE PUDO');
              });
          },
        );
      }
    } catch (error) {}
  };

  getOtherCompanies(companyId) {
    fetch(
      `http://api.ienergybook.com/api/Companies?filter={"where":{"id":"${companyId}"}}&access_token=${
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
        if (json[1][0].length != 0) {
          const name = json[1][0].company_name;
          const coords = json[1][0].location;
          const created_at = json[1][0].created_at;
          const id = json[1][0].id;
          const city = json[1][0].city;
          const tipoTarif = json[1][0].tariff_type;
          this.state.companies.push({
            company_name: name,
            location: coords,
            created_at: created_at,
            company_id: id,
            city: city,
            tipoTarif: tipoTarif,
          });
        }
        this.setState({
          aver: true,
        });
      })
      .catch(err => {
        console.log('NO SE PUDO');
      });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
  navigate(company_id, company_name, city, tipoTarif) {
    fetch(
      `http://api.ienergybook.com/api/DesignatedMeters/?filter={"include":["services"],"where":{"company_id":"${company_id}"}}`,
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
        const array = [
          {
            company_id: company_id,
            meter_id: json[1][0].meter_id,
            city: city,
            company_name: company_name,
            tipoTarif: tipoTarif,
          },
        ];
        this.props.dispatch(setAdminIds(array));
        this.props.navigation.navigate('Role2Dashboard');
      })
      .catch(err => {});
  }

  render() {
    var key = 0;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          <KeyboardAvoidingView enabled>
            <View style={styles.container}>
              {this.props.readings && (
                <View style={styles.menu}>
                  <Menu screen={'SuperAdmin'} />
                </View>
              )}
              {this.state.aver && (
                <View style={styles.infoContainer}>
                  {this.state.companies.map(company => (
                    <TouchableOpacity
                      key={key++}
                      style={styles.companyButton}
                      onPress={() =>
                        this.navigate(
                          company.company_id,
                          company.company_name,
                          company.city,
                          company.tipoTarif,
                        )
                      }>
                      <View style={styles.companyPart}>
                        <Text style={styles.CompanyText}>
                          {company.company_name}
                        </Text>
                        {company.created_at != '' && (
                          <Text style={styles.CompanyText}>
                            {`${company.created_at.substr(8, 2)} de ${
                              mesesito[
                                new Date(
                                  company.created_at.substr(0, 10),
                                ).getMonth()
                              ]
                            } de ${company.created_at.substr(0, 4)}`}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <View style={[styles.mapContainer, {height: 520}]}>
                {this.state.companies.length != 0 && (
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
const styles = StyleSheet.create({
  scroll: {
    flex: 0,
    height: 'auto',
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: 'auto',
    paddingBottom: 20,
  },
  mapContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  companyPart: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  CompanyText: {
    fontSize: 12,
    color: 'black',
    textTransform: 'uppercase',
  },
  companyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
