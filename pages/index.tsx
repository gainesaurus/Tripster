import CreateTripForm from '../src/components/CreateTripForm/CreateTripForm';
import Divider from '../src/components/Divider/Divider';
import HomeLeft from '../src/components/HomeLeft/HomeLeft';
import NavBar from '../src/components/NavBar/NavBar';
import styles from '../styles/Home.module.css';

export default function Home() {
  const openForm = () => {
    document.getElementById('createTripForm')!.style.display = 'flex';
    document.getElementById('createTripForm')!.style.position = 'absolute';
  }

  const closeForm = () => {
    document.getElementById('createTripForm')!.style.display = 'none';
  }
  
  return (
    <div>
      <NavBar />
      <div className={styles.main}>
        <div className={styles.homeLeft}>
          <HomeLeft
            openForm={openForm}
          />
        </div>
        <Divider />
        <div className={styles.homeRight} id='createTripForm'>
          <CreateTripForm closeForm={closeForm} />
        </div>
      </div>
    </div>
  );
}
