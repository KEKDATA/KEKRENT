import { apiConfig } from '../config';

export const getGroupsApi = () => apiConfig.get('groups').json();
