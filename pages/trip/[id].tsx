import React from 'react';
import { useRouter } from 'next/router';

import TripHeader from '../../src/components/TripHeader/TripHeader';
import AttendeeList from '../../src/components/AttendeeList/AttendeeList';
import TripTimeline from '../../src/components/TripTimeline/TripTimeline';
import TripPinDrop from '../../src/components/TripPinDropList/TripPinDrop';

function Trip () {
  const router = useRouter();

  const { id } = router.query

  return (
    <div className='trip-container'>
      <TripHeader />
      <AttendeeList />
      <TripTimeline />
      <TripPinDrop />
    </div>
  )
}

export default Trip;