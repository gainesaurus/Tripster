import React, { FC } from 'react';
import PinDropItem from '../PinDropItem/PinDropItem';
import { ILocation } from '../../../Types';
import styles from './TripPinDropList.module.css';

import { Wrapper } from '@googlemaps/react-wrapper';

interface TripPinDropsProps{
  pinDrops: Array<ILocation>
}

const  TripPinDropList: FC<TripPinDropsProps> = ({ pinDrops }) => {
  return (
    <div className={styles.Container}>
      <h1 className={styles.locationTitle}>Locations</h1>
      <div className={styles.pinListContainer}>
        {
          pinDrops.map((location:ILocation)=> {
            return <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string} libraries={["places"]} version={'weekly'} key={location._id}>
            <PinDropItem key={location._id} location={location} />
            </Wrapper>
          })
        }
      </div>
    </div>
  )
}

export default TripPinDropList;