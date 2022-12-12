
import { fetchData } from './fetchFactory';
import { ILodge } from "../../Types";

export const getLodgingsByTripId = async (token: string, tripId:string) => {
  return await fetchData<ILodge[]>(`/lodging/${tripId}`, { method: 'GET'}, token,
  );
}

export const createLodging = async (token: string, lodge: ILodge) => {
  return await fetchData<ILodge>(
    '/lodging', {method: 'POST', body: JSON.stringify(lodge)}, token,
  );
}