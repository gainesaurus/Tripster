import { IUser } from '../../Types';
import { fetchData } from './fetchFactory';

export async function getUser(userUid: string) {
  return await fetchData<IUser>(`/user/${userUid}`);
}

export async function getUsers(token: string) {
  return await fetchData<IUser[]>(`/user/`, { method: 'GET' }, token);
}

export async function createUser(token: string, email: string) {
  return await fetchData<IUser>(
    '/user',
    { method: 'POST', body: JSON.stringify({ email }) },
    token,
  );
}

export async function updateUser(token: string, user: IUser) {
  return await fetchData<IUser>(
    '/user',
    { method: 'PUT', body: JSON.stringify(user) },
    token,
  );
}
