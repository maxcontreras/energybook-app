//modifies the state and returns a new state
import {
  GET_USER_INFO,
  GET_COMPANY_DATA,
  GET_COMPANY_ID,
} from '../Actions/ActionTypes.js';

const initialState = {
  accesToken: '',
  userId: '',
  city: '',
  tipoTarifa: '',
  Division: '',
  companyId: '',
  company: '',
  company_phone: '',
  size: '',
  direccion: '',
  location: '',

  giro: '',

  puesto: '',
  created_at: '',
  lastLogin: '',
  name: '',
  lastname: '',
  email: '',
  role_id: '',
  administrando: null,
};

const initialValues = (state = initialState, action) => {
  const newState = {...state};

  switch (action.type) {
    case GET_USER_INFO:
      newState.accesToken = action.json[1].id;
      newState.userId = action.json[1].userId;
      break;

    case GET_COMPANY_DATA:
      newState.company = action.json[1][0].company_name;
      newState.city = action.json[1][0].city;
      newState.tipoTarifa = action.json[1][0].tariff_type;
      newState.Division = action.json[1][0].Division;
      newState.company_phone = action.json[1][0].phone;
      newState.size = action.json[1][0].size;
      newState.direccion = action.json[1][0].address;
      newState.location = action.json[1][0].location;
      break;

    case GET_COMPANY_ID:
      newState.companyId = action.json[1][0].company_id
        ? action.json[1][0].company_id
        : null;
      newState.created_at = action.json[1][0].created_at;
      newState.lastLogin = action.json[1][0].lastLogin;
      newState.name = action.json[1][0].name;
      newState.lastname = action.json[1][0].lastname;
      newState.email = action.json[1][0].email;
      newState.puesto = action.json[1][0].position
        ? action.json[1][0].position
        : null;
      newState.giro = action.json[1][0].contact_data
        ? action.json[1][0].contact_data.business_line
        : null;
      newState.role_id = action.json[1][0].role_id;
      newState.administrando = action.json[1][0].Administrando;
      break;
  }

  return newState;
};

export default initialValues;
