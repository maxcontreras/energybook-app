import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

function StyledInput({label, formikProps, formikKey, placeholder, ...rest}) {
  return (
    <View>
      <TextInput
        style={[
          styles.input2,
          {
            borderWidth:
              formikProps.touched[formikKey] &&
              formikProps.values[formikKey] == ''
                ? 1
                : 0,
            borderColor:
              formikProps.touched[formikKey] &&
              formikProps.values[formikKey] == ''
                ? 'red'
                : null,
          },
        ]}
        placeholder={placeholder}
        placeHolderTextColor="black"
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        autoCapitalize="none"
        returnKeyType="done"
        {...rest}
      />
      {formikProps.touched[formikKey] && (
        <Text style={styles.alert}>{formikProps.errors[formikKey]}</Text>
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
    paddingBottom: 10,
  },
  input2: {
    borderRadius: 10,
    marginBottom: 5,
    height: 40,
    backgroundColor: '#F2F4FA',
    paddingLeft: 10,
  },
});
