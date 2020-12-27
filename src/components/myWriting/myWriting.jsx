import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {BsChevronCompactLeft} from 'react-icons/bs'
import styles from './myWriting.module.css'
import Header from '../header/header'

const MyWriting = ({authService, writingRepository}) => {

  const history = useHistory();
  const [user, setUser] = useState()
  const [myWriting, setMyWriting] = useState([])

  useEffect(() => {
    // check user log in
    authService.onAuthChange(user =>{
      if(!user){
        history.push('/')
      }
      // await const useFunc = ()=>{
        
      // }

      setUser(user)

    })

    // console.log("user inner : ", user)


    // const getmyWriting = writingRepository.getMyWriting(user.uid, (writing)=>{
    // setMyWriting(writing)})



  }, [])

  useEffect(() => {

    // console.log("useEFfect 2", user)
    if(user){
      const getmyWriting = writingRepository.getMyWriting(user.uid, (writing)=>{
        setMyWriting(writing)
      })


    }


    // return () => getmyWriting();
    

  },[writingRepository, user])

  console.log("myWriting: ", myWriting)
  console.log("myWriting: obj", Object.entries(myWriting))

  return (
    <>
      <Header authService={authService}></Header>
      <div className={styles.container}>
        {Object.entries(myWriting).map((writing)=>(
        <div key={writing[1].contentId} className={styles.content}>
          <h3 className={styles.title}>{writing[1].subject}</h3>
          <p className={styles.writing}>{writing[1].content}</p>
          <span className={styles.writer}>{writing[1].username}</span>
        </div>
        ))}
      </div>
      
    </>

  )
}

export default MyWriting
