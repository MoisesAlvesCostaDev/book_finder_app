import axios from 'axios';
import {APP_URL} from '../../src/configs/index';

axios.defaults.withCredentials = true;

export const Api = axios.create({
  baseURL: APP_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default Api;
