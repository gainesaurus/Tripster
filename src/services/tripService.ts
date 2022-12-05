import { ITripItem } from '../../Types';
import { fetchData } from './fetchFactory';

export async function createTrip(trip: ITripItem, token: string) {
  return await fetchData<ITripItem>(
    '/trips',
    {
      method: 'POST',
      body: JSON.stringify(trip),
    },
    token,
  );
}

export async function getAllTrips(token: string) {
  return await fetchData<ITripItem[]>('/trips', { method: 'GET' }, token);
}

export async function getTripById(tripId: string, token: string) {
  return await fetchData<ITripItem>(
    `/trips/${tripId}`,
    { method: 'GET' },
    token,
  );
}
