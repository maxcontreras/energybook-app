import {Dimensions, PixelRatio, Platform} from 'react-native';
import moment from 'moment/min/moment-with-locales';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

import {
  Cloudy,
  CloudyDay1,
  CloudyNight1,
  Day,
  Night,
  Rainy5,
  Rainy6,
  Rainy7,
  RainySun2,
  Snowy6,
  SnowySun3,
  Thunder,
} from '../Assets/Svg/WeatherSvg/index';

//DATE HELPERS ------------------------------------------------------------------------------------------

export const n = new Date().getDate();
var month = new Date().getMonth() + 1;
var d = new Date();
var weekday = new Array(7);
weekday[0] = 'Domingo';
weekday[1] = 'Lunes';
weekday[2] = 'Martes';
weekday[3] = 'Miércoles';
weekday[4] = 'Jueves';
weekday[5] = 'Viernes';
weekday[6] = 'Sábado';
export const date = weekday[d.getDay()];
var d = new Date();
var month = new Array();
month[0] = 'Enero';
month[1] = 'Febrero';
month[2] = 'Marzo';
month[3] = 'Abril';
month[4] = 'Mayo';
month[5] = 'Junio';
month[6] = 'Julio';
month[7] = 'Agosto';
month[8] = 'Septiembre';
month[9] = 'Octubre';
month[10] = 'Noviembre';
month[11] = 'Diciembre';
export const mes = month[d.getMonth()];
export const mesesito = month;

export const diaInicial = moment()
  .locale('es')
  .format('dddd');
export const diaNumInicial = moment()
  .locale('es')
  .format('DD');
export const mesInicial = moment()
  .locale('es')
  .format('MMMM');

//D I M E N S I O N S ----------------------------------------------------
export const screenHeight = Math.round(Dimensions.get('window').height);
export const screenWidth = Math.round(Dimensions.get('window').width);

export function getCardWidth(number) {
  const cardWidthIos =
    (Math.max(screenHeight, screenWidth) -
      (Math.max(
        StaticSafeAreaInsets.safeAreaInsetsTop,
        StaticSafeAreaInsets.safeAreaInsetsRight,
      ) +
        Math.max(
          StaticSafeAreaInsets.safeAreaInsetsBottom,
          StaticSafeAreaInsets.safeAreaInsetsLeft,
        ))) /
    number;

  const cardWidthAndroid = Math.max(screenHeight, screenWidth) / number;
  return Platform.OS == 'android' ? cardWidthAndroid : cardWidthIos;
}

export function getFontSize(tipo) {
  // small - mid - large
  if (PixelRatio.get() <= 1) {
    var title = tipo == 'small' ? 8 : tipo == 'mid' ? 9 : 10;
    var normal = tipo == 'small' ? 7 : tipo == 'mid' ? 8 : 9;
  } else if (PixelRatio.get() <= 2) {
    var title = tipo == 'small' ? 9 : tipo == 'mid' ? 10 : 11;
    var normal = tipo == 'small' ? 8 : tipo == 'mid' ? 9 : 10;
  } else if (PixelRatio.get() <= 3) {
    var title = tipo == 'small' ? 10 : tipo == 'mid' ? 11 : 12;
    var normal = tipo == 'small' ? 9 : tipo == 'mid' ? 10 : 11;
  } else if (PixelRatio.get() <= 3.5) {
    var title = tipo == 'small' ? 11 : tipo == 'mid' ? 12 : 13;
    var normal = tipo == 'small' ? 10 : tipo == 'mid' ? 11 : 12;
  }
  return {title, normal};
}
export const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

//SWIPER CONFIG---------------------

export const swiperDaily = {
  dotsTouchable: true,
  nextTitle: ' ',
  prevTitle: ' ',

  dotActiveStyle: {
    backgroundColor: '#aefb0f',
  },
};

export const EffSwiperOptions = {
  dotsTouchable: true,
  nextTitle: '>',
  prevTitle: '<',
  prevTitleStyle: {
    paddingTop: 5,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#586365',
  },
  nextTitleStyle: {
    paddingTop: 5,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#586365',
  },
  dotActiveStyle: {
    backgroundColor: '#aefb0f',
  },
};

//DATA CONSTANTS -----------------------------

//  F I L T E R S

export const filtersGeneration = [
  {
    titulo: 'Calendario',
    filter: -1,
  },
  {
    titulo: 'Hoy',
    filter: 0,
  },
  {
    titulo: 'Ayer',
    filter: 1,
  },
  {
    titulo: 'Esta semana',
    filter: 2,
  },
  {
    titulo: 'Este mes',
    filter: 3,
  },
  {
    titulo: 'Este año',
    filter: 4,
  },
];

export const filtersCharts = [
  {
    titulo: 'Calendario',
    filter: -1,
  },
  {
    titulo: 'Hoy',
    filter: 0,
  },
  {
    titulo: 'Ayer',
    filter: 1,
  },
  {
    titulo: 'Esta semana',
    filter: 2,
  },
  {
    titulo: 'Este mes',
    filter: 3,
  },
];

export const filtersNC = [
  {
    titulo: 'Calendario',
    filter: -1,
  },
  {
    titulo: 'Hoy',
    filter: 0,
  },
  {
    titulo: 'Ayer',
    filter: 1,
  },
  {
    titulo: 'Esta semana',
    filter: 2,
  },
];

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const stepsCharts = [
  {interval: 300, steps1: '12', steps2: '288'},
  {interval: 900, steps1: '4', steps2: '96'},
  {interval: 1800, steps1: '2', steps2: '48'},
  {interval: 3600, steps1: '1', steps2: '24'},
];

export const intervalsCharts = [
  {
    titulo: '1 hora',
    filter: 3600,
  },
  {
    titulo: '30 minutos',
    filter: 1800,
  },
  {
    titulo: '15 minutos',
    filter: 900,
  },
  {
    titulo: '5 minutos',
    filter: 300,
  },
];

export const dataGeneration = [
  {filterS: 'Calendario', filter: -1, steps: '24'},
  {filterS: 'Hoy', filter: 0, steps: '1'},
  {filterS: 'Ayer', filter: 1, steps: '1'},
  {filterS: 'Esta semana', filter: 2, steps: '24'},
  {filterS: 'Este mes', filter: 3, steps: '24'},
  {filterS: 'Este año', filter: 4, steps: '1'},
];

export const variablesGene = [
  {
    titulo: 'Generación',
    filter: 0,
  },
  {
    titulo: 'Autoconsumo',
    filter: 1,
  },
  {
    titulo: `Inyección${'\n'}a la red`,
    filter: 2,
  },
];

export const intervalsNC = [
  {
    titulo: '1 hora',
    filter: 3600,
  },
  {
    titulo: '30 minutos',
    filter: 1800,
  },
  {
    titulo: '15 minutos',
    filter: 900,
  },
  {
    titulo: '5 minutos',
    filter: 300,
  },
];
export const variablesNC = [
  {
    titulo: 'Voltaje',
    filter: ['Vab', 'Vbc', 'Vca'],
    values: [],
  },
  {
    titulo: 'Amperaje',
    filter: ['Ia', 'Ib', 'Ic'],
    values: [],
  },
  {
    titulo: 'THD',
    filter: ['THDIa', 'THDIb', 'THDIc'],
    values: [],
  },
  {
    titulo: 'Desbalance',
    filter: ['Vunbl', 'Iunbl'],
    values: [],
  },
  {
    titulo: 'kVA',
    filter: ['Ssist'],
    values: [],
  },
  {
    titulo: 'FP',
    filter: ['FPa', 'FPb', 'FPc'],
    values: [],
  },
];

export const homeInputs = [
  {secureTextEntry: false, title: 'USUARIO', button: false},
  {secureTextEntry: true, title: 'CONTRASEÑA', button: true},
];

export const inputsRegister = [
  {secure: false, cap: 'sentences', key: 'name', placeholder: 'Nombre'},
  {secure: false, cap: 'sentences', key: 'lastname', placeholder: 'Apellido'},
  {secure: false, cap: 'none', key: 'email', placeholder: 'Email'},
  {secure: true, cap: 'none', key: 'password', placeholder: 'Contraseña'},
  {
    secure: true,
    cap: 'none',
    key: 'confirmPassword',
    placeholder: 'Confirma tu contraseña',
  },
  {secure: false, cap: 'sentences', key: 'company', placeholder: 'Compañia'},
  {secure: false, cap: 'sentences', key: 'phone', placeholder: 'Telefono'},
  {secure: false, cap: 'sentences', key: 'state', placeholder: 'Estado'},
];

export const formIndications =
  'Llena este formulario para obtener una versión demo de nuestro Software de Gestión y Eficiencia Energética.';

export const privacyText = `${'\n'}${'\n'}En términos de lo previsto en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (en lo sucesivo denominada como “la Ley”), Energybook, establece el presente Aviso de Privacidad de conformidad con lo siguiente: Términos y Condiciones${'\n'}${'\n'}1. El presente Aviso de Privacidad tiene por objeto la protección de los datos personales de los integrantes de la comunidad, mediante su tratamiento legítimo, controlado e informado, a efecto de garantizar su privacidad, así como tu derecho a la autodeterminación informativa.${'\n'}${'\n'}2.- Dato Personal es Cualquier información concerniente a una persona física identificada o identificable.${'\n'}${'\n'}3- Al proporcionar tus Datos Personales por escrito, a través de una solicitud, formato en papel, formato digital, correo electrónico, o cualquier otro documento, aceptas y autorizas a la Energybook a utilizar y tratar de forma automatizada tus datos personales e información suministrados, los cuales formarán parte de nuestra base de datos con la finalidad de usarlos, en forma enunciativa, más no limitativa, para: identificarte, ubicarte, comunicarte, contactarte, enviarte información y/o bienes, así como para enviarlos y/o transferirlos a terceros, dentro y fuera del territorio nacional, por cualquier medio que permita la ley para cumplir con nuestros fines sociales.`;

export const weatherIcons = [
  {title: '03d', Icon: Cloudy},
  {title: '03n', Icon: Cloudy},
  {title: '04n', Icon: Cloudy},
  {title: '04d', Icon: Cloudy},
  {title: '02d', Icon: CloudyDay1},
  {title: '02n', Icon: CloudyNight1},
  {title: '01d', Icon: Day},
  {title: '01n', Icon: Night},
  {title: '10n', Icon: Rainy5},
  {title: '09d', Icon: Rainy6},
  {title: '09n', Icon: Rainy6},
  {title: '50d', Icon: Rainy7},
  {title: '50n', Icon: Rainy7},
  {title: '10d', Icon: RainySun2},
  {title: '13n', Icon: Snowy6},
  {title: '13d', Icon: SnowySun3},
  {title: '11d', Icon: Thunder},
  {title: '11n', Icon: Thunder},
];
