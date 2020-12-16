import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './main.module.css'
import Sidebar from '../sidebar/sidebar'
import Header from '../header/header'

const Main = ({authService}) => {

  const historyState = useHistory().state;
  const history = useHistory();
  const [userId, setUserId] = useState(historyState && historyState.id)
  const [sidebar, setSidebar] = useState(false)

  const onClickMenu = () => {
    setSidebar(!sidebar)
  }

  const onLogout = () =>{
    authService.logout();
  }

  // useEffect(() => {
  //   
  //   if(!userId){
  //     return;
  //   }
  // }, [userId])

  useEffect(() => {
    // console.log("auth check effect")
    authService.onAuthChange( user => {
      
      // console.log("auth check")
      if(user){
        setUserId(user.uid)
      }else{
        // if user does not log in, return to login page
        // console.log("push")
        history.push('/')
      }
    })

  })

  return(
    <>
      <Header onClickMenu={onClickMenu} ></Header>
      <Sidebar sidebar={sidebar} onClickMenu={onClickMenu} onLogout={onLogout}></Sidebar>
    </>
  )
}

export default Main;



