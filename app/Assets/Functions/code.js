import moment from 'moment/min/moment-with-locales';
import {Platform} from 'react-native';
import {variablesNC} from '../constants';
export function jsonResponse(data, caption, steps, cardVariable) {
  var group2 = {
    data: [],
  };
  var fechas = [];
  var justValues = [];
  let total = [];
  let variables = variablesNC;

  for (i in data) {
    group2.data.push(data[i]);
  }
  //hasta aqui los 3 valores ya metidos
  group2.data.forEach((element, index) => {
    let array = [];
    let labels = [];
    for (i in element) {
      total.push(parseFloat(element[i].value));
      var date = `${moment(
        `${element[i].date.substr(4, 4)}-${element[i].date.substr(
          2,
          2,
        )}-${element[i].date.substr(0, 2)}`,
      )
        .locale('es')
        .format('dddd')},${element[i].date.substr(0, 2)}`;
      var hour = `${element[i].date.substr(8, 2)}:${element[i].date.substr(
        10,
        2,
      )}`;

      var wholeDate = `${date.charAt(0).toUpperCase() + date.slice(1)},${hour}`;
      labels.push({label: wholeDate});
      array.push({value: element[i].value});
    }
    fechas.push(labels);
    justValues.push(array);
  });
  var maxValue1 = Math.max(...total);
  var minValue1 = Math.min(...total);
  var average = (total.reduce((a, b) => a + b, 0) / total.length)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  let finalData = [];

  for (k in variables) {
    if (variables[k].titulo == caption) {
      let aver = [];
      for (i in variables[k].filter) {
        aver.push({seriesName: variables[k].filter[i], data: justValues[i]});
      }
      finalData.push(aver);
    }
  }
  var dataSource = {
    chart: {
      caption: caption,
      labelFontSize: '9',
      palettecolors: 'ACDE9C,9CB2D8,5E5E5E',
      showhovereffect: '1',
      drawcrossline: '1',
      theme: Platform.OS == 'ios' ? 'ocean' : 'fusion',
      setAdaptiveYMin: '1',
      labelDisplay: 'rotate',
      useEllipsesWhenOverflow: '0',
      labelStep: steps,
      showValues: '0',
    },
    categories: [
      {
        category: fechas[0],
      },
    ],
    dataset: finalData[0],
  };

  var propsData = {
    minValue: minValue1,
    date: `${fechas[0][0].label} a ${fechas[0][fechas.length - 1].label}`,
    maxValue: maxValue1,
    average: average,
    cardVariable: cardVariable,
  };

  return {dataSource, maxValue1, minValue1, average, propsData};
}
