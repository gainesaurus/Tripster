import nc from 'next-connect';
import { getAllLodging  } from '../../../controllers/lodging';
import verifyToken from '../../../middleware/verifyToken';

const handler = nc().use(verifyToken).get(getAllLodging);

export default handler;
