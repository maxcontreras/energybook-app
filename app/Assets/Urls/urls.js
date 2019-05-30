/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const apiEndpoint = 'http://localhost:3000/api/eUsers/login';

class UrlAppi extends Component {
  render() {
    return (
      <apiEndpoint/>
    );
  }
}

export default UrlAppi;
