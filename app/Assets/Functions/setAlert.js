import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export function alert(text) {
  return Alert.alert('Error', text, [
    {
      text: 'Ok',
    },
  ]);
}

export function alertRegister(statusCode, functionParam) {
  if (statusCode == 200) {
    return Alert.alert('Registro completo!', 'Por favor, inicia sesión', [
      {
        text: 'Ok',
        onPress: functionParam,
      },
    ]);
  } else if (statusCode == 422) {
    return Alert.alert('Lo sentimos', 'Ese correo ya está registrado.', [
      {
        text: 'Ok',
      },
    ]);
  } else {
    return Alert.alert('Lo sentimos', 'Hubo un error al registrar tus datos.', [
      {
        text: 'Ok',
      },
    ]);
  }
}

export function alertPassword(statusCode, functionParam) {
  if (statusCode == 400) {
    Alert.alert('Lo siento', 'La contraseña actual no existe', [
      {
        text: 'Ok',
      },
    ]);
  } else if (statusCode == 200) {
    Alert.alert('Listo', 'La contraseña ha sido cambiada con éxito.', [
      {
        text: 'Ok',
        onPress: functionParam,
      },
    ]);
  }
}
