import nc from 'next-connect';
import { getAllPhotos  } from '../../../controllers/photos';
import verifyToken from '../../../middleware/verifyToken';

const handler = nc().use(verifyToken).get(getAllPhotos);

export default handler;