export function divider(array, category) {
  let notifications = {
    all: [],
    consumption: [],
    demand: [],
    cost: [],
    hardware: [],
    schedule: [],
    generation: [],
    network: [],
    nomatch: [],
  };

  for (i in array) {
    notifications.all.push(array[i]);
    switch (array[i].tipo) {
      case 'Demanda':
        notifications.demand.push(array[i]);
        break;
      case 'EPIMP':
        notifications.consumption.push(array[i]);
        break;
      case 'Consumo':
        notifications.consumption.push(array[i]);
        break;
      case 'Desconexion':
        notifications.hardware.push(array[i]);
        break;
      case 'Costo':
        notifications.cost.push(array[i]);
        break;
      case 'Código de red':
        notifications.network.push(array[i]);
        break;
      case 'Cambio de horario':
        notifications.schedule.push(array[i]);
        break;
      case 'generacion':
        notifications.generation.push(array[i]);
        break;
      default:
        notifications.nomatch.push(array[i]);
    }
  }

  switch (category) {
    case 'Mostrar todas':
      return notifications.all.length > 25
        ? notifications.all
            .slice(notifications.all.length - 21, notifications.all.length)
            .reverse()
        : notifications.all.reverse();
    case 'Consumo':
      return notifications.consumption;
    case 'Demanda':
      return notifications.demand;
    case 'Costos':
      return notifications.cost;
    case 'Generación':
      return notifications.generation;
    case 'Desconexión de equipos':
      return notifications.hardware;
    case 'Cambio de horario':
      return notifications.schedule;
    case 'Código de red':
      return notifications.network;
    default:
      return notifications.nomatch;
  }
}
