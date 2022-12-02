const BASEurl = '/api';
import { ILocation } from "../../Types";

export const getLocationsByTripId = async (tripId:string) => {
  try {
    const result = await fetch(`${BASEurl}/locations/${tripId}`, {
      method: 'GET',
      mode: 'cors',
    });
    return result.json();
  } catch (err) {
    console.error(err);
  }
}

export const createLocation = async () => {

}

export const updateLodging = async () => {

}

export const deleteLodging = async () => {

}