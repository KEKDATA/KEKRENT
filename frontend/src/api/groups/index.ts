import { apiConfig } from '../config';

export const getGroupsApi = () => apiConfig.get('parse/groups').json();
