import nc from 'next-connect';
import { getAllTrips, addNewTrip } from '../../../controllers/trip';
import verifyToken from '../../../middleware/verifyToken';

const handler = nc().use(verifyToken).get(getAllTrips).post(addNewTrip);

export default handler;
