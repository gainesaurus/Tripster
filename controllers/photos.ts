import { NextApiRequest, NextApiResponse } from 'next';
import Trip from '../models/Trip';
import Photos from '../models/Photos';
import { IPhoto, ITripItem } from '../Types';

export const getAllPhotos = async (
  req: NextApiRequest,
  res: NextApiResponse<IPhoto[]>,
) => {
  const photos = await Photos.find<IPhoto>({
    tripId: req.query.tripId,
  }).exec();
  res.status(200).json(photos);

}

export const addPhotos = async (
  req: NextApiRequest,
  res: NextApiResponse<IPhoto[] | { error: unknown }>,
) => {
  try {
    const trip = await Trip.findOne<ITripItem>({
      $and: [{ _id: req.body.tripId }, { attendees: req.body.uid }],
    }).exec();
    console.log(trip)
    if(trip) {
        const photos = await Photos.create({
        tripId: req.body.tripId,
        src: req.body.src,
        height: req.body.height,
        width: req.body.width,
      });
      trip!.photos?.push(photos._id);
      await Trip.findByIdAndUpdate(req.body.tripId, trip).exec();
      res.status(200).json(photos);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }

}