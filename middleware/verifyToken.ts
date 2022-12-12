import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { ITripItem } from '../Types';
import auth from './firebase-config';

const verifyToken = (
  req: NextApiRequest,
  res: NextApiResponse<ITripItem | { error: string }>,
  next: NextHandler,
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token !== undefined) {
    auth
      .verifyIdToken(token)
      .then((decodedIdToken) => {
        try {
          const { uid } = decodedIdToken;
          req.body = { ...req.body, uid };
          next();
        } catch (e) {
          res.status(500).json({ error: `Internal server error ${e}` });
        }
      })
      .catch((e) => {
        console.log(e);
        res.status(401).json({ error: 'Unauthorized' });
      });
  } else res.status(401).json({ error: 'No token received' });
};

export default verifyToken;
