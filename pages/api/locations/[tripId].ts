import nc from 'next-connect';
import { getAllLocations  } from '../../../controllers/locations';
import verifyToken from '../../../middleware/verifyToken';

const handler = nc().get(getAllLocations);

export default handler;