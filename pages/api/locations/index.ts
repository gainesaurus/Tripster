import nc from 'next-connect';
import { createLocation  } from '../../../controllers/locations';
import verifyToken from '../../../middleware/verifyToken';

const handler = nc().use(verifyToken).post(createLocation);

export default handler;