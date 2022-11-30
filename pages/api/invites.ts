import nc from 'next-connect';
import { getInvites } from '../../controllers/invites';
import verifyToken from '../../middleware/verifyToken';

const handler = nc().use(verifyToken).get(getInvites);

export default handler;
