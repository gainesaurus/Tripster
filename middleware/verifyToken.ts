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
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE5NmFkY2U5OTk5YmJmNWNkMzBmMjlmNDljZDM3ZjRjNWU2NDI3NDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGhlc2lzLXByb2plY3QtY29kZXdvcmtzLWdhIiwiYXVkIjoidGhlc2lzLXByb2plY3QtY29kZXdvcmtzLWdhIiwiYXV0aF90aW1lIjoxNjY5ODI2MTUwLCJ1c2VyX2lkIjoiazV1R01DOVdtVVU4c2Y1OTZLdUhQWm5DRkhUMiIsInN1YiI6Ims1dUdNQzlXbVVVOHNmNTk2S3VIUFpuQ0ZIVDIiLCJpYXQiOjE2Njk4MjYxNTAsImV4cCI6MTY2OTgyOTc1MCwiZW1haWwiOiJnQGEuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImdAYS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.wzxFhNH54i4wceqccqPvU3fAvqVaygBvnHjqxdfD5mLODYULYTmKpB0gyI_rlyf5Vm_ADwO1wNUWoiJvoUlJ4_S2S9Ux37iPRgf69Id-YLANByN_D6b9AtL-7yiaM1X1QrT-4JCmRA3fxzUQvvaEthhDHfk85XdFS1WRKdXcz_w0cI5EMNGqPgP7FR0HOe9zwFy3RUxfE5x7Ipg0VkIkcBJ8QiPX_sb2LlUv5IknTFz3fPnIRQweNMHQ1PZsMciJqTwEOou5eHWZFeJ3_bqC4HL_vgRXEy2m8uCGQ1bVh2yvvt2sW0nVDlWMCg1ZD3oEXh__NXPxCjkPjS-qG1Pbhw';
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
