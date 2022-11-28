import styles from './NavBar.module.css';

const NavBar = () => {
  //MOCKDATA
  const user = {
    name: 'Danielle',
    user: 'daniellestroscher',
    email: 'd@test.com',
    profile_pic: 'url...',
  };

  return (
    <div className={styles.navigation}>
      <h1 className={styles.logo}>TRIPSTER</h1>
      <section className={styles.userInfo}>
        <p className={styles.para}>Welcome back {user.name}!</p>
        <img src='IMG_1640.jpg' alt='profile pic' className={styles.profile}/>
        <button className={styles.logout}>Logout</button>
      </section>
    </div>
  )
}
export default NavBar;