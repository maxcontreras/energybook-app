import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {CSButtons} from '../../Components/Global/index';
import {
  isPortrait,
  screenHeight,
  screenWidth,
  intervalsNC,
} from '../../Assets/constants';

export default class IntervalView extends Component {
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

  setInterval(value) {
    var steps = this.props.numSteps;
    var numSteps = [
      {
        filter: -1,
        min5: steps,
        min15: steps,
        min30: steps,
        hr: steps,
      },
      {filter: 0, min5: '12', min15: '4', min30: '2', hr: '1'},
      {filter: 1, min5: '12', min15: '4', min30: '2', hr: '1'},
      {filter: 2, min5: '288', min15: '96', min30: '48', hr: '24'},
    ];
    if (value == 900) {
      for (var i in numSteps) {
        if (this.props.filter == numSteps[i].filter) {
          steps = numSteps[i].min15;
        }
      }
    } else if (value == 1800) {
      for (var i in numSteps) {
        if (this.props.filter == numSteps[i].filter) {
          steps = numSteps[i].min30;
        }
      }
    } else if (value == 3600) {
      for (var i in numSteps) {
        if (this.props.filter == numSteps[i].filter) {
          steps = numSteps[i].hr;
        }
      }
    } else if (value == 300) {
      for (var i in numSteps) {
        if (this.props.filter == numSteps[i].filter) {
          steps = numSteps[i].min5;
        }
      }
    }
    this.props.functionInterval(value, steps);
  }

  render() {
    return (
      <View style={[styles.intervalButtons]}>
        {intervalsNC.map((boton, index) => (
          <CSButtons
            key={index}
            setFunction={this.setInterval.bind(this)}
            texto={boton.titulo}
            selected={this.props.interval}
            filter={boton.filter}
            width={Math.min(screenWidth, screenHeight) / 5.5}
            marginLeft={5}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  intervalButtons: {
    height: 'auto',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
