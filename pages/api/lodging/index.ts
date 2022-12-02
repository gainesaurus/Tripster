import nc from 'next-connect';
import { createLodging  } from '../../../controllers/lodging';
import verifyToken from '../../../middleware/verifyToken';

const handler = nc().use(verifyToken).post(createLodging);

export default handler;