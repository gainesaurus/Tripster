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
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE5NmFkY2U5OTk5YmJmNWNkMzBmMjlmNDljZDM3ZjRjNWU2NDI3NDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGhlc2lzLXByb2plY3QtY29kZXdvcmtzLWdhIiwiYXVkIjoidGhlc2lzLXByb2plY3QtY29kZXdvcmtzLWdhIiwiYXV0aF90aW1lIjoxNjY5NzQ2NjIwLCJ1c2VyX2lkIjoiazV1R01DOVdtVVU4c2Y1OTZLdUhQWm5DRkhUMiIsInN1YiI6Ims1dUdNQzlXbVVVOHNmNTk2S3VIUFpuQ0ZIVDIiLCJpYXQiOjE2Njk3NDY2MjAsImV4cCI6MTY2OTc1MDIyMCwiZW1haWwiOiJnQGEuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImdAYS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.uJ877_pjf0zIm9UvX5GA4EYBFDO6gOEES4n5bRoCf4M8wLlKwhLK4pitY9ROH4_5IrwFKZkzlQ_L27IWoKvCPqliV7hytBL1NiCTLztJeUherat0GnGm-Ob4GidrqayyqbfvfuEaM1LCBork0LTP6AfAL6efK-RCUnYzBFupIXfP0ierWnCBgQO8--fArd-uJNV1QcXTfuVtch9c_lDtqozFEmt914ryFYoNTWU_U9bU6znbZ1YHjGzWAuWHOKqYYm1CyWNV5i8GBp7-JFD9VGuiQoOGVrifTJ6bOKVZ1_e-KyhujY5PXnXB_JcA36oml5kJuGqbiklQ7wyTiiB_fw';
  if (token !== undefined) {
    auth
      .verifyIdToken(token)
      .then((decodedIdToken) => {
        try {
          const { uid } = decodedIdToken;
          req.body = { ...req.body, uid };
          console.log(req.body);
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
