import { useRouter } from 'next/router';
import { useState } from 'react';
import NavBar from '../src/components/NavBar/NavBar';
import { useUserContext } from '../src/Contexts/UserContext';
import { signIn, signUp } from '../src/firebase';
import { createUser } from '../src/services/userService';
import styles from '../styles/login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const context = useUserContext();
  const router = useRouter();

  const handleSubmit = () => {
    if (isLogin) {
      signIn(email, password)
        .then(() => {
          router.replace('/');
        })
        .catch((error) => console.log('Login error:', error));
    } else {
      signUp(email, password)
        .then(async (credentials) => {
          const token = await credentials.user.getIdToken();
          credentials.user.email &&
            (await createUser(token, credentials.user.email));
          router.replace('/');
        })
        .catch((error) => console.log('Register error:', error));
    }
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.input}>
        <div className={styles.logoCont}>
          <img className={styles.logo} src='https://static.wixstatic.com/media/3dbed1_5f26323111f34c199adfaa2153ded0e4~mv2.png'
            alt='vakay logo' />
          {/* <p className={styles.slogan}>you&apos;re invited!</p> */}
        </div>
        <div className={styles.selector}>
          <span
            className={[
              styles.selectorText,
              styles.borderRight,
              isLogin ? styles.selected : null,
            ].join(' ')}
            onClick={() => setIsLogin(true)}
          >
            Login
          </span>
          <span
            className={[
              styles.selectorText,
              !isLogin ? styles.selected : null,
            ].join(' ')}
            onClick={() => setIsLogin(false)}
          >
            Register
          </span>
        </div>
        <form className={styles.formBody}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={styles.inputText}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className={styles.inputText}
          />
          <input
            type="button"
            value={isLogin ? 'Login' : 'Register'}
            onClick={handleSubmit}
            className={styles.submitButton}
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
