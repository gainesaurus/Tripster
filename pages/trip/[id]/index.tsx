import { useRouter } from 'next/router';

import AttendeeList from '../../../src/components/AttendeeList/AttendeeList';
import Divider from '../../../src/components/Divider/Divider';
import HomeLeft from '../../../src/components/HomeLeft/HomeLeft';
import LodgingList from '../../../src/components/LodgingList/LodgingList';
import AlbumList from '../../../src/components/PhotoAlbumList/AlbumList';
import TimeLineList from '../../../src/components/TimeLineList/TimeLineList';
import TripHeader from '../../../src/components/TripHeader/TripHeader';
import TripPinDropList from '../../../src/components/TripPinDropList/TripPinDropList';

import NavBar from '../../../src/components/NavBar/NavBar';
import styles from '../../../styles/Trip.module.css';

export default function TripPage() {
  const router = useRouter();
  const { id } = router.query;

  //Mock Data
  let trip = {
    title: 'Grand Tetons FTW',
    startDate: '2023-05-03T07:00:00.000Z',
    endDate: '2023-05-09T07:00:00.000Z',
    _id: '1',
    picUrl: './yosemite.jpg',
    attendees: [
      {
        _id: '6',
        uid: '234',
        username: 'danielle',
        email: 'd@test.com',
        profile_pic: './profile.jpg',
      },
      {
        _id: '2',
        uid: '235',
        username: 'someone',
        email: '',
        profile_pic: '',
      },
    ],
    photos: [
      {
        src: 'https://res.cloudinary.com/enchanting/q_70,f_auto,c_fit,dpr_2,w_700,h_400/exodus-web/2022/09/Landing-page-walking.jpg',
        width: 20,
        height: 20,
        _id: '99',
        tripId: '345678',
      },
    ],
    locations: [
      {
        info: 'Tonights Beach Bonfire',
        latLng:{
          lat: 40.6063179,
          lng: -122.5301481,
        },
        ts: '04/20/2022',
        _id: '100',
        tripId: '345678',
      },
      {
        info: 'Meet here before site-seeing today!',
        latLng: {
          lat: 1,
          lng: -2,
        },
        ts: '04/20/2022',
        _id: '101',
        tripId: '345678',
      },
    ],
    lodging: [
      {
        title: 'Danielles Place',
        address: '6155 Oracle Rd, Sechelt, BC, Canada',
        latLng: {
          lat: 1,
          lng: -2,
        },
        _id: '102',
        tripId: '345678',
      },
    ],
  };



  return (
    <div className={styles.page}>
      <NavBar />
      <div className={styles.pageContainer}>
        <div className={styles.homeContainer}>
          <HomeLeft />
          <Divider />
        </div>
        <div className={styles.tripContainer}>
          <TripHeader
            title={trip.title}
            start={trip.startDate}
            end={trip.endDate}
            pic={trip.picUrl}
          />
          <AttendeeList attendees={trip.attendees} />
          <AlbumList photos={trip.photos} id={trip._id} />
          <TimeLineList tripId={id} />
          <TripPinDropList pinDrops={trip.locations}/>
          <LodgingList></LodgingList>
        </div>
      </div>
    </div>
  );
}
