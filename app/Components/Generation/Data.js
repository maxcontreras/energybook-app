import moment from 'moment/min/moment-with-locales';

import {
  GenIcon,
  Fe,
  Eco2E,
  AutoConsumo,
  Inyeccion,
} from '../../Assets/Svg/Variables/index';

import {n, date, mes} from '../../Assets/constants';

export function chartData(data, caption) {
  var newData = [];
  for (var i in data) {
    var mes = moment(
      `${data[i].date.substr(4, 4)}-${data[i].date.substr(2, 2)}-${data[
        i
      ].date.substr(0, 2)}`,
    )
      .locale('es')
      .format('MMMM');
    let upperCaseMonth = mes.charAt(0).toUpperCase() + mes.slice(1);
    var date = `${moment(
      `${data[i].date.substr(4, 4)}-${data[i].date.substr(2, 2)}-${data[
        i
      ].date.substr(0, 2)}`,
    )
      .locale('es')
      .format('dddd')},${data[i].date.substr(0, 2)}`;

    var hour = `${data[i].date.substr(8, 2)}:${data[i].date.substr(10, 2)}`;
    var wholeDate = `${date.charAt(0).toUpperCase() + date.slice(1)},${hour}`;

    // MI CHART DATA INICIAL (POR HORA)
    newData.push({
      mes: upperCaseMonth,
      label: wholeDate,
      value: data[i].value,
      color: '#1CD6BF',
      toolText: `<div id='divTable'><table id='dataTable' width='100px'><tr class=''><td>${wholeDate}</td></tr><tr><th>${caption}</th><td>${data[
        i
      ].value.toFixed(2)} kWh</td></tr></table></div>`,
    });
  }
  //POR MES
  let group = newData.reduce((r, a) => {
    r[a.mes] = [...(r[a.mes] || []), a];
    return r;
  }, {});

  var group2 = {
    data: [],
  };
  for (i in group) {
    group2.data.push(group[i]);
  }
  console.log('GROUP 2');
  console.log(group2.data);

  var perMonth = [];
  group2.data.forEach(element => {
    let total_mes = 0.0;
    for (i in element) {
      total_mes = total_mes + element[i].value;
    }
    perMonth.push({
      label: element[0].mes,
      value: total_mes,
      color: '#1CD6BF',
      toolText: `<div id='divTable'><table id='dataTable' width='100px'><tr class=''><td style="background-color:#1CD6BF;"><th>${caption}</th><td>${total_mes.toFixed(
        2,
      )} kWh</td></tr></table></div>`,
    });
  });
  return {newData, perMonth};
}

export function cardData(data) {
  var values = [
    {
      fecha: date + ' ' + n + ' ' + 'de' + ' ' + mes,
      data: [
        {
          Icon: GenIcon,
          title: 'Generación',
          value: data.generation.toFixed(2),
          unidad: 'kWh',
        },
        {
          Icon: AutoConsumo,
          title: 'Autoconsumo',
          value: data.selfConsumption.toFixed(2),
          unidad: 'kWh',
        },
        {
          Icon: Inyeccion,
          title: 'Inyección a la red',
          value: data.networkInjection.toFixed(2),
          unidad: 'kWh',
        },
      ],
    },
    {
      fecha: date + ' ' + n + ' ' + 'de' + ' ' + mes,
      data: [
        {
          Icon: GenIcon,
          title: 'Generación',
          value: '$',
          unidad: data.generationValue.toFixed(2),
        },
        {
          Icon: AutoConsumo,
          title: 'Autoconsumo',
          value: '$',
          unidad: data.selfConsumptionValue.toFixed(2),
        },
        {
          Icon: Inyeccion,
          title: 'Inyección a la red',
          value: '$',
          unidad: data.networkInjectionValue.toFixed(2),
        },
      ],
    },
    {
      fecha: mes,
      data: [
        {
          Icon: Eco2E,
          title: 'Eco2E',
          value: data.co2e.toFixed(2),
          unidad: 't',
        },
        {
          Icon: Fe,
          title: 'FE',
          value: data.emissionFactor.toFixed(2),
          unidad: ' ',
        },
      ],
    },
  ];
  return values;
}
