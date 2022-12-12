import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { IUser } from '../../../Types';
import { useUserContext } from '../../Contexts/UserContext';
import { uploadImage } from '../../firebase';
import { getUser, updateUser } from '../../services/userService';
import styles from './ProfileInfo.module.css';

function ProfileInfo() {
  const initialState = {
    _id: '',
    uid: '',
    username: '',
    email: '',
    profile_pic: '',
  };

  const [user, setUser] = useState<IUser>(initialState);
  const inputFile = useRef<HTMLInputElement>(null);
  const userContext = useUserContext();

  useEffect(() => {
    userContext.authUser &&
      getUser(userContext.authUser?.uid).then((user) => {
        user && setUser(user);
      });
  }, [userContext]);

  const handleImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (userContext.authUser && e.target.files) {
      const newImg = e.target.files[0];
      const blob = await newImg.arrayBuffer();
      const img = await uploadImage(blob);
      if (img) {
        updateUser(userContext.authUser?.token, {
          ...user,
          profile_pic: img?.imageUrl,
        });
        setUser({ ...user, profile_pic: img.imageUrl });
      }
    }
  };

  const handleUsernameChange = async (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    userContext.authUser && updateUser(userContext.authUser.token, user);
  };

  return (
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
      <div className={styles.profileImgBox}>
        <img
          alt="profile picture"
          src={user.profile_pic}
          className={styles.profileImage}
          onClick={() => inputFile.current?.click()}
        />
      </div>
      <form className={styles.profileInfo}>
        <input
          type="text"
          className={styles.profileText}
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Add your username..."
        />
        <input
          className={styles.profileText}
          readOnly={true}
          value={user.email}
        />
        <input
          type="submit"
          value="Save"
          onClick={handleUsernameChange}
          className={styles.save}
        />
      </form>
    </div>
  );
}

export default ProfileInfo;
