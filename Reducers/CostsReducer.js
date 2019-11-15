//modifies the state and returns a new state
import { GET_PRICES, GET_FINAL_PRICES } from "../Actions/ActionTypes.js";

const initialState = {
  basePrice: "",
  capacityPrice: "",
  distributionPrice: "",
  middlePrice: "",
  peakPrice: "",
  oridinaryPrice: ""
};

const costReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRICES:
      if (action.tipoTarifa == "GDMTH") {
        return [
          ...state,
          {
            basePrice: action.json[1].cfeValue.GDMTH.basePrice,
            capacityPrice: action.json[1].cfeValue.GDMTH.capacityPrice,
            distributionPrice: action.json[1].cfeValue.GDMTH.distributionPrice,
            middlePrice: action.json[1].cfeValue.GDMTH.middlePrice,
            peakPrice: action.json[1].cfeValue.GDMTH.peakPrice
          }
        ];
      } else {
        return [
          ...state,
          {
            basePrice: action.json[1].cfeValue.GDMTH.basePrice,
            capacityPrice: action.json[1].cfeValue.GDMTH.capacityPrice,
            distributionPrice: action.json[1].cfeValue.GDMTH.distributionPrice,
            middlePrice: action.json[1].cfeValue.GDMTH.middlePrice,
            peakPrice: action.json[1].cfeValue.GDMTH.peakPrice,
            ordinaryPrice: action.json[1].cfeValue.GDMTO.ordinaryPrice,
            GDMTOcapacityP: action.json[1].cfeValue.GDMTO.capacityPrice,
            GDMTOdistributionP: action.json[1].cfeValue.GDMTO.distributionPrice
          }
        ];
      }

    case GET_FINAL_PRICES:
      var prices = state[0];
      var readings = action.readings;
      //  var readings = state.dailyReducer[0];

      return [
        ...state,
        {
          totalDailyDistribution: (
            prices.distributionPrice * readings.dailyReadings.distribution
          )
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          totalDailyCapacity: (
            prices.capacityPrice * readings.dailyReadings.capacity
          )
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),

          totalMonthlyDistribution: (
            prices.distributionPrice * readings.monthlyReadings.distribution
          )
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          totalMonthlyCapacity: (
            prices.capacityPrice * readings.monthlyReadings.capacity
          )
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
      ];

    default:
      return state;
  }
};

export default costReducer;
