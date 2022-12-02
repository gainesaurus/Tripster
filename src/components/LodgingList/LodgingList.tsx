import React, { FC, useState, useEffect } from 'react';
import LodgingItem from '../LodgingItem/LodgingItem';
import AddLodgingForm from '../AddLodgingForm/AddLodgingForm';
import { ILodge } from '../../../Types';

import styles from './LodgingList.module.css';
import { AddBox } from '@mui/icons-material';


// interface LodgingListProps{
//   lodging: Array<ILodge>
// }

const  LodgingList = () => {
  const [allLodging, setAllLodging] = useState<ILodge[]>([{
    title: 'Danielles Place',
    address: '6155 Oracle Rd, Sechelt, BC',
    latLng: {
      lat: 1,
      lng: -2,
    },
    _id: '102',
    tripId: '1',
  }],);

  useEffect(()=> {
    setAllLodging(allLodging);

  }, [allLodging])

  const openForm = () => {
    document.getElementById('addLodgingForm')!.style.display = 'flex';
  }

  const closeForm = () => {
    document.getElementById('addLodgingForm')!.style.display = 'none';
  }

  return (
    <div className={styles.Container}>
      <div className={styles.title}>
        <h1 className={styles.locationTitle}>Lodging</h1>
        <button onClick={openForm} className={styles.button}>
            <AddBox className={styles.addIcon}/>
        </button>
      </div>
      <div id='addLodgingForm' className={styles.addLodgingForm}>
        <AddLodgingForm closeForm={closeForm} setAllLodging={setAllLodging} allLodging={allLodging}/>
      </div>
      <div className={styles.LodgeListContainer}>
        {
          allLodging.map((lodge:ILodge, i)=> {
            return  <LodgingItem key={i + 1} lodge={lodge} />
          })
        }
      </div>
    </div>
  )
}

export default LodgingList;