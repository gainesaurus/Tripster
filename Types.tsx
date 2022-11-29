export interface ITripItem {
  _id: number;
  title: string;
  startDate: string;
  endDate: string;
  picUrl: string;
  createdBy?: string;
  attendees?: { userUid: string; accepted: Boolean }[];
  events?: [string]; // eventId
  albums?: [string]; // AlbumId
  polls?: [string]; // PollId
  locations?: [string]; // LocationsId
  lodging?: [string]; // LodgingId
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  profile_pic: string;
}

export interface IPhoto {
  src: string;
  height: number;
  width: number;
}

export interface ILocation {
  info: string;
  latLng: string;
  ts: string;
}

export interface ILodge {
  title: string;
  address: string;
  pic_url: string;
  latLng: string;
}
