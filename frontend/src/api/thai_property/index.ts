import { apiConfig } from '../config';

export const getThaiPropertyApi = () =>
  apiConfig.get('parse/thaiproperty').json();
