import {
  ConsumoIcon,
  Distribucion,
  Capacidad,
  Fp,
  Inyeccion,
} from '../../Assets/Svg/Variables/index';

function convert(number) {
  number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return number;
}

export function cardData(prices, data, consumptionPrice) {
  let noData = {
    consumption: 0,
    distribution: 0,
    capacity: 0,
    fp: 0,
    reactivos: 0,
  };
  let datos = data ? data : noData;
  const capacityPrice = prices.prices.capacityPrice * datos.capacity;
  const distributionPrice = prices.prices.distributionPrice * datos.capacity;

  const dataRecord = [
    {
      Icono: ConsumoIcon,
      title: 'Consumo',
      reading: `${convert(parseFloat(datos.consumption))} kWh`,
      price: consumptionPrice ? ' $' + consumptionPrice : '$0',
    },
    {
      Icono: Distribucion,
      title: 'Distribución',
      reading: `${convert(parseFloat(datos.distribution))} kW`,
      price:
        '$' +
        distributionPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      Icono: Capacidad,
      title: 'Capacidad',
      reading: `${convert(parseFloat(datos.capacity))} kW`,
      price:
        '$' + capacityPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      Icono: Fp,
      title: 'Fp',
      reading: `${convert(parseFloat(datos.fp))}%`,
      price: ' ',
    },
    {
      Icono: Inyeccion,
      title: 'Inyección a la red',
      reading: `0 kWh`,
      price: ' ',
    },
  ];

  return dataRecord;
}
