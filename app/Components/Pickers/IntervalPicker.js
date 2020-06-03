import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Picker,
  Platform,
  ActionSheetIOS,
} from 'react-native';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

class IntervalPicker extends Component {
  constructor(props) {
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
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

  iosFunction(FILTERS, VARIABLES) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: FILTERS.concat('Cancelar'),
        cancelButtonIndex: FILTERS.length,
      },
      buttonIndex => {
        if (buttonIndex != FILTERS.indexOf('Cancelar')) {
          this.props.function(VARIABLES[buttonIndex], FILTERS[buttonIndex]);
        }
      },
    );
  }

  render() {
    const FILTERS =
      this.props.screen == 'charts'
        ? ['15 minutos', '5 minutos', '30 minutos', '1 hora']
        : ['15 minutos', '30 minutos', '1 hora'];
    const VARIABLES =
      this.props.screen == 'charts'
        ? [900, 300, 1800, 3600]
        : [900, 1800, 3600];
    let nextKey = 0;
    return (
      <View>
        {Platform.OS == 'ios' && (
          <View>
            <TouchableOpacity
              onPress={() => this.iosFunction(FILTERS, VARIABLES)}
              style={[styles.PickerIos]}>
              <Text style={[styles.unselectedButtonText]}>
                {this.props.selectedValue}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {Platform.OS == 'android' && (
          <View style={[styles.Picker]}>
            <Picker
              style={[styles.insidePicker]}
              selectedValue={this.props.selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                console.log(itemValue);
                this.props.function(itemIndex, itemValue);
              }}>
              {FILTERS.map(item => (
                <Picker.Item
                  label={item}
                  value={item}
                  key={nextKey++}
                  style={{fontSize: 10}}
                />
              ))}
            </Picker>
          </View>
        )}
      </View>
    );
  }
}

export default IntervalPicker;

const styles = StyleSheet.create({
  Picker: {
    height: 30,
    backgroundColor: 'white',
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#737373',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.min(screenWidth, screenHeight) / 2.5,
  },
  PickerIos: {
    borderWidth: 1,
    borderColor: '#737373',
    borderRadius: 20,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    width: Math.min(screenWidth, screenHeight) / 2.5,
  },
  unselectedButtonText: {
    color: 'black',
    fontSize: 10,
  },
  insidePicker: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.min(screenWidth, screenHeight) / 2.3,
  },
});
