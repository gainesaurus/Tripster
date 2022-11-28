import React, { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { ITripItem } from '../Types'

import NavBar from '../src/components/NavBar/NavBar'
import TripList from '../src/components/TripList/TripList'
import CreateTripForm from '../src/components/CreateTripForm/CreateTripForm'

export default function Home() {
  //MOCK DATA
  const tripItems:ITripItem[] = [
    {
      title: "Yosemite",
      startDate: 'June 3 2023',
      endDate: 'June 10 2023',
      id:1,
      pic_url: './yosemite.jpg',
    },
    {
      title: "Paris",
      startDate: 'Nov 30 2022',
      endDate: 'Dec 12 2022',
      id:2,
      pic_url: './paris.jpg',
    },
    {
      title: "Mexico",
      startDate: 'Sept 22 2019',
      endDate: 'Sept 28 2019',
      id:3,
      pic_url: './mexico.webp',
    },
  ];

  const [currentTrips, setCurrentTrips] = useState<ITripItem[]>([]);
  const [pastTrips, setPastTrips] = useState<ITripItem[]>([]);

  useEffect(() => {
    let currentTrips = tripItems.filter(item => getTripStatus(item.startDate, item.endDate) === 'upcoming');
    setCurrentTrips(currentTrips);
    let pastTrips = tripItems.filter(item => getTripStatus(item.startDate, item.endDate) === 'memories');
    setPastTrips(pastTrips);
  }, []);

  function getTripStatus(startDate: string, endDate: string) {
    const currentDate = Date.now();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    let tripDirectory;
    if(currentDate > start && currentDate < end) tripDirectory = 'upcoming';
    if (currentDate < start) tripDirectory = 'upcoming';
    if (currentDate > end) tripDirectory = 'memories';
    return tripDirectory;
  }



  return (
    <div>
      <NavBar/>
      <div className={styles.main}>
        <div className={styles.homeLeft}>
          <section>
            <h3 className={styles.header}>Upcoming Trips</h3>
            <div>
              <TripList trips={currentTrips}/>
            </div>
          </section>

          <section>
            <h3 className={styles.header}>Memories</h3>
            <div>
              <TripList trips={pastTrips}/>
            </div>
          </section>
        </div>

        <div className={styles.divide}></div>

        <div className={styles.homeRight}>
          <CreateTripForm/>
        </div>
      </div>
    </div>
  )
}
