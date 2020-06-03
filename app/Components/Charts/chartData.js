import moment from 'moment/min/moment-with-locales';

export function jsonResponse(data, caption, variable) {
  console.log('DATA DE PRUEBA');
  console.log(data);

  var newData = [];
  var justValues = [];
  for (var i in data) {
    var date = `${moment(
      `${data[i].date.substr(4, 4)}-${data[i].date.substr(2, 2)}-${data[
        i
      ].date.substr(0, 2)}`,
    )
      .locale('es')
      .format('dddd')},${data[i].date.substr(0, 2)}`;

    var hour = `${data[i].date.substr(8, 2)}:${data[i].date.substr(10, 2)}`;

    var wholeDate = `${date.charAt(0).toUpperCase() + date.slice(1)},${hour}`;

    justValues.push(data[i].value);

    newData.push({
      label: wholeDate,
      value: data[i].value,
      toolText: `<div id='divTable'><table id='dataTable' width='100px'><tr class=''><td>${wholeDate}</td></tr><tr ><th>${caption}</th><td>${data[
        i
      ].value.toFixed(2)}</td></tr></table></div>`,
    });
  }

  var promedio = (justValues.reduce((a, b) => a + b, 0) / justValues.length)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  var maxValue = Math.max(...justValues);
  var minValue = Math.min(...justValues);

  var propsData = {
    minValue: minValue,
    date: `${newData[0].label} a ${newData[newData.length - 1].label}`.replace(
      /(,)/g,
      ' ',
    ),
    maxValue: maxValue,
    average: promedio,
    cardVariable: variable,
  };
  return {newData, promedio, minValue, maxValue, propsData};
}
