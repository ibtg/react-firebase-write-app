import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './main.module.css'
import Header from '../header/header'


const Main = ({user, authService}) => {

  console.log("user: ", user)
  console.log("authService: ", authService)
  const historyState = useHistory().state;
  // const history = useHistory();
  // const [userId, setUserId] = useState(historyState && historyState.id)
  

  // useEffect(() => {
  //   
  //   if(!userId){
  //     return;
  //   }
  // }, [userId])

  // useEffect(() => {
  //   // console.log("auth check effect")
  //   authService.onAuthChange( user => {
      
  //     // console.log("auth check")
  //     if(user){
  //       setUserId(user.uid)
  //     }else{
  //       // if user does not log in, return to login page
  //       // console.log("push")
  //       history.push('/')
  //     }
  //   })

  // }, [authService, history])

  return(
    <>

      Main
    </>
  )
}

export default Main;



