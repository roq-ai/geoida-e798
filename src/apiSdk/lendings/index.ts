import axios from 'axios';
import queryString from 'query-string';
import { LendingInterface, LendingGetQueryInterface } from 'interfaces/lending';
import { GetQueryInterface } from '../../interfaces';

export const getLendings = async (query?: LendingGetQueryInterface) => {
  const response = await axios.get(`/api/lendings${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLending = async (lending: LendingInterface) => {
  const response = await axios.post('/api/lendings', lending);
  return response.data;
};

export const updateLendingById = async (id: string, lending: LendingInterface) => {
  const response = await axios.put(`/api/lendings/${id}`, lending);
  return response.data;
};

export const getLendingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/lendings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLendingById = async (id: string) => {
  const response = await axios.delete(`/api/lendings/${id}`);
  return response.data;
};
