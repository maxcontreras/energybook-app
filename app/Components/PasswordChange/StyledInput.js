import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {AlertSVG} from '../../Assets/Svg/Design/index';

function StyledInput({label, formikProps, formikKey, placeholder, ...rest}) {
  return (
    <View>
      <TextInput
        style={styles.input2}
        placeholder={placeholder}
        placeHolderTextColor="black"
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        autoCapitalize="none"
        returnKeyType="done"
        {...rest}
      />
      {formikProps.touched[formikKey] && formikProps.values[formikKey] == '' && (
        <View style={styles.alertV}>
          <Text style={styles.alert}>{formikProps.errors[formikKey]}</Text>
          <AlertSVG />
        </View>
      )}
    </View>
  );
}

export default StyledInput;

const styles = StyleSheet.create({
  alert: {
    color: 'red',
    fontSize: 10,
    textAlign: 'right',
    paddingRight: 10,
  },
  alertV: {
    padding: 10,
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input2: {
    borderRadius: 10,
    marginBottom: 5,
    height: 40,
    backgroundColor: '#F2F4FA',
    paddingLeft: 10,
  },
});
