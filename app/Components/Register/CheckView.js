import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {CheckBox} from 'react-native-elements';

export default class CheckView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  sendChecked() {
    this.setState({checked: !this.state.checked}, () => {
      this.props.setChecked(this.state.checked);
    });
  }

  render() {
    return (
      <View style={styles.checkView}>
        <CheckBox
          checkedColor="black"
          checked={this.state.checked}
          onPress={() => this.sendChecked()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkView: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
