import React, { useEffect } from 'react';
import { useState } from 'react';
import { ITripItem } from '../Types';

import NavBar from '../src/components/NavBar/NavBar';
import CreateTripForm from '../src/components/CreateTripForm/CreateTripForm';
import HomeLeft from '../src/components/HomeLeft/HomeLeft';
import Divider from '../src/components/Divider/Divider';
import { getAllTrips } from '../src/services/apiTrip';
import { auth } from '../src/firebase';
import { useRouter } from 'next/router';

import styles from '../styles/Home.module.css';

export default function Home() {
  const [currentTrips, setCurrentTrips] = useState<ITripItem[]>([]);
  const [upcomingTrips, setUpcomingTrips] = useState<ITripItem[]>([]);
  const [pastTrips, setPastTrips] = useState<ITripItem[]>([]);
  const [tripAdded, setTripAdded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) {
      auth.currentUser.getIdToken().then((token) => {
        getAllTrips(token).then((tripItems) => {
          console.log(tripItems)
          if (tripItems) {
            let currentTrips = tripItems.filter(
              (item) =>
                getTripStatus(item.startDate, item.endDate) === 'current',
            );
            setCurrentTrips(currentTrips);
            let upcomingTrips = tripItems.filter(
              (item) =>
                getTripStatus(item.startDate, item.endDate) === 'upcoming',
            );
            setUpcomingTrips(upcomingTrips);
            let pastTrips = tripItems.filter(
              (item) =>
                getTripStatus(item.startDate, item.endDate) === 'memories',
            );
            setPastTrips(pastTrips);
            setTripAdded(false);
          }
        });
      });
    } else router.replace('/login');
  }, [router, tripAdded]);

  function getTripStatus(startDate: string, endDate: string) {
    const currentDate = Date.now();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    let tripDirectory;
    if (currentDate > start && currentDate < end) tripDirectory = 'current';
    if (currentDate < start) tripDirectory = 'upcoming';
    if (currentDate > end) tripDirectory = 'memories';
    return tripDirectory;
  }

  const openForm = () => {
    document.getElementById('createTripForm')!.style.display = 'flex';
    document.getElementById('createTripForm')!.style.position = 'absolute';
  }

  const closeForm = () => {
    document.getElementById('createTripForm')!.style.display = 'none';
  }

  return (
    <div>
      <NavBar />
      <div className={styles.main}>
        <div className={styles.homeLeft}>
          <HomeLeft
            currentTrips={currentTrips}
            upcomingTrips={upcomingTrips}
            pastTrips={pastTrips}
            openForm={openForm}
          />
        </div>
        <Divider />
        <div className={styles.homeRight} id='createTripForm'>
          <CreateTripForm setTripAdded={setTripAdded} closeForm={closeForm} />
        </div>
      </div>
    </div>
  );
}
