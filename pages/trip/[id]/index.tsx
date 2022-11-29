import React from 'react';
import { useRouter } from 'next/router';

import TripHeader from '../../../src/components/TripHeader/TripHeader';
import AttendeeList from '../../../src/components/AttendeeList/AttendeeList';
import AlbumList from '../../../src/components/PhotoAlbumList/AlbumList';
import TripTimeline from '../../../src/components/TimeLineList/TimeLineList';
import TripPinDropList from '../../../src/components/TripPinDropList/TripPinDropList';
import LodgingList from '../../../src/components/LodgingList/LodgingList';

export default function TripPage() {
  const router = useRouter();
  const { id } = router.query

  //Mock Data
  let trip = {
    title: "Grand Tetons FTW",
    startDate: 'May 3 2023',
    endDate: 'May 9 2023',
    id:1,
    pic_url: './yosemite.jpg',
    attendees: [
      {
        id:1,
        username:'danielle',
        email:'d@test.com',
        profile_pic:'./profile.jpg',
      },
      {
        id:2,
        username:'someone',
        email:'',
        profile_pic:''
      }
    ],
    photos: [
      {
        src: 'https://res.cloudinary.com/enchanting/q_70,f_auto,c_fit,dpr_2,w_700,h_400/exodus-web/2022/09/Landing-page-walking.jpg',
        width: 20,
        height: 20,
      },
    ],
    locations: [
      {
        info: 'Tonights Beach Bonfire',
        latLng: '40.6063179, -122.5301481',
        ts: '04/20/2022',
      },
      {
        info: 'Meet here before site-seeing today!',
        latLng: '34.67, -10.88',
        ts: '04/20/2022'
      }
    ],
    lodging: [
      {
        title: 'Danielles Place',
        address: '6155 Oracle Rd, Sechelt, BC, Canada',
        pic_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMmrIA27K-t7Uf9LMW9ZztqY9kb9lGzLKrqw&usqp=CAU',
        latLng: '',
      }

    ]
  }

  return (
    <div className='trip-container'>
      <TripHeader title={trip.title} start={trip.startDate} end={trip.endDate} pic={trip.pic_url} />
      <AttendeeList attendees={trip.attendees} />
      <AlbumList photos={trip.photos} id={trip.id} />
      <TripTimeline />
      <TripPinDropList pinDrops={trip.locations} />
      <LodgingList lodging={trip.lodging}></LodgingList>
    </div>
  )
}
