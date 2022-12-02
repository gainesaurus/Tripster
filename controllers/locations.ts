import { NextApiRequest, NextApiResponse } from 'next';
import Lodging from '../models/Lodging';
import { ILocation } from '../Types';

export async function getAllLocationsForOneTrip(
  req: NextApiRequest,
  res: NextApiResponse<ILocation[]>,
) {
  const id = req.query.id;
  const lodging = await Lodging.find<ILocation>({
    tripId: id,
  });
  res.status(200).json(lodging);
};