const BASEurl = '/api';
import { ILodge } from "../../Types";

export const getLodgingsByTripId = async (tripId:string) => {
  try {
    const result = await fetch(`${BASEurl}/lodging/${tripId}`, {
      method: 'GET',
      mode: 'cors',
    });
    return result.json();
  } catch (err) {
    console.error(err);
  }
}

export const createLodging = async (token: string, lodge: ILodge) => {
  try {
    const result = await fetch(`${BASEurl}/lodging`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lodge)
    });
    return await result.json();
  } catch (err) {
    console.error(err);
  }

}

export const updateLodging = async () => {

}

export const deleteLodging = async () => {

}