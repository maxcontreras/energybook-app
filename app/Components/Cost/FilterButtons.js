//VIEW FOR FILTER BUTTONS
import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {CSButtons} from '../../Components/Global/index';
import {screenHeight, screenWidth, isPortrait} from '../../Assets/constants';
export default class FilterButtons extends Component {
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
    return (
      <View
        style={[
          styles.optionButtonsView,
          {
            justifyContent:
              this.state.orientation == 'portrait'
                ? 'space-between'
                : 'flex-end',
          },
        ]}>
        {this.props.filtersCharts.map((boton, index) => (
          <CSButtons
            key={index}
            setFunction={
              boton.titulo == 'Calendario'
                ? this.props.Calendario
                : this.props.setFilter
            }
            texto={boton.titulo}
            selected={this.props.filter}
            filter={boton.filter}
            width={Math.min(screenWidth, screenHeight) / 5.6}
            marginLeft={boton.titulo == 'Calendario' ? 0 : 5}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pCalendarView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lCalendarView: {
    width: '100%',
    flexDirection: 'column',
    flex: 0.5,
  },
  timeButtons: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom: 10,
    paddingRight: 10,
    width: '100%',
    marginTop: 5,
  },
  optionButtonsView: {
    height: 'auto',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    marginTop: 5,
  },
});
