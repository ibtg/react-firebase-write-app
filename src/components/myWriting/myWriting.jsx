import React, { useEffect, useState } from 'react'
import styles from './myWriting.module.css'
import Header from '../header/header'

const MyWriting = ({user, authService, writingRepository}) => {

  const [myWriting, setMyWriting] = useState([])


  useEffect(() => {
    
    writingRepository.getMyWriting(user.uid, (writing)=>{
      setMyWriting(writing)})

  },[writingRepository, user])

  // console.log("myWriting: ", myWriting)

  return (
    <>
      <Header authService={authService}></Header>
      <div className={styles.container}>
        {myWriting.map((writing)=>(
        <div key={writing[1].writingId} className={styles.content}>
          <h3 className={styles.title}>{writing[1].subject}</h3>
          <p className={styles.writing}>{  `${writing[1].writing}`.replace("\\n", "\n")}</p>
          <span className={styles.writer}>{writing[1].username}</span>
        </div>
        ))}
      </div>
      
    </>

  )
}

export default MyWriting
