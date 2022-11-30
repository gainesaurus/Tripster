const BASEurl = '';
import { IEvent } from "../../Types";

export const getEventsByTripId = async (tripId:number) => {
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

export const createEvent = async (tripId:number, event:IEvent) => {
  try {
    const result = await fetch(`${BASEurl}/events/${tripId}`, {
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

export const updateEvent = async (tripId:number, _id:number, event:IEvent) => {
  try {
    const result = await fetch(`${BASEurl}/events/${tripId}/${_id}`, {
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