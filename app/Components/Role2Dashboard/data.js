import {
  Capacidad,
  Distribucion,
  ConsumoIcon,
  Fp,
  Inyeccion,
} from '../../Assets/Svg/Variables/index';
import {headers} from '../../Assets/constants';

// Total consumption cost for the month.
export function getJson(access, id) {
  let valor = fetch(
    `http://api.ienergybook.com/api/Meters/getConsumptionCostsByFilter?access_token=${access}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        id: id,
        device: '',
        service: 'Servicio 1',
        filter: 3,
        interval: 86400,
        customdates: null,
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

      let totalPrice = parseFloat(response)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      //Returns total price
      return totalPrice;
    })
    .catch(err => {
      console.log('no se pudo');
    });

  return valor;
}

// Returns all values and prices in an array.
export function monthlyData(prices, readings, response, epexp) {
  const capacityPrice =
    prices.prices.capacityPrice * readings.monthlyReadings.capacity;
  const distributionPrice =
    prices.prices.distributionPrice * readings.monthlyReadings.distribution;

  const data = [
    {
      title: 'Consumo',
      Icon: ConsumoIcon,
      value:
        '$' +
        parseFloat(readings.monthlyReadings.consumption)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      price: ' $' + response,
    },
    {
      title: 'Distribución',
      Icon: Distribucion,
      value:
        readings.monthlyReadings.distribution
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' kW',
      price:
        '$' +
        distributionPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: 'Capacidad',
      Icon: Capacidad,
      value: readings.monthlyReadings.capacity
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      price:
        '$' + capacityPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: 'FP',
      Icon: Fp,
      value: readings.fp
        ? readings.fp.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' %'
        : '0%',
      price: ' ',
    },
    {
      title: 'Inyección a la red',
      Icon: Inyeccion,
      value: epexp + ' kWh',
      price: '$' + epexp,
    },
  ];
  return data;
}

//Returns all values and prices in an array.
export function dailyData(prices, readings, response) {
  const capacityPrice =
    prices.prices.capacityPrice * readings.dailyReadings.capacity;
  const distributionPrice =
    prices.prices.distributionPrice * readings.dailyReadings.distribution;
  const ultimaActualizacion = readings.dailyReadings.lastUpdated.substr(11, 5);
  const data = [
    {
      title: 'Consumo',
      valuekwh: `${parseFloat(readings.dailyReadings.consumption)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} kWh`,
      valuePrice: `$${response
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      ultima: ultimaActualizacion,
    },
    {
      title: 'Distribución',
      valuekwh: `${readings.dailyReadings.distribution
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} kW`,
      valuePrice: `$${distributionPrice
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      ultima: ultimaActualizacion,
    },
    {
      title: 'Capacidad',
      valuekwh: `${readings.dailyReadings.capacity
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} kW`,
      valuePrice: `$${capacityPrice
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      ultima: ultimaActualizacion,
    },
  ];

  return data;
}

//Returns  prices accordint to the tariff in the company
export function cfeValues(tarifa, prices) {
  let tarifaa = [];
  if (tarifa == 'GDMTH') {
    tarifaa = [
      {
        title: 'Base',
        price: prices.prices.basePrice,
        flex: 0.8,
      },
      {
        title: 'Media',
        price: prices.prices.middlePrice,
        flex: 0.8,
      },
      {
        title: 'Punta',
        price: prices.prices.peakPrice,
        flex: 0.8,
      },
      {
        title: 'Capacidad',
        price: prices.prices.capacityPrice,
        flex: 1,
      },
      {
        title: 'Distribución',
        price: prices.prices.distributionPrice,
        flex: 1,
      },
    ];
  } else if (tarifa == 'GDMTO') {
    tarifaa = [
      {
        title: 'Ordinario',
        price: prices.prices.ordinaryPrice,
        flex: 1,
      },
      {
        title: 'Capacidad',
        price: prices.prices.capacityPrice,
        flex: 1,
      },
      {
        title: 'Distribución',
        price: prices.prices.distributionPrice,
        flex: 1,
      },
    ];
  }

  return tarifaa;
}
