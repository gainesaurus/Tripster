import nc from 'next-connect';
import { postUser, updateUser } from '../../../controllers/users';
import verifyToken from '../../../middleware/verifyToken';

const handler = nc().use(verifyToken).post(postUser).put(updateUser);

export default handler;
