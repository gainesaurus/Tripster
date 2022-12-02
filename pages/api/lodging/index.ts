import nc from 'next-connect';
import { getAllLodging, createLodging  } from '../../../controllers/lodging';
import verifyToken from '../../../middleware/verifyToken';

const handler = nc().use(verifyToken).get(getAllLodging).post(createLodging);

export default handler;
