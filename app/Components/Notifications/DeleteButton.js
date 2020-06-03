import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Delete} from '../../Assets/Svg/Design/index';

export default class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  delete() {
    fetch(`http://api.ienergybook.com/api/notificaciones/${this.props.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        console.log(json);
        this.props.afterDelete();
      })
      .catch(err => {});
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.delete();
        }}>
        <Delete />
      </TouchableOpacity>
    );
  }
}
