import { ILocation } from "../../Types";
import { fetchData } from "./fetchFactory";

export const getLocationsByTripId = async (token:string, tripId:string) => {
  return await fetchData<ILocation[]>(`/locations/${tripId}`, { method: 'GET'}, token,
  );
}

export const createLocation = async (token:string, location:ILocation) => {
  return await fetchData<ILocation>(
    '/locations', {method: 'POST', body: JSON.stringify(location)}, token,
  );
}

export const updateLodging = async () => {

}

export const deleteLodging = async () => {

}