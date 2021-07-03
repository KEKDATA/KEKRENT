import { apiConfig } from '../config';

export const getFazwazApi = () => apiConfig.get('parse/fazwaz').json();
