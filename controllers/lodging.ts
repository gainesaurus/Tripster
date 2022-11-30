import { NextApiRequest, NextApiResponse } from 'next';
import Lodging from '../models/Lodging';
import { ILodge } from '../Types';

export async function getAllLodgingForOneTrip(
  req: NextApiRequest,
  res: NextApiResponse<ILodge[]>,
) {
  const id = req.query.id;
  const lodging = await Lodging.find<ILodge>({
    tripId: id,
  });
  res.status(200).json(lodging);
};