export const getUserInfo = json => ({
  type: "GET_USER_INFO",
  json
});

export const getCompanyData = json => ({
  type: "GET_COMPANY_DATA",
  json
});

export const getCompanyId = json => ({
  type: "GET_COMPANY_ID",
  json
});

export const getDailyReadings = json => ({
  type: "GET_DAILY_READINGS",
  json
});

export const getPrices = (json, tipoTarifa) => ({
  type: "GET_PRICES",
  json,
  tipoTarifa
});

export const getWeather = json => ({
  type: "GET_WEATHER",
  json
});

export const getFinalPrices = readings => ({
  type: "GET_FINAL_PRICES",
  readings
});

export const getArray = json => ({
  type: "GET_ARRAY_DATA",
  json
});

export const getDailyConsumptionPrices = json => ({
  type: "GET_DAILY_CONSUMPTION_PRICES",
  json
});

export const isAsync = () => ({
  type: "IS_ASYNC"
});

export const getMonthlyConsumptionPrices = json => ({
  type: "GET_MONTLHY_CONSUMPTION_PRICES",
  json
});
