import nc from 'next-connect';
import { getAllEvents } from '../../../controllers/events';
import verifyToken from '../../../middleware/verifyToken';

const handler = nc().use(verifyToken).get(getAllEvents);

export default handler;