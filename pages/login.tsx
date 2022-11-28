import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, signUp } from '../src/firebase';
import styles from '../styles/login.module.css';
import { useUser } from '../src/components/AppContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const userContext = useUser();
  const router = useRouter();

  const handleSubmit = () => {
    if (isLogin) {
      signIn(email, password)
        .then((credential) => {
          userContext?.setUser({ uid: credential.user.uid });
          router.replace('/');
        })
        .catch((error) => console.log('Login error:', error));
    } else {
      signUp(email, password)
        .then((credential) => {
          userContext?.setUser({ uid: credential.user.uid });
          router.replace('/');
        })
        .catch((error) => console.log('Register error:', error));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <div className={styles.selector}>
          <text
            className={[
              styles.selectorText,
              styles.borderRight,
              isLogin ? styles.selected : null,
            ].join(' ')}
            onClick={() => setIsLogin(true)}
          >
            Login
          </text>
          <text
            className={[
              styles.selectorText,
              !isLogin ? styles.selected : null,
            ].join(' ')}
            onClick={() => setIsLogin(false)}
          >
            Register
          </text>
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
