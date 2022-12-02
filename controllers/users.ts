import { NextApiRequest, NextApiResponse } from 'next';
import User from '../models/User';
import { IUser } from '../Types';

export async function getUser(
  req: NextApiRequest,
  res: NextApiResponse<IUser | { error: unknown }>,
) {
  try {
    const uid = req.query.uid;
    const user = await User.findOne<IUser>({ uid }).exec();
    if (user) res.status(200).json(user);
    else throw new Error("Couldn't find user");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse<IUser[] | { error: unknown }>,
) {
  try {
    const users = await User.find<IUser>().exec();
    if (users) res.status(200).json(users);
    else throw new Error("Couldn't get users");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function postUser(
  req: NextApiRequest,
  res: NextApiResponse<IUser | { error: unknown }>,
) {
  try {
    const user = new User<IUser>({
      email: req.body.email,
      profile_pic: 'add_photo.png',
      uid: req.body.uid,
      username: '',
    });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse<IUser | { error: unknown }>,
) {
  try {
    const uid = req.body.uid;
    const newUser: IUser = {
      email: req.body.user,
      profile_pic: req.body.profile_pic,
      username: req.body.username,
      uid: uid,
    };
    const user = await User.findOneAndUpdate<IUser>({ uid }, newUser, {
      new: true,
    }).exec();
    user && res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
