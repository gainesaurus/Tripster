import React from 'react'
import { MoonLoader } from 'react-spinners';

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

const FullPageLoader = () => (
  <div style={styles.container}>
    {/* <h3>Loading...</h3> */}
    <MoonLoader color="#fff" size={25} speedMultiplier={0.75} />
  </div>
)

export default FullPageLoader;