import { useRouter } from 'next/router';
import { logout } from '../../firebase';
import styles from './NavBar.module.css';
import { AccountCircle } from '@mui/icons-material';

const NavBar = () => {
  //MOCKDATA
  const user = {
    name: 'Danielle',
    user: 'daniellestroscher',
    email: 'd@test.com',
    profile_pic: '',
  };

  const router = useRouter();

  const goToProfile = () => {
    router.pathname !== '/profile' && router.push('/profile');
  };

  const goToHome = () => {
    router.pathname !== '/' && router.push('/');
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <>
      <div className={styles.navigation}>
        <img
          className={styles.logo}
          onClick={goToHome}
          src="https://static.wixstatic.com/media/3dbed1_550db7f924204c39b795fb469389b157~mv2.png/v1/fill/w_425,h_149,al_c,q_85,enc_auto/3dbed1_550db7f924204c39b795fb469389b157~mv2.png"
          alt="vakay logo"
        />
        <div>
          {router.pathname !== '/login' ? (
            <section className={styles.userInfo}>
              <p className={styles.para}>Welcome back {user.name}!</p>
              {user.profile_pic ? <img
                src={user.profile_pic}
                alt="profile pic"
                className={styles.profile}
                onClick={goToProfile}
              /> : <AccountCircle className={styles.blankProfile} fontSize='large' />}
              <button className={styles.logout} onClick={handleLogout}>
                Logout
              </button>
            </section>
          ) : null}
        </div>
      </div>
      <div className={styles.spacer}></div>
    </>
  );
};
export default NavBar;
