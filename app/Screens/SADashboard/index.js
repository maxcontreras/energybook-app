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
} from 'react-native';
import Menu from '../../Components/Role2Dashboard/Menu';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import SAmap from '../../Components/Admin/SAmap';
import {mesesito} from '../../Assets/constants';

const mapStateToProps = state => ({
  readings: state.dailyReducer,
  inCaseCoords: state.weatherReducer,
});

class SADashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      values: [],
      companies: [],
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
    console.log('SI ESTAS AQUI');
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
              `http://api.ienergybook.com/api/Companies?access_token=${
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
                var companies = {
                  data: [],
                };
                for (var i in json[1]) {
                  var name = json[1][i].company_name;
                  var coords = json[1][i].location;
                  var created_at = json[1][i].created_at;
                  companies.data.push({
                    company_name: name,
                    location: coords,
                    created_at: created_at,
                  });
                }
                this.setState({
                  companies: companies.data,
                });
                this.getDailyR();
              })
              .catch(err => {
                console.log('NO SE PUDO');
              });
          },
        );
      }
    } catch (error) {}
  };

  getDailyR() {
    fetch(
      `http://api.ienergybook.com/api/DesignatedMeters/?filter={"include":["services"],"where":{"company_id":"${
        this.state.values.companyId
      }"}}`,
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
        if (this._isMounted) {
          this.props.dispatch(getDailyReadings(json));
          this.getData();
        }
      })
      .catch(err => {});
  }

  UNSAFE_componentWillMount() {
    this._retrieveData();

    this._isMounted = true;
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  render() {
    var key = 0;
    console.log(mesesito[new Date('2019-12-25').getMonth()]);

    console.log(this.state.values);

    return (
      <SafeAreaView>
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          <KeyboardAvoidingView enabled>
            <View style={styles.container}>
              {this.props.readings && (
                <View style={styles.menu}>
                  <Menu screen={'SuperAdmin'} />
                </View>
              )}
              <View style={styles.infoContainer}>
                {this.state.companies.map(company => (
                  <View key={key++} style={styles.companyPart}>
                    <Text style={styles.CompanyText}>
                      {company.company_name}
                    </Text>
                    {company.created_at && (
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
                ))}
              </View>
              <View style={[styles.infoContainer, {height: 520}]}>
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

export default connect(mapStateToProps)(SADashboard);
const styles = StyleSheet.create({
  scroll: {
    flex: 0,
    height: 'auto',
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 'auto',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
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
  companyPart: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  CompanyText: {
    fontSize: 12,
    color: 'black',
    textTransform: 'uppercase',
  },
});
