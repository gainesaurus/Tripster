import React, { useState } from 'react';
import PinDropItem from '../PinDropItem/PinDropItem';
import { ILocation } from '../../../Types';
import styles from './TripPinDropList.module.css';
import { AddBox } from '@mui/icons-material';
import AddPinDropForm from '../AddPinDropForm/AddPinDropForm';
import { Wrapper } from '@googlemaps/react-wrapper';


interface TripPinDropsProps{
  locations: ILocation[]
}

const  TripPinDropList = ({ locations }:TripPinDropsProps) => {

  const [allLocations, setAllLocations] = useState<ILocation[]>(locations);

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
        <AddPinDropForm closeForm={closeForm} setAllLocations={setAllLocations} allLocations={allLocations}/>
      </div>
      <div className={styles.pinListContainer}>
        {
          allLocations.map((location:ILocation, index)=> {
            return <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string} libraries={["places"]} version={'weekly'} key={index + 1}>
            <PinDropItem key={index + 1} location={location} />
            </Wrapper>
          })
        }
      </div>
    </div>
  )
}

export default TripPinDropList;