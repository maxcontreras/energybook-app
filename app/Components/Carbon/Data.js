import moment from 'moment/min/moment-with-locales';
import {
  GenIcon,
  Fe,
  Eco2E,
  ConsumoIcon,
  TotalIcon,
  LimiteIcon,
} from '../../Assets/Svg/Variables/index';

export function chartData(data) {
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
      value: data[i].co2e,
      color: '#1CD6BF',
      toolText: `<div id='divTable'><table id='dataTable' width='100px'><tr class=''><td>${wholeDate}</td></tr><tr ><th>Emisiones: </th><td>${data[
        i
      ].co2e.toFixed(2)}</td></tr></table></div>`,
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
      toolText: `<div id='divTable'><table id='dataTable' width='100px'><tr class=''><td style="background-color:#1CD6BF;"><th>Emisiones: </th><td>${total_mes.toFixed(
        2,
      )} T</td></tr></table></div>`,
    });
  });
  return {newData, perMonth};
}

export function buttonsData(filter) {
  const data1 = [
    {
      titulo: 'Calendario',
      selected: filter,
      filter: -1,
    },
    {
      titulo: 'Hoy',
      selected: filter,
      filter: 0,
    },
    {
      titulo: 'Ayer',
      selected: filter,
      filter: 1,
    },
    {
      titulo: 'Esta semana',
      selected: filter,
      filter: 2,
    },
    {
      titulo: 'Este mes',
      selected: filter,
      filter: 3,
    },
    {
      titulo: 'Este año',
      selected: filter,
      filter: 4,
    },
  ];

  return data1;
}

export function cardData(data) {
  var values = [
    {
      data: [
        {
          Icon: ConsumoIcon,
          title: 'Consumo',
          value: data.consumption.toFixed(2),
          unidad: 'kWh',
        },
        {
          Icon: GenIcon,
          title: 'Generación',
          value: data.generation.toFixed(2),
          unidad: 'kWh',
        },
        {
          Icon: TotalIcon,
          title: 'Total',
          value: data.total.toFixed(2),
          unidad: 'kWh',
        },
      ],
    },
    {
      data: [
        {
          Icon: Eco2E,
          title: 'Eco2e',
          value: 't',
          unidad: data.cO2Emissions.toFixed(2),
        },
      ],
    },
    {
      data: [
        {
          Icon: Fe,
          title: 'FE',
          value: data.emissionFactor.toFixed(2),
          unidad: ' ',
        },
        {
          Icon: LimiteIcon,
          title: 'Límite Eco2e',
          value: data.co2Limit.toFixed(2),
          unidad: ' ',
        },
      ],
    },
  ];
  return values;
}
