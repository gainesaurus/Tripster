import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import HomeLeft from '../../../src/components/HomeLeft/HomeLeft';
import Divider from '../../../src/components/Divider/Divider';
import TripHeader from '../../../src/components/TripHeader/TripHeader';
import AttendeeList from '../../../src/components/AttendeeList/AttendeeList';
import AlbumList from '../../../src/components/PhotoAlbumList/AlbumList';
import TripPinDropList from '../../../src/components/TripPinDropList/TripPinDropList';
import LodgingList from '../../../src/components/LodgingList/LodgingList';
import TimeLineList from '../../../src/components/TimeLineList/TimeLineList';
import { ITripItem } from '../../../Types';

import styles from '../../../styles/Trip.module.css';
import NavBar from '../../../src/components/NavBar/NavBar';

export default function TripPage() {
  const router = useRouter();
  const { id } = router.query

  const [currentTrips, setCurrentTrips] = useState<ITripItem[]>([]);
  const [upcomingTrips, setUpcomingTrips] = useState<ITripItem[]>([]);
  const [pastTrips, setPastTrips] = useState<ITripItem[]>([]);
  const [tripInvites, setTripInvites] = useState<ITripItem[]>([]);

  const tripItems: ITripItem[] = [
    {
      title: 'Yosemite',
      startDate: 'June 3 2023',
      endDate: 'June 10 2023',
      _id: '1',
      picUrl: './yosemite.jpg',
    },
    {
      title: 'Paris',
      startDate: 'Nov 27 2022',
      endDate: 'Dec 12 2022',
      _id: '2',
      picUrl: './paris.jpg',
    },
    {
      title: 'Mexico',
      startDate: 'Sept 22 2019',
      endDate: 'Sept 28 2019',
      _id: '3',
      picUrl: './mexico.webp',
    },
  ];

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
    let tripInvites = tripItems.filter((item, index) => index !== 0);
    setTripInvites(tripInvites);
  }, []);

  console.log(currentTrips, upcomingTrips, pastTrips);

  //Mock Data
  let trip = {
    title: "Grand Tetons FTW",
    startDate: 'May 3 2023',
    endDate: 'May 9 2023',
    _id: '1',
    picUrl: './yosemite.jpg',
    attendees: [
      {
        _id:'6',
        uid:'234',
        username:'danielle',
        email:'d@test.com',
        profile_pic:'./profile.jpg',
      },
      {
        _id: '2',
        uid: '235',
        username:'someone',
        email:'',
        profile_pic:'',
      }
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
        latLng: '40.6063179, -122.5301481',
        ts: '04/20/2022',
        _id:'100',
        tripId: '345678',
      },
      {
        info: 'Meet here before site-seeing today!',
        latLng: '34.67, -10.88',
        ts: '04/20/2022',
        _id:'101',
        tripId: '345678',
      }
    ],
    lodging: [
      {
        title: 'Danielles Place',
        address: '6155 Oracle Rd, Sechelt, BC, Canada',
        picUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMmrIA27K-t7Uf9LMW9ZztqY9kb9lGzLKrqw&usqp=CAU',
        latLng: '',
        _id:'102',
        tripId: '345678',
      }
    ]
  }

  return (
    <div className={styles.page}>
      <NavBar />
      <div className={styles.pageContainer}>
        <div className={styles.homeContainer}>
          <HomeLeft currentTrips={currentTrips} upcomingTrips={upcomingTrips} pastTrips={pastTrips} />
          <Divider />
        </div>
        <div className={styles.tripContainer}>
          <TripHeader title={trip.title} start={trip.startDate} end={trip.endDate} pic={trip.picUrl} />
          <AttendeeList attendees={trip.attendees} />
          <AlbumList photos={trip.photos} id={trip._id} />
          <TimeLineList tripId={id}/>
          <TripPinDropList pinDrops={trip.locations} />
          <LodgingList lodging={trip.lodging}></LodgingList>
        </div>
      </div>
    </div>
  )
}
