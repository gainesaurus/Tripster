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
  _id: number;
  uid: number;
  username: string;
  email: string;
  profile_pic: string;
}

export interface IEvent {
  _id: number;
  tripId: number;
  title: string;
  startTime: string;
  endTime: string;
  eventType: string;
  info: string;
}

export interface IPhoto {
  _id: number;
  tripId: number;
  src: string;
  height: number;
  width: number;
}

export interface ILocation {
  _id: number;
  tripId: number;
  info: string;
  latLng: string;
  ts: string;
}

export interface ILodge {
  _id: number;
  tripId: number;
  title: string;
  address: string;
  picUrl: string;
  latLng: string;
}
