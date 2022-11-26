import React from 'react';
import { useRouter } from 'next/router';
import TripHeader from '../../src/components/TripHeader';
import AttendeeList from '../../src/components/AttendeeList';

function Trip () {
  const router = useRouter();

  const { id } = router.query

  return (
    <div className='trip-container'>
      <TripHeader />
      <AttendeeList />
    </div>
  )
}

export default Trip;