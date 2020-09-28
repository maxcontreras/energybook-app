//DAILY CARD AND MONTHLY CARD FOR DASHBOARD
import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Daily, Monthly, PrecioCFEPeriodo} from './index';
import {
  isPortrait,
  screenHeight,
  screenWidth,
  getCardWidth,
} from '../../Assets/constants';
const cardWidth = getCardWidth(2);
export default class Part1 extends Component {
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
  static navigationOptions = {
    header: null,
  };

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  render() {
    return (
      <View
        style={[
          this.state.orientation == 'portrait'
            ? styles.containerP
            : styles.containerL,
        ]}>
        {this.props.adminMeterId != null && (
          <Daily
            adminMeterId={this.props.adminMeterId}
            companyId={this.props.companyId}
            city={this.props.city}
            Division={this.props.Division}
          />
        )}
        <Monthly
          meterId={
            this.props.adminMeterId != ''
              ? this.props.adminMeterId
              : this.props.meterId
          }
        />
        {this.state.orientation == 'landscape' && <PrecioCFEPeriodo />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerP: {
    justifyContent: 'center',
    width: Math.min(screenHeight, screenWidth),
  },
  containerL: {
    width: cardWidth,
    justifyContent: 'space-between',
  },
});
