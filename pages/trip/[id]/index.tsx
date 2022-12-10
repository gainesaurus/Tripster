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
import { getLodgingsByTripId } from '../../../src/services/lodgingService'
import styles from '../../../styles/Trip.module.css';
import { ITripItem, ILodge, ILocation, IEvent, IPhoto, IUser } from '../../../Types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import { getLocationsByTripId } from '../../../src/services/locationService';
import { getEventsByTripId } from '../../../src/services/eventService';
import { getPhotosByTripId } from '../../../src/services/photoService';
import { Auth } from 'firebase-admin/auth';
import { getUser } from '../../../src/services/userService';
import { ArrowBack } from '@mui/icons-material';

function TripPage({ tripItem, attendeesObjArr, lodgings, locations, events, photos }:InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { id } = router.query;
  const [trip, setTrip] = useState<ITripItem>();

  useEffect(() => {
    setTrip(tripItem);
  }, [id]);

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
            <AttendeeList attendeesObjArr={attendeesObjArr} attendees={trip.attendees} invites={trip.invites} />
            <AlbumList tripId={id.toString()} photos={photos}/>
            <TimeLineList tripId={id.toString()} events={events}/>
            <TripPinDropList tripId={id.toString()} locations={locations} />
            <LodgingList tripId={id.toString()} lodgings={lodgings} />
          </div>
        </div>
      </div>
    )
  );
}
export default withAuthUser()(TripPage as React.FunctionComponent<any>)

export const getServerSideProps: GetServerSideProps<{tripItem: ITripItem, attendeesObjArr:(void | IUser)[], lodgings: ILodge[], locations:ILocation[], events:IEvent[], photos:IPhoto[]}> = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ params, AuthUser }) => {
  const token = await AuthUser.getIdToken()

  const tripItem = await getTripById(params?.id as string, token as string) as ITripItem;

  let attendeesObjArr:(IUser | void)[] = [];
  if(tripItem.attendees) {
    attendeesObjArr = await Promise.all<IUser | void>(tripItem.attendees.map<Promise<IUser | void>>(async (uid) => await getUser(uid)))
  }

  const lodgings = await getLodgingsByTripId(token as string, params?.id as string) as ILodge[];
  const locations = await getLocationsByTripId(token as string, params?.id as string) as ILocation[];
  const events = await getEventsByTripId(token as string, params?.id as string) as IEvent[];
  const photos = await getPhotosByTripId(token as string, params?.id as string) as IPhoto[];

  return { props:{ tripItem, attendeesObjArr, lodgings, locations, events, photos }}
})
