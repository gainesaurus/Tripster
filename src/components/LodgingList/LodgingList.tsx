import React, { FC } from 'react';
import LodgingItem from '../LodgingItem/LodgingItem';
import { ILodge } from '../../../Types';
import styles from './LodgingList.module.css';

interface LodgingListProps{
  lodging: Array<ILodge>
}

const  LodgingList: FC<LodgingListProps> = ({ lodging }) => {
  return (
    <div className={styles.Container}>
      <h1 className={styles.locationTitle}>Lodging</h1>
      <div className={styles.LodgeListContainer}>
        {
          lodging.map((lodge:ILodge, i)=> {
            return  <LodgingItem key={i + 1} lodge={lodge} />
          })
        }
      </div>
    </div>
  )
}

export default LodgingList;