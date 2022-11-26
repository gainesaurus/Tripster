import React, { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { ITripItem } from '../Types'

import NavBar from '../src/components/NavBar'
import TripList from '../src/components/TripList'
import CreateTripForm from '../src/components/CreateTripForm'

export default function Home() {
  //MOCK DATA
  const tripItems:ITripItem[] = [
    {
      title: "Yosemite",
      date: 'June 3 - 10 2023',
      id:1,
      pic_url: './yosemite.jpg',
      status: 'future',
    },
    {
      title: "Paris",
      date: 'Nov 30 - Dec 12th, 2022',
      id:2,
      pic_url: './paris.jpg',
      status: 'future',
    },
    {
      title: "Mexico",
      date: 'Sept 22 - 28, 2019',
      id:3,
      pic_url: './mexico.webp',
      status: 'past',
    },
  ];

  const [currentTrips, setCurrentTrips] = useState<ITripItem[]>([]);
  const [pastTrips, setPastTrips] = useState<ITripItem[]>([]);

  useEffect(() => {
    let currentTrips = tripItems.filter(item => item.status === 'future');
    setCurrentTrips(currentTrips);
    let pastTrips = tripItems.filter(item => item.status === 'past');
    setPastTrips(pastTrips);
  }, []);



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
