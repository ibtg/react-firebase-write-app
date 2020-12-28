import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './search.module.css'
import Header from '../header/header'

const Search = ({authService, writingRepository}) => {
  
  const historyState = useHistory().location.state
  const [subject, setSubject] = useState(historyState && historyState.subject)
  const [writings, setWritings] = useState({})

  useEffect(() => {
    
    const writingList =  writingRepository.getSearch(subject, (results)=>{
      setWritings(results)
      
  })
  return ()=>writingList();

  },[writingRepository ,subject])

  // console.log("writings: ", writings)
  // console.log("writings object: ", Object.entries(writings))
  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        {Object.entries(writings).map((writing)=>(
        <div key={writing[1].writingId} className={styles.content}>
          <h3 className={styles.title}>{writing[1].subject}</h3>
          <p className={styles.writing}>{writing[1].writing}</p>
          <span className={styles.writer}>{writing[1].username}</span>
        </div>
        ))}
      </div>
    </>

  )
}

export default Search
