//RETURNS SWIPER OR CARDS DEPENDING ON ORIENTATION
import React, {Component} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {CardsCompL, CardsCompP} from '../../Components/Carbon/index';
import {isPortrait} from '../../Assets/constants';

export default class CardView extends Component {
  constructor(props) {
    isPortrait();
    super(props);
    this.state = {
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
    return this.state.orientation == 'portrait' ? (
      <CardsCompP response={this.props.response} />
    ) : (
      <CardsCompL response={this.props.response} />
    );
  }
}
