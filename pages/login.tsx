import { UserCredential } from 'firebase/auth';
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { signIn } from '../src/firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleEmailAndPasswordLogin = () => {
    signIn(email, password)
    .then(() => {
      router.replace('/')
    })
    .catch(() => console.log('Login error'))
  }
  
  return (
    <form>
      <input type='button' value='Login' onClick={handleEmailAndPasswordLogin} />
    </form>
  )
}

export default Login