import styles from './NavBar.module.css';
import { useRouter } from 'next/router';

const NavBar = () => {
  //MOCKDATA
  const user = {
    name: 'Danielle',
    user: 'daniellestroscher',
    email: 'd@test.com',
    profile_pic: 'url...',
  };

  const router = useRouter();

  const goToProfile = () => {
    router.pathname !== '/profile' && router.push('/profile');
  };

  const goToHome = () => {
    router.pathname !== '/' && router.push('/');
  };

  return (
    <div className={styles.navigation}>
      <h1 className={styles.logo} onClick={goToHome}>
        TRIPSTER
      </h1>
      {router.pathname !== '/login' ? (
        <section className={styles.userInfo}>
          <p className={styles.para}>Welcome back {user.name}!</p>
          <img
            src="IMG_1640.jpg"
            alt="profile pic"
            className={styles.profile}
            onClick={goToProfile}
          />
          <button className={styles.logout}>Logout</button>
        </section>
      ) : null}
    </div>
  );
};
export default NavBar;
