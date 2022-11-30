import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { ITripItem } from '../Types';

import NavBar from '../src/components/NavBar/NavBar';
import CreateTripForm from '../src/components/CreateTripForm/CreateTripForm';
import HomeLeft from '../src/components/HomeLeft/HomeLeft';
import Divider from '../src/components/Divider/Divider';

export default function Home() {
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
      startDate: 'Nov 27 2022',
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
  const [upcomingTrips, setUpcomingTrips] = useState<ITripItem[]>([]);
  const [pastTrips, setPastTrips] = useState<ITripItem[]>([]);

  useEffect(() => {
    let currentTrips = tripItems.filter(
      (item) => getTripStatus(item.startDate, item.endDate) === 'current',
    );
    setCurrentTrips(currentTrips);
    let upcomingTrips = tripItems.filter(
      (item) => getTripStatus(item.startDate, item.endDate) === 'upcoming',
    )
    setUpcomingTrips(upcomingTrips);
    let pastTrips = tripItems.filter(
      (item) => getTripStatus(item.startDate, item.endDate) === 'memories',
    );
    setPastTrips(pastTrips);
  }, []);

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

  return (
    <div>
      <NavBar />
      <div className={styles.main}>
        <HomeLeft currentTrips={currentTrips} upcomingTrips={upcomingTrips} pastTrips={pastTrips} />
        <Divider />
        <div className={styles.homeRight}>
          <CreateTripForm />
        </div>
      </div>
    </div>
  );
}
