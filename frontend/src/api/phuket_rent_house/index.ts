import { apiConfig } from '../config';

export const getPhuketRentHouseApi = () =>
  apiConfig.get('parse/phuketrenthouse').json();
