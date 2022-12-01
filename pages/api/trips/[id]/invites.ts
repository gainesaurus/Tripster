import nc from 'next-connect';
import {
  inviteToTrip,
  resolveInvitation,
} from '../../../../controllers/invites';
import verifyToken from '../../../../middleware/verifyToken';

const handler = nc().use(verifyToken).post(inviteToTrip).put(resolveInvitation);

export default handler;
