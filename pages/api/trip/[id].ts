import nc from 'next-connect';
import { getTrip } from '../../../controllers/trip';
import verifyToken from '../../../middleware/verifyToken';

const handler = nc().use(verifyToken).get(getTrip);

export default handler;
