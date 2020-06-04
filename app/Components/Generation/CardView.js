import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {CardsCompL, CardsCompP} from './index';
import {isPortrait} from '../../Assets/constants';
import AsyncStorage from '@react-native-community/async-storage';
import {summatory} from './Data';

export default class CardView extends Component {
  constructor(props) {
    isPortrait();
    super(props);
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      values: [],
      selfconsumption: 0.0,
      network: 0.0,
      generation: 0.0,
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
    this._retrieveData();
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
            this.getALL();
          },
        );
      }
    } catch (error) {}
  };
  getALL = async () => {
    this.setState({
      flag: false,
    });
    try {
      const selfconsumption = await summatory(this.state.values.accesToken, {
        id: this.props.id,
        device: this.props.device,
        service: this.props.service,
        filter: 3,
        interval: 3600,
        variable: 1,
        custom_dates: null,
        flag: false,
      });
      const generation = await summatory(this.state.values.accesToken, {
        id: this.props.id,
        device: this.props.device,
        service: this.props.service,
        filter: 3,
        interval: 3600,
        variable: 0,
        custom_dates: null,
        flag: false,
      });
      const networkinjection = await summatory(this.state.values.accesToken, {
        id: this.props.id,
        device: this.props.device,
        service: this.props.service,
        filter: 3,
        interval: 3600,
        variable: 2,
        custom_dates: null,
        flag: false,
      });
      if (
        selfconsumption != null &&
        generation != null &&
        networkinjection != null
      ) {
        this.setState({
          selfconsumption: selfconsumption
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          generation: generation
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          network: networkinjection
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          flag: true,
        });
      }
    } catch (error) {}
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.orientation == 'portrait' && this.state.flag && (
          <CardsCompP
            response={this.props.response}
            network={this.state.network}
            selfconsumption={this.state.selfconsumption}
            generation={this.state.generation}
          />
        )}
        {this.state.orientation == 'landscape' && this.state.flag && (
          <CardsCompL
            response={this.props.response}
            network={this.state.network}
            selfconsumption={this.state.selfconsumption}
            generation={this.state.generation}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
});
