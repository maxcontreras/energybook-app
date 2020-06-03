import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class CompanyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text style={styles.categoryText}>Email</Text>
        <View style={styles.textView}>
          <Text style={styles.infoText}>{this.props.email}</Text>
        </View>
        <Text style={styles.companyText}>Mi compañía</Text>
        <View>
          {this.props.data.map((file, index) => (
            <View key={index}>
              <Text style={styles.categoryText}>{file.titulo}</Text>
              <View style={styles.textView}>
                <Text style={styles.infoText}>{file.valor}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textView: {
    borderRadius: 10,
    marginBottom: 5,
    height: 'auto',
    backgroundColor: '#E8ECEF',
    width: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  infoText: {
    color: 'black',
    fontSize: 13,
  },
  categoryText: {
    color: 'black',
    fontSize: 13,
    padding: 10,
    textAlign: 'left',
  },
  companyText: {
    color: 'black',
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  },
});
