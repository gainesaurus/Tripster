import { ITripItem } from '../../Types';
import { fetchData } from './fetchFactory';

export async function getInvites(token: string) {
  return await fetchData<ITripItem[]>('/invites', { method: 'GET' }, token);
}

export async function respondInvite(
  tripId: string,
  accepted: boolean,
  token: string,
) {
  return await fetchData<ITripItem>(
    `/trips/${tripId}/invites`,
    { method: 'PUT', body: JSON.stringify({ accepted }) },
    token,
  );
}

export async function inviteToTrip(uid: string, tripId: string, token: string) {
  return await fetchData<ITripItem>(
    `/invites/${tripId}`,
    { method: 'POST', body: JSON.stringify({ invite: uid }) },
    token,
  );
}
