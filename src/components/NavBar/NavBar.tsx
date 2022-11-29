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
      <img className={styles.logo} onClick={goToHome}
        src='https://static.wixstatic.com/media/3dbed1_672e6e2a9fad4b57b166897e41d8ac31~mv2.png/v1/fill/w_418,h_163,al_c,q_85,enc_auto/3dbed1_672e6e2a9fad4b57b166897e41d8ac31~mv2.png'
        alt='vakay logo'
      />
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
