const BASEurl = '';
import { IEvent } from "../../Types";

export const getEventsByTripId = async (tripId:string) => {
  try {
    const result = await fetch(`${BASEurl}/events/${tripId}`, {
      method: 'GET',
      mode: 'cors',
    });
    return result.json();
  } catch (err) {
    console.error(err);
  }
}

export const createEvent = async (event:IEvent) => {
  try {
    const result = await fetch(`${BASEurl}/events`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event)
    });
    return await result.json();
  } catch (err) {
    console.error(err);
  }
};

export const updateEvent = async ( _id:string, event:IEvent) => {
  try {
    const result = await fetch(`${BASEurl}/events/${_id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event)
    });
    return await result.json();
  } catch (err) {
    console.error(err);
  }
};