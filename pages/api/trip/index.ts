import nc from 'next-connect';
import { getAllTrips } from '../../../controllers/trip';
import verifyToken from '../../../middleware/verifyToken';

const handler = nc().use(verifyToken).get(getAllTrips);

export default handler;
