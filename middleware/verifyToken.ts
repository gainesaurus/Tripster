import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { ITripItem } from '../Types';
import auth from './firebase-config';

const verifyToken = (
  req: NextApiRequest,
  res: NextApiResponse<ITripItem | { error: string }>,
  next: NextHandler,
) => {
  // const token = req.headers.authorization?.split(' ')[1];
  const token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE5NmFkY2U5OTk5YmJmNWNkMzBmMjlmNDljZDM3ZjRjNWU2NDI3NDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGhlc2lzLXByb2plY3QtY29kZXdvcmtzLWdhIiwiYXVkIjoidGhlc2lzLXByb2plY3QtY29kZXdvcmtzLWdhIiwiYXV0aF90aW1lIjoxNjY5NzUwNDEzLCJ1c2VyX2lkIjoiazV1R01DOVdtVVU4c2Y1OTZLdUhQWm5DRkhUMiIsInN1YiI6Ims1dUdNQzlXbVVVOHNmNTk2S3VIUFpuQ0ZIVDIiLCJpYXQiOjE2Njk3NTA0MTMsImV4cCI6MTY2OTc1NDAxMywiZW1haWwiOiJnQGEuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImdAYS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.icFWBn4Y3UVpAJpFQtgoSzSQB5Hb7esyUsgqcYjgdwwflHN6N4EDjS0nRVTj_dMDzzJVrQA4DOMa8DOKfdn4Zi-Ge9pdPElkg6H5QsL-o6X8ev4aM6B_5epoM2D-wqCAo3zHVbQH3tq5RDIFkpxlNqv5y4bn-3ItW1JlC72Ec6TKAtvBvfKnyzxVy6phhdPVvei4rEhb84cvFW6Nrc2lMHp5BnhITseiBTV85SKrnJW6I2jy7QjtiLTcWtMO5np2MB2XYO7DfshQF1Z5lOkpY5Q9RTJftNbxb3Sry4c90WRXjPfTj8HOA00qyfhioCFpPiEGi6pL3MtQVEdezrbntA';
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
