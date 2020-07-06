import moment from 'moment/min/moment-with-locales';
import {Platform} from 'react-native';

export function jsonChartData(access, body, tipo) {
  //Get consumption data
  let value = fetch(
    `http://api.ienergybook.com/api/Meters/getConsumptionCostsByFilter?access_token=${access}`,
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
      let data = {
        readingConsumo: `0.0 kWh`,
        readingDemanda: `0.0 kW`,
        totalConsumo: `$00.00`,
        totalDemanda: `$ 0`,
        error: false,
        isConsumption: true,
        indicator: false,
        isEPimp: true,
        isDP: true,
        chart: [],
      };
      if (json[0] != 200) {
        //In case of bad request
        data.error = true;
      } else {
        // sets the chart for consumption values
        console.log('AQUI ESTE PEDO ');

        let values = setChart(json[1]);
        if (tipo == 'mensual') {
          console.log(values.finalConsumption);
        }

        let finalDP =
          tipo == 'mensual'
            ? (
                parseFloat(values.finalConsumption) /
                (24 *
                  moment(body.custom_dates.from, 'YYYY-MM-DD').daysInMonth() *
                  0.57)
              ).toFixed(2)
            : (parseFloat(values.finalConsumption) / (24 * 1 * 0.57)).toFixed(
                2,
              );

        data.readingConsumo = `${values.finalConsumption
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} kWh`;
        data.totalConsumo = `$${values.finalCost}`;
        data.totalDemanda = `$ 0`;
        data.readingDemanda = `${finalDP} kW`;
        data.chart = values.chart;
      }

      return data;
    })
    .catch(err => {
      console.log('No se pudo');
      let data = {
        readingConsumo: `0.0 kWh`,
        totalConsumo: `$00.00`,
        totalDemanda: `$ 0`,
        error: true,
        isConsumption: true,
        indicator: false,
        isEPimp: true,
        isDP: true,
        chart: [],
      };
      return data;
    });

  return value;
}

function setChart(data) {
  // returns chart consumption price values
  var newData = [];
  var justCosts = 0.0;
  var justValues = 0.0;

  for (var i in data) {
    var dia = moment(
      `${data[i].date.substr(4, 4)}-${data[i].date.substr(2, 2)}-${data[
        i
      ].date.substr(0, 2)}`,
    ).format('YYYY-MM-DD');
    var date = `${moment(
      `${data[i].date.substr(4, 4)}-${data[i].date.substr(2, 2)}-${data[
        i
      ].date.substr(0, 2)}`,
    )
      .locale('es')
      .format('dddd')},${data[i].date.substr(0, 2)}`;

    var hour = `${data[i].date.substr(8, 2)}:${data[i].date.substr(10, 2)}`;
    var wholeDate = `${date.charAt(0).toUpperCase() + date.slice(1)},${hour}`;
    justValues += data[i].consumption;
    justCosts += data[i].cost;
    var color =
      data[i].rate == 'base'
        ? '#EDDC44'
        : data[i].rate == 'middle'
        ? '#25CEBC'
        : '#DE3E10';

    newData.push({
      dia: dia,
      label: wholeDate,
      value: data[i].cost,
      color: color,
      toolText: `<div id='divTable'><table id='dataTable' width='100px'><tr class=''><td>${wholeDate}</td></tr><tr ><td style="background-color:${color};"></td><th>Costo: </th><td>$${data[
        i
      ].cost.toFixed(2)} MXN</td></tr></table></div>`,
    });
  }

  let finalCost = justCosts.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  let finalConsumption = justValues;
  let group = newData.reduce((r, a) => {
    r[a.dia] = [...(r[a.dia] || []), a];
    return r;
  }, {});

  var group2 = {
    data: [],
  };
  for (i in group) {
    group2.data.push(group[i]);
  }

  var perDay = [];

  group2.data.forEach(element => {
    var base = 0;
    var media = 0;
    var punta = 0;
    for (i in element) {
      if (element[i].color == '#EDDC44') {
        base = base + element[i].value;
      } else if (element[i].color == '#25CEBC') {
        media = media + element[i].value;
      } else if (element[i].color == '#DE3E10') {
        punta = punta + element[i].value;
      }
    }
    var total_dia = base + media + punta;

    perDay.push({
      label: element[0].label,
      value: total_dia,
      toolText: `<div id='divTable'><table id='dataTable' width='100px'><tr class=''><th>Costo total:</th><td>$${total_dia.toFixed(
        2,
      )}</td></tr><tr><td style="background-color:#EDDC44;width: 3px;height: 3px;"></td><th>Base:</th><td>$${base.toFixed(
        2,
      )}</td></tr><tr><td style="background-color:#25CEBC; "></td><th>Media:</th><td>$${media.toFixed(
        2,
      )}</td></tr><tr><td style="background-color:#DE3E10;"></td><th>Punta:</th><td>$${punta.toFixed(
        2,
      )}</td></tr></table></div>`,
      color: '#F68C42',
    });
  });

  let chart = {
    chart: {
      caption: 'Consumo',
      numberprefix: ' ',
      yAxisValueFontSize: '9',
      theme: Platform.OS == 'ios' ? 'ocean' : 'fusion',
      rotatelabels: '1',
      showValues: '0',
      labelFontSize: '9',
      labelStep: '1',
    },
    data: perDay,
  };

  return {finalCost, finalConsumption, chart};
}

//----------------------------------------------------------------------------------------------

export function returnArrayM(data) {
  let dataMensual = [
    {
      title: 'Consumo',
      value: data.readingEPimp,
      price: data.priceEPimp,
    },
    {
      title: 'Demanda',
      value: data.readingDP,
      price: data.priceDP,
    },
    {
      title: 'Producción',
      value: '',
      price: data.priceProd,
    },
  ];
  return dataMensual;
}

export function returnArrayD(data) {
  let dataDiaria = [
    {
      title: 'Consumo',
      value: data.readingConsumo,
      price: data.totalConsumo,
    },
    {
      title: 'Demanda',
      value: data.readingDemanda,
      price: data.totalDemanda,
    },
    {
      title: 'Producción',
      value: '',
      price: '0 for now',
    },
  ];
  return dataDiaria;
}
