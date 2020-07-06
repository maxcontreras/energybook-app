import moment from 'moment/min/moment-with-locales';
import {alert} from '../../Assets/Functions/setAlert';
import {
  ConsumoIcon,
  Distribucion,
  Capacidad,
  Fp,
  Inyeccion,
} from '../../Assets/Svg/Variables/index';

export function getEPEXP(access, id, service, fecha) {
  let customdates = {
    from: `${moment(fecha).format('YYYY-MM-DD')}`,
    until: `${moment(fecha)
      .endOf('month')
      .format('YYYY-MM-DD')}`,
  };
  let epexp_value = fetch(
    `http://api.ienergybook.com/api/Meters/standardReadings?access_token=${access}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        device: '',
        service: service,
        variable: 'EPexp',
        filter: -1,
        interval: 3600,
        custom_dates: customdates,
      }),
    },
  )
    .then(res => {
      let statusCode = res.status;
      const data = res.json();
      return Promise.all([statusCode, data]);
    })
    .then(json => {
      let total = 0.0;
      for (var i in json[1]) {
        total += json[1][i].value;
      }
      total = total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return total;
    })
    .catch(err => {
      alert('Error', 'Hubo un error al obtener los datos.');
    });

  return epexp_value;
}

export function getEPIMP(access, id, service, fecha) {
  let customdates = {
    from: `${moment(fecha).format('YYYY-MM-DD')}`,
    until: `${moment(fecha)
      .endOf('month')
      .format('YYYY-MM-DD')}`,
  };

  let price_value = fetch(
    `http://api.ienergybook.com/api/Meters/getConsumptionCostsByFilter?access_token=${access}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        service: service,
        filter: -1,
        interval: 86400,
        custom_dates: customdates,
      }),
    },
  )
    .then(res => {
      let statusCode = res.status;
      const data = res.json();
      return Promise.all([statusCode, data]);
    })
    .then(json => {
      var jsonResponse = json[1];
      var response = 0.0;
      for (var i = 0; i < jsonResponse.length; i++) {
        response += jsonResponse[i].cost;
      }
      let precio_consumo = `$${response
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
      return precio_consumo;
    })
    .catch(err => {
      alert('Error', 'Hubo un error al obtener los datos.');
    });
  return price_value;
}

export function getHISTORY(access, company, period, service) {
  console.log('SI ENTRO A LA FUNCION HISTORY');
  console.log(access);
  console.log(company);
  console.log(period);
  console.log(service);

  let value_history = fetch(
    `http://api.ienergybook.com/api/Services/monthlyHistory?access_token=${access}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service: service,
        companyId: company,
        period: period,
      }),
    },
  )
    .then(res => {
      let statusCode = res.status;
      const data = res.json();
      return Promise.all([statusCode, data]);
    })
    .then(json => {
      console.log('RESPUESTA HISTORY ');
      console.log(json[1]);

      let array = json[1];
      return array.data;
    })
    .catch(err => {
      alert('Error', 'Hubo un error al obtener los datos.');
    });

  return value_history;
}

export function setValues(epexp, epimp, data, prices) {
  let allData = {
    epimp: 0,
    $epimp: epimp ? '$' + epimp : '$' + 0,
    distribution: 0,
    $distribution: 0,
    capacity: 0,
    $capacity: 0,
    fp: 0,
    $fp: 0,
    $injection: epexp ? epexp : 0,
    injection: epexp ? epexp : 0,
  };
  if (data && prices) {
    allData.$distribution = prices.prices.distributionPrice * data.distribution;
    allData.$capacity = prices.prices.capacityPrice * data.capacity;
    allData.epimp = data.consumption;
    allData.capacity = data.capacity;
    allData.distribution = data.distribution;
  }

  const dataRecord = [
    {
      Icono: ConsumoIcon,
      title: 'Consumo',
      reading: `${parseFloat(allData.epimp)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} kWh`,
      price: allData.$epimp,
    },
    {
      Icono: Distribucion,
      title: 'Distribución',
      reading: `${allData.distribution
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} kW`,
      price:
        '$' +
        allData.$distribution.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      Icono: Capacidad,
      title: 'Capacidad',
      reading: `${allData.capacity
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} kW`,
      price:
        '$' +
        allData.$capacity.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      Icono: Fp,
      title: 'Fp',
      reading: `${parseFloat(allData.fp)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}%`,
      price: ' ',
    },
    {
      Icono: Inyeccion,
      title: 'Inyección a la red',
      reading: `${allData.injection} kWh`,
      price: `$ ${allData.$injection}`,
    },
  ];

  return dataRecord;
}
