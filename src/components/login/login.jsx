import React from 'react';
import styles from '../login/login.module.css'

const Login = ({authService}) =>{

  const onLogin = (event) =>{
    authService//
    .login(event.currentTarget.textContent)
    .then(console.log)
  }

  return(
    <section className={styles.login}>
        <h1>로그인</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>구글로 로그인</button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>깃허브로 로그인</button>
          </li>
        </ul>
    </section>
  )
}

export default Login;