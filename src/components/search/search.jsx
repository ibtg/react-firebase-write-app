import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './search.module.css'
import Header from '../header/header'

const Search = ({authService, writingRepository}) => {
  
  const historyState = useHistory().location.state
  // const history 
  // const [subject, setSubject] = useState(historyState && historyState.subject)
  const [writings, setWritings] = useState({})

  useEffect(() => {
    
    // console.log("historyState: ", historyState)
 
    const writingList =  writingRepository.getSearch(historyState.subject, (results)=>{
      setWritings(results)
      
  })
  return ()=>writingList();

  },[writingRepository , historyState])

  // console.log("subject: ", subject)
  // console.log("writings object: ", Object.entries(writings))
  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        {writings!== null ?

      Object.entries(writings).map((writing)=>(
        <div key={writing[1].writingId} className={styles.content}>
          <h3 className={styles.title}>{writing[1].subject}</h3>
          <p className={styles.writing}>{writing[1].writing}</p>
          <span className={styles.writer}>{writing[1].username}</span>
        </div>
        ))  
        :
        <div className={styles.pageNotFound}>
          검색 결과가 없습니다 
        </div>
        }



      </div>
    </>

  )
}

export default Search
