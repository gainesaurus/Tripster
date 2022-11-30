const BASEurl = '';

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

export const updateEvents = async (tripId:string, event:any) => {
  try {
    const result = await fetch(`${BASEurl}/events/${tripId}`, {
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