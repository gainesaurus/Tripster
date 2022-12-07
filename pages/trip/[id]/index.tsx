import { useRouter } from 'next/router';
import Link from 'next/link';

import AttendeeList from '../../../src/components/AttendeeList/AttendeeList';
import Divider from '../../../src/components/Divider/Divider';
import HomeLeft from '../../../src/components/HomeLeft/HomeLeft';
import LodgingList from '../../../src/components/LodgingList/LodgingList';
import AlbumList from '../../../src/components/PhotoAlbumList/AlbumList';
import TimeLineList from '../../../src/components/TimeLineList/TimeLineList';
import TripHeader from '../../../src/components/TripHeader/TripHeader';
import TripPinDropList from '../../../src/components/TripPinDropList/TripPinDropList';

import { useEffect, useState } from 'react';
import NavBar from '../../../src/components/NavBar/NavBar';
import { useUserContext } from '../../../src/Contexts/UserContext';
import { getTripById } from '../../../src/services/tripService';
import styles from '../../../styles/Trip.module.css';
import { ITripItem } from '../../../Types';
import { ArrowBack } from '@mui/icons-material';

export default function TripPage() {
  const router = useRouter();
  const { id } = router.query;
  const userContext = useUserContext();
  const [trip, setTrip] = useState<ITripItem>();

  useEffect(() => {
    userContext.authUser &&
      id &&
      getTripById(id.toString(), userContext.authUser.token).then((trip) => {
        trip && setTrip(trip);
      });
  }, [userContext.authUser, id]);

  return (
    trip &&
    id && (
      <div className={styles.page}>
        <NavBar />
        <div className={styles.pageContainer}>
          <div className={styles.homeContainer}>
            <HomeLeft />
            <Divider />
          </div>
          <div className={styles.tripContainer}>
            <Link href='/'>
              <ArrowBack />
            </Link>
            <TripHeader
              title={trip.title}
              start={trip.startDate}
              end={trip.endDate}
              pic={trip.picUrl}
            />
            <AttendeeList attendees={trip.attendees} invites={trip.invites} />
            <AlbumList tripId={id.toString()} />
            <TimeLineList tripId={id.toString()} />
            <TripPinDropList tripId={id.toString()} />
            <LodgingList tripId={id.toString()} />
          </div>
        </div>
      </div>
    )
  );
}
