import React from 'react';
import { useRouter } from 'next/router';

import TripHeader from '../../../src/components/TripHeader/TripHeader';
import AttendeeList from '../../../src/components/AttendeeList/AttendeeList';
import AlbumList from '../../../src/components/PhotoAlbumList/AlbumList';
import TimeLineList from '../../../src/components/TimeLineList/TimeLineList';
import TripPinDrop from '../../../src/components/TripPinDropList/TripPinDropList';

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
      {
        src: 'https://res.cloudinary.com/enchanting/q_70,f_auto,c_fit,dpr_2,w_700,h_400/exodus-web/2022/09/Landing-page-walking.jpg',
        width: 20,
        height: 20,
      }

    ]
  }

  return (
    <div className='trip-container'>
      <TripHeader title={trip.title} start={trip.startDate} end={trip.endDate} pic={trip.pic_url} />
      <AttendeeList attendees={trip.attendees} />
      <AlbumList photos={trip.photos} id={trip.id} />
      <TimeLineList />
      <TripPinDrop />
    </div>
  )
}
