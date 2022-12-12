import nc from 'next-connect';
import { addNewEvent, deleteEvent } from '../../../controllers/events';
import verifyToken from '../../../middleware/verifyToken';

const handler = nc().use(verifyToken).post(addNewEvent).delete(deleteEvent);

export default handler;
