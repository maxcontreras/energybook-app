import React, {Component, PropTypes} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {Menu, Part1, Part2} from '../../Components/Role2Dashboard/index';
import {isPortrait} from '../../Assets/constants';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  readings: state.dailyReducer,
  adminIds: state.adminReducer,
});

class Role2Dashboard extends Component {
  constructor(props) {
    super(props);
    isPortrait();
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

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          <KeyboardAvoidingView enabled>
            <View style={styles.container}>
              {this.props.readings && (
                <View style={styles.menu}>
                  <Menu
                    screen={'Role2Dashboard'}
                    navigation={this.props.navigation}
                  />
                </View>
              )}
              {this.props.readings && (
                <View
                  style={
                    this.state.orientation == 'portrait'
                      ? styles.containerP
                      : styles.containerL
                  }>
                  <Part1
                    adminMeterId={this.props.adminIds.meter_id}
                    companyId={this.props.adminIds.company_id}
                    city={this.props.adminIds.city}
                    Division={this.props.adminIds.Division}
                    meterId={
                      this.props.adminIds.meter_id != ''
                        ? this.props.adminIds.meter_id
                        : this.props.readings.meterId
                    }
                  />
                  <Part2
                    dp={this.props.readings.dp}
                    maxVal={this.props.readings.maxVal}
                    minVal={this.props.readings.minVal}
                    adminMeterId={this.props.adminIds.meter_id}
                    devices={this.props.readings.devices}
                    meterId={this.props.readings.meterId}
                  />
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(Role2Dashboard);
const styles = StyleSheet.create({
  scroll: {
    flex: 0,
    height: 'auto',
    flexGrow: 1,
  },
  containerP: {
    flex: 1,
    backgroundColor: 'white',
    height: 'auto',
    width: '100%',
  },
  containerL: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 'auto',
    width: '100%',
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto',
  },
});
