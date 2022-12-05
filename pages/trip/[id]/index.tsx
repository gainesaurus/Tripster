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
import { useUserContext } from '../../../src/Contexts/UserContext';
import { getTripById } from '../../../src/services/tripService';
import { useEffect, useState } from 'react';
import styles from '../../../styles/Trip.module.css';

export default function TripPage() {
  const router = useRouter();
  const { id }:any = router.query;
  const user = useUserContext();

  const [trip, setTrip] = useState<any>();

  useEffect(() => {
    user.authUser && id && getTripById(user.authUser.token, id).then((thisTrip:any) => {setTrip(thisTrip)})
  }, [user.authUser, id]);


  return (
    trip &&
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
          <AlbumList tripId={id} />
          <TimeLineList tripId={id} />
          <TripPinDropList tripId={id} />
          <LodgingList tripId={id} />
        </div>
      </div>
    </div>
  );
}
