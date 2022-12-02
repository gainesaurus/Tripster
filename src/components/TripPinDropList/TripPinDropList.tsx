import React, { FC } from 'react';
import PinDropItem from '../PinDropItem/PinDropItem';
import { ILocation } from '../../../Types';
import styles from './TripPinDropList.module.css';
import { AddBox } from '@mui/icons-material';
import AddPinDropForm from '../AddPinDropForm/AddPinDropForm';

import { Wrapper } from '@googlemaps/react-wrapper';

interface TripPinDropsProps{
  pinDrops: Array<ILocation>
}

const  TripPinDropList: FC<TripPinDropsProps> = ({ pinDrops }) => {

  const openForm = () => {
    document.getElementById('addPinDropForm')!.style.display = 'flex';
  }

  const closeForm = () => {
    document.getElementById('addPinDropForm')!.style.display = 'none';
  }

  return (
    <div className={styles.Container}>
      <div className={styles.title}>
        <h1 className={styles.locationTitle}>Locations</h1>
        <button onClick={openForm} className={styles.button}>
            <AddBox className={styles.addIcon}/>
        </button>
      </div>
      <div id='addPinDropForm' className={styles.addPinDropForm}>
        <AddPinDropForm closeForm={closeForm}/>
      </div>
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