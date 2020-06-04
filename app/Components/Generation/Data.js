import moment from 'moment/min/moment-with-locales';

import {
  GenIcon,
  AutoConsumo,
  Inyeccion,
} from '../../Assets/Svg/Variables/index';

import {n, date, mes} from '../../Assets/constants';

// Total of Generation, Self Consumption and Network Injection
export function summatory(access, body) {
  let valor = fetch(
    `http://api.ienergybook.com/api/Meters/generationReadings?access_token=${access}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  )
    .then(res => {
      let statusCode = res.status;
      const data = res.json();
      return Promise.all([statusCode, data]);
    })
    .then(json => {
      console.log(json);
      let total = 0.0;
      for (var i in json[1]) {
        total += json[1][i].value;
      }
      return total;
    })
    .catch(err => {
      console.log('no  se pudo');
    });

  return valor;
}
// Gets json chart data and returns fixed array for the rendered chart.
export function jsonChartData(access, body, caption) {
  let finalChart = fetch(
    `http://api.ienergybook.com/api/Meters/generationReadings?access_token=${access}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  )
    .then(res => {
      let statusCode = res.status;
      const data = res.json();
      return Promise.all([statusCode, data]);
    })
    .then(json => {
      let data = chartData(json[1], caption);
      return body.filter == 4 ? data.perMonth : data.newData;
    })
    .catch(err => {
      this.setState({
        indicator: false,
      });
      console.log('no  se pudo');
    });

  return finalChart;
}

// Data for generation cards
export function jsonCardData(
  adminComp,
  normalComp,
  boolServ,
  boolDev,
  service,
  device,
  access,
) {
  const url = `http://api.ienergybook.com/api/DesignatedMeters/generation?company_id=${
    adminComp != '' ? adminComp : normalComp
  }&${boolServ ? 'service' : 'device'}_name=${
    boolDev ? device : service.replace(' ', '%20')
  }&access_token=${access}`;
  console.log(url);

  let cards = fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      let statusCode = res.status;
      const data = res.json();
      return Promise.all([statusCode, data]);
    })
    .then(json => {
      console.log(json);

      return json[1].response;
    })
    .catch(err => {
      console.log('no  se pudo');
    });
  return cards;
}

// Applies format to json chart data.
function chartData(data, caption) {
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

    //Chart array by hour
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
  //Chart array by month
  //Separates the array by month
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
      toolText: `<div id='divTable'><table id='dataTable' width='100px'><tr class=''><td style="background-color:#1CD6BF;"><th>${caption}</th><td>${total_mes.toFixed(
        2,
      )} kWh</td></tr></table></div>`,
    });
  });
  return {newData, perMonth};
}

// Returns
export function cardData(data, network, self, generation) {
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
          value:
            Math.sign(data.selfConsumption) == -1
              ? 0
              : data.selfConsumption.toFixed(2),
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
          unidad:
            Math.sign(data.selfConsumptionValue) == -1
              ? 0
              : data.selfConsumptionValue.toFixed(2),
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
          Icon: GenIcon,
          title: 'Generación',
          unidad: 'kWh',
          value: generation,
        },
        {
          Icon: AutoConsumo,
          title: 'Autoconsumo',
          unidad: 'kWh',
          value: Math.sign(self) == -1 ? 0 : self,
        },
        {
          Icon: Inyeccion,
          title: 'Inyección a la red',
          unidad: 'kWh',
          value: network,
        },
      ],
    },
  ];
  return values;
}

/*
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
*/
