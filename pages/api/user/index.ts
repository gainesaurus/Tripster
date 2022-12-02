import nc from 'next-connect';
import { getUsers, postUser, updateUser } from '../../../controllers/users';
import verifyToken from '../../../middleware/verifyToken';

const handler = nc()
  .use(verifyToken)
  .get(getUsers)
  .post(postUser)
  .put(updateUser);

export default handler;
