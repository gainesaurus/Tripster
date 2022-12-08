import { useEffect, useState } from 'react';
import Link from 'next/link';
import Divider from '../src/components/Divider/Divider';
import HomeLeft from '../src/components/HomeLeft/HomeLeft';
import NavBar from '../src/components/NavBar/NavBar';
import ProfileInfo from '../src/components/ProfileInfo/ProfileInfo';
import TripInviteList from '../src/components/TripInviteList/TripInviteList';
import { useUserContext } from '../src/Contexts/UserContext';
import { getInvites } from '../src/services/inviteService';
import { ArrowBack } from '@mui/icons-material';
import styles from '../styles/profile.module.css';
import { ITripItem } from '../Types';

function Profile() {
  const [tripInvites, setTripInvites] = useState<ITripItem[]>([]);
  const [updateTrips, setUpdateTrips] = useState(false);
  const userContext = useUserContext();

  useEffect(() => {
    if (userContext.authUser)
      getInvites(userContext.authUser.token).then((invites) => {
        invites && setTripInvites(invites);
      });
  }, [userContext, updateTrips]);

  return (
    <div className={styles.body}>
      <NavBar />
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <HomeLeft />
          <Divider />
        </div>
        <div className={styles.profileContainer}>
          <Link href='/'>
            <ArrowBack />
          </Link>
          <ProfileInfo />
          <div className={styles.invitations}>
            {tripInvites.length > 0 ? (
              <TripInviteList
                title="My Invitations:"
                trips={tripInvites}
                setUpdateTrips={setUpdateTrips}
              />
            ) : (
              <h2 className={styles.noInvites}>No invites yet!</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
