import React from 'react';
import { useRouter } from 'next/router';

import TripHeader from '../../src/components/TripHeader/TripHeader';
import AttendeeList from '../../src/components/AttendeeList/AttendeeList';
import AlbumList from '../../src/components/AlbumList/AlbumList';
import TripTimeline from '../../src/components/TripTimeline/TripTimeline';
import TripPinDrop from '../../src/components/TripPinDropList/TripPinDropList';

function Trip () {
  const router = useRouter();

  const { id } = router.query

  return (
    <div className='trip-container'>
      <TripHeader />
      <AttendeeList />
      <AlbumList />
      <TripTimeline />
      <TripPinDrop />
    </div>
  )
}

export default Trip;