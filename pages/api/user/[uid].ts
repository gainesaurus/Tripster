import nc from 'next-connect';
import { getUser } from '../../../controllers/users';

const handler = nc().get(getUser);

export default handler;
