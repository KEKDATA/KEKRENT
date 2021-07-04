import ky from 'ky';

export const apiConfig = ky.create({
  prefixUrl: 'http://localhost:3000',
  timeout: 600000,
});
