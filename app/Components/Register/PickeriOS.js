import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActionSheetIOS,
} from 'react-native';
import {screenWidth, screenHeight} from '../../Assets/constants';

export default class PickeriOS extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const FILTERS = this.props.filters;
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            ActionSheetIOS.showActionSheetWithOptions(
              {
                options: FILTERS.concat('Cancelar'),
                cancelButtonIndex: FILTERS.length,
              },
              buttonIndex => {
                if (buttonIndex != FILTERS.indexOf('Cancelar')) {
                  this.props.function(FILTERS[buttonIndex], this.props.type);
                }
              },
            )
          }
          style={[styles.PickerIos]}>
          <Text style={[styles.unselectedButtonText]}>
            {this.props.selectedValue}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  PickerIos: {
    borderWidth: 1,
    borderColor: '#737373',
    borderRadius: 20,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    width: Math.min(screenHeight, screenWidth) / 2,
  },
  unselectedButtonText: {
    color: 'black',
    fontSize: 10,
  },
});
