import { fetchData } from './fetchFactory';
import { IPhoto } from "../../Types";

export const getPhotosByTripId = async (token: string, tripId:string) => {
  return await fetchData<IPhoto[]>(`/photos/${tripId}`, { method: 'GET'}, token,
  );
}

export const addPhotos = async (token: string, photos:IPhoto) => {
  return await fetchData<IPhoto>(
    '/photos', {method: 'POST', body: JSON.stringify(photos)}, token,
  );
}
