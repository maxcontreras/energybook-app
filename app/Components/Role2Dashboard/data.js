import {
  Capacidad,
  Distribucion,
  ConsumoIcon,
  Fp,
  Inyeccion,
} from '../../Assets/Svg/Variables/index';

function convert(number) {
  number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return number;
}

export function monthlyData(prices, readings, response) {
  const capacityPrice =
    prices.prices.capacityPrice * readings.monthlyReadings.capacity;
  const distributionPrice =
    prices.prices.distributionPrice * readings.monthlyReadings.distribution;

  const data = [
    {
      title: 'Consumo',
      Icon: ConsumoIcon,
      value: '$' + parseFloat(readings.monthlyReadings.consumption),
      price: ' $' + parseFloat(response),
    },
    {
      title: 'Distribución',
      Icon: Distribucion,
      value: readings.monthlyReadings.distribution + ' kW',
      price: '$' + distributionPrice,
    },
    {
      title: 'Capacidad',
      Icon: Capacidad,
      value: readings.monthlyReadings.capacity,
      price: '$' + capacityPrice,
    },
    {
      title: 'FP',
      Icon: Fp,
      value: readings.fp ? readings.fp + ' %' : '0%',
      price: ' ',
    },
    {
      title: 'Inyección a la red',
      Icon: Inyeccion,
      value: readings.reactive + ' kWh',
      price: ' ',
    },
  ];

  return data;
}

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
