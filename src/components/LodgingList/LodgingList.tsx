import React, { FC, useState, useEffect } from 'react';
import LodgingItem from '../LodgingItem/LodgingItem';
import AddLodgingForm from '../AddLodgingForm/AddLodgingForm';
import { ILodge } from '../../../Types';

import styles from './LodgingList.module.css';
import { AddBox } from '@mui/icons-material';
import { getLodgingsByTripId } from '../../services/lodgingService';
import { useUserContext } from '../../Contexts/UserContext';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next'
import { InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';

// InferGetServerSidePropsType<typeof getServerSideProps>
interface LodgingListProps {
  lodgings: ILodge[]
  tripId: string
}

const  LodgingList = ({ lodgings, tripId }: LodgingListProps) => {
  const user = useUserContext();
  const [allLodging, setAllLodging] = useState<ILodge[]>([]);
  console.log(lodgings);

  useEffect(()=>{
    // setAllLodging(lodgings);
    getLodging();
  }, []);

  const getLodging = async () => {
    const lodgings = await getLodgingsByTripId(user.authUser!.token, tripId as string);
    if (lodgings) {
      setAllLodging(lodgings);
    }
  }

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

// export const getServerSideProps: GetServerSideProps<{lodgings: ILodge[]}> = async (context) => {
//   const router = useRouter();
//   const tripId = router.query.id;
//   const user = useUserContext();
//   const lodgings = await getLodgingsByTripId(user.authUser!.token, tripId as string) as ILodge[];
//   return { props: { lodgings } }
// }

export default LodgingList;