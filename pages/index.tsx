import CreateTripForm from '../src/components/CreateTripForm/CreateTripForm';
import Divider from '../src/components/Divider/Divider';
import HomeLeft from '../src/components/HomeLeft/HomeLeft';
import NavBar from '../src/components/NavBar/NavBar';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className={styles.main}>
        <HomeLeft />
        <Divider />
        <div className={styles.homeRight}>
          <CreateTripForm />
        </div>
      </div>
    </div>
  );
}
