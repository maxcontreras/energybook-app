import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {CardsCompL, CardsCompP} from '../../Components/Charts/index.js';
import {isPortrait} from '../../Assets/constants';

export default class Cards extends Component {
  constructor(props) {
    isPortrait();
    super(props);
    this.state = {
      pickerValue: this.props.pickerValue,
      orientation: isPortrait() ? 'portrait' : 'landscape',
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
      <View style={styles.cardView}>
        {this.state.orientation == 'portrait' && !this.props.indicator && (
          <CardsCompP
            data={this.props.propsData}
            cardVariable={this.props.cardVariable}
          />
        )}
        {this.state.orientation == 'landscape' && !this.props.indicator && (
          <CardsCompL
            data={this.props.propsData}
            cardVariable={this.props.cardVariable}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardView: {
    height: 'auto',
    width: '100%',
    marginTop: 10,
  },
});
