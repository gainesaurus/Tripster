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