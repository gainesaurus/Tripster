import React, { useEffect, useState } from 'react';
import styles from '../styles/profile.module.css';
import NavBar from '../src/components/NavBar/NavBar';
import HomeLeft from '../src/components/HomeLeft/HomeLeft';
import { ITripItem } from '../Types';
import Divider from '../src/components/Divider/Divider';
import Image from 'next/image';
import { auth } from '../src/firebase';
import TripInviteList from '../src/components/TripInviteList/TripInviteList';

function Profile() {
  //MOCK DATA
  const tripItems: ITripItem[] = [
    {
      title: 'Yosemite',
      startDate: 'June 3 2023',
      endDate: 'June 10 2023',
      _id: 1,
      picUrl: './yosemite.jpg',
    },
    {
      title: 'Paris',
      startDate: 'Nov 30 2022',
      endDate: 'Dec 12 2022',
      _id: 2,
      picUrl: './paris.jpg',
    },
    {
      title: 'Mexico',
      startDate: 'Sept 22 2019',
      endDate: 'Sept 28 2019',
      _id: 3,
      picUrl: './mexico.webp',
    },
  ];

  const [currentTrips, setCurrentTrips] = useState<ITripItem[]>([]);
  const [pastTrips, setPastTrips] = useState<ITripItem[]>([]);
  const [tripInvites, setTripInvites] = useState<ITripItem[]>([]);

  useEffect(() => {
    let currentTrips = tripItems.filter(
      (item) => getTripStatus(item.startDate, item.endDate) === 'upcoming',
    );
    setCurrentTrips(currentTrips);
    let pastTrips = tripItems.filter(
      (item) => getTripStatus(item.startDate, item.endDate) === 'memories',
    );
    setPastTrips(pastTrips);
    let tripInvites = tripItems.filter((item, index) => index !== 0);
    setTripInvites(tripInvites);
  }, []);

  function getTripStatus(startDate: string, endDate: string) {
    const currentDate = Date.now();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    let tripDirectory;
    if (currentDate > start && currentDate < end) tripDirectory = 'upcoming';
    if (currentDate < start) tripDirectory = 'upcoming';
    if (currentDate > end) tripDirectory = 'memories';
    return tripDirectory;
  }

  return (
    <div className={styles.body}>
      <NavBar />
      <div className={styles.main}>
        <HomeLeft currentTrips={currentTrips} pastTrips={pastTrips} />
        <Divider />
        <div className={styles.profileContainer}>
          <div className={styles.profile}>
            <img
              alt="profile picture"
              src="IMG_1640.jpg"
              className={styles.profileImage}
            />
            <div className={styles.profileInfo}>
              <p className={styles.profileText}>Danielle</p>
              <p className={styles.profileText}>{auth.currentUser?.email}</p>
            </div>
          </div>
          <div className={styles.invitations}>
            {tripInvites.length > 0 ? (
              <TripInviteList title="Invitations" trips={tripInvites} />
            ) : (
              <h2>No invites yet!</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
