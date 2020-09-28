//VIEW FOR INTERVAL BUTTONS
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CSButtons} from '../../Components/Global/index';
import {screenHeight, screenWidth} from '../../Assets/constants';

export default class IntervalButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.timeButtons]}>
        <View style={[styles.timeButtons, {width: null, paddingRight: 0}]}>
          <CSButtons
            setFunction={this.props.setNewInterval}
            texto={'Cada hora'}
            selected={this.props.newInterval}
            filter={-1}
            width={Math.min(screenWidth, screenHeight) / 5.6}
            marginLeft={5}
          />
          <CSButtons
            setFunction={this.props.setNewInterval}
            texto={'Cada día'}
            selected={this.props.newInterval}
            filter={0}
            width={Math.min(screenWidth, screenHeight) / 5.6}
            marginLeft={5}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timeButtons: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom: 10,
    paddingRight: 10,
    width: '100%',
    marginTop: 5,
  },
});
