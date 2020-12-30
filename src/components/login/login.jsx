import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../login/login.module.css'

const Login = ({authService}) =>{
  
  const history = useHistory();

  const goToWriting = () =>{
    history.push({
      pathname:'/writing',
    })

  }

  const onLogin = (event) =>{
    authService//
    .login(event.currentTarget.name)
    .then(data=>goToWriting(data.user.uid))
    // console.log(event.currentTarget.name)
  }

  useEffect(() => {
    authService.onAuthChange(user =>{
      user && goToWriting(user.uid)
    })

  })

  return(
    <section className={styles.login}>
        <h1>로그인</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin} name="Google">구글로 로그인</button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin} name="Github">깃허브로 로그인</button>
          </li>
        </ul>
    </section>
  )
}

export default Login;