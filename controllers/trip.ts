import { NextApiRequest, NextApiResponse } from 'next';

export function getAllTrips(
  req: NextApiRequest,
  res: NextApiResponse<{ name: string }>,
) {
  res.status(200).json({ name: 'John Doe' });
}
