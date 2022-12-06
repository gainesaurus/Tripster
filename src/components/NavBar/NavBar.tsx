import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { logout } from '../../firebase';
import styles from './NavBar.module.css';
import { AccountCircle } from '@mui/icons-material';
import { useUserContext } from '../../Contexts/UserContext';
import { IUser } from '../../../Types';
import { getUser } from '../../services/userService';

const NavBar = () => {
  const userContext = useUserContext()
  const [user, setUser] = useState<IUser>();

  useEffect(()=> {
    retrieveUser()
  }, []);

  const retrieveUser = async () => {
    const user = await getUser(userContext.authUser?.uid as string) as IUser;
    setUser(user as IUser);
  }
  console.log(user);

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
              {
                user?
                <p className={styles.para}>Welcome back {user?.username}!</p>
                : <p>Welcome back!</p>
              }
              {user && user.profile_pic !== '/add_photo.png' ?
                <div className={styles.profileBox}>
                <img
                  src={user.profile_pic}
                  alt="profile pic"
                  className={styles.profile}
                  onClick={goToProfile}
                />
                </div> : <AccountCircle className={styles.blankProfile} fontSize='large' onClick={goToProfile}/>
              }
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
