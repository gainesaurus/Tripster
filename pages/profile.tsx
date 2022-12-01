import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import Divider from '../src/components/Divider/Divider';
import HomeLeft from '../src/components/HomeLeft/HomeLeft';
import NavBar from '../src/components/NavBar/NavBar';
import TripInviteList from '../src/components/TripInviteList/TripInviteList';
import { useUserContext } from '../src/Contexts/UserContext';
import { uploadImage } from '../src/firebase';
import { getInvites } from '../src/services/inviteService';
import { getUser, updateUser } from '../src/services/userService';
import styles from '../styles/profile.module.css';
import { ITripItem, IUser } from '../Types';

function Profile() {
  const initialState = {
    _id: '',
    uid: '',
    username: '',
    email: '',
    profile_pic: '',
  };

  const [tripInvites, setTripInvites] = useState<ITripItem[]>([]);
  const [user, setUser] = useState<IUser>(initialState);
  const userContext = useUserContext();
  const inputFile = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getInvites(userContext.token).then((invites) => {
      invites && setTripInvites(invites);
    });
    getUser(userContext.uid).then((user) => {
      user && setUser(user);
      console.log(user);
    });
  }, [userContext]);

  const handleImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImg = e.target.files[0];
      const blob = await newImg.arrayBuffer();
      const img = await uploadImage(blob);
      if (img) {
        updateUser(userContext.token, { ...user, profile_pic: img?.imageUrl });
        setUser({ ...user, profile_pic: img.imageUrl });
      }
    }
  };

  const handleUsernameChange = async (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    updateUser(userContext.token, user);
  };

  return (
    <div className={styles.body}>
      <NavBar />
      <div className={styles.main}>
        <HomeLeft />
        <Divider />
        <div className={styles.profileContainer}>
          <div className={styles.profile}>
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: 'none' }}
              accept="image/*"
              multiple={false}
              onChange={handleImgChange}
            />
            <img
              alt="profile picture"
              src={user.profile_pic}
              className={styles.profileImage}
              onClick={() => inputFile.current?.click()}
            />
            <form className={styles.profileInfo}>
              <input
                type="text"
                className={styles.profileText}
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Add your username"
              />
              <p className={styles.profileText}>{user.email}</p>
              <input
                type="submit"
                value="Save"
                onClick={handleUsernameChange}
              />
            </form>
          </div>
          <div className={styles.invitations}>
            {tripInvites.length > 0 ? (
              <TripInviteList title="Invitations" trips={tripInvites} />
            ) : (
              <h2>No invites yet!</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
