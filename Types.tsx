export interface ITripItem {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  pic_url: string;
};

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