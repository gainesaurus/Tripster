import nc from 'next-connect';
import { addPhotos  } from '../../../controllers/photos';
import verifyToken from '../../../middleware/verifyToken';

const handler = nc().use(verifyToken).post(addPhotos);

export default handler;