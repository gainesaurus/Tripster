import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CreateTripForm from '../src/components/CreateTripForm/CreateTripForm';
import Divider from '../src/components/Divider/Divider';
import HomeLeft from '../src/components/HomeLeft/HomeLeft';
import NavBar from '../src/components/NavBar/NavBar';
import { useUserContext } from '../src/Contexts/UserContext';
import styles from '../styles/Home.module.css';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import FullPageLoader from '../src/components/FullPageLoader/FullPageLoader';

function Home() {
  const router = useRouter();
  const userContext = useUserContext();

  useEffect(() => {
    if (!userContext.loading && !userContext.authUser) router.replace('/login');
  }, [userContext, router]);

  const openForm = () => {
    document.getElementById('createTripForm')!.style.display = 'flex';
    document.getElementById('createTripForm')!.style.position = 'absolute';
  };

  const closeForm = () => {
    document.getElementById('createTripForm')!.style.display = 'none';
  };

  return (
    <div>
      <NavBar />
      <div className={styles.main}>
        <div className={styles.homeLeft}>
          <HomeLeft openForm={openForm} />
        </div>
        <Divider />
        <div className={styles.homeRight} id="createTripForm">
          <CreateTripForm closeForm={closeForm} />
        </div>
      </div>
    </div>
  );
}
export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: FullPageLoader,
})(Home);

