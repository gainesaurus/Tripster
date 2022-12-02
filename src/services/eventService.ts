const BASEurl = '/api';
import { IEvent } from "../../Types";
import { fetchData } from './fetchFactory';

export async function getEventsByTripId(token: string, tripId:string) {
  return await fetchData<IEvent>(`/events/${tripId}`, 
  { method: 'GET',}, token,
  );
}

export async function createEvent(token: string, event:IEvent, tripId:string) {
  return await fetchData<IEvent>(
    '/events',
    {method: 'POST', body: JSON.stringify({...event, tripId})}, token,
  );
};

export async function updateEvent(token: string, event:IEvent, tripId:string) {
  return await fetchData<IEvent>(
    '/events',
    { method: 'PUT', body: JSON.stringify({...event, tripId}) },
    token,
  );
}

export async function removeEvent(token: string, event:IEvent, tripId:string) {
  return await fetchData<IEvent>(
    '/events',
    { method: 'DELETE', body: JSON.stringify({...event, tripId}) }, token,
  );
}