import { fetchData } from './fetchFactory';

export const getLoginAuth = async (token: string) => {
  return await fetchData(`/login`, { method: 'GET'}, token,
  );
}