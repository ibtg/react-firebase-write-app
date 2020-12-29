import React, { useEffect, useState } from 'react'
import Header from '../header/header'
import WritingList from '../writingList/writingList'
import styles from './like.module.css'
const Like = ({user, authService, writingRepository}) => {

  const [writings, setWritings] = useState({})

  useEffect(() => {
    const writingList = writingRepository.getLike(user.uid, (results)=>{
        setWritings(results)
    })
    return () => writingList()
  }, [writingRepository])

  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        {Object.entries(writings).map((writing)=>(
        <WritingList
          key={writing[1].writingId}
          subject={writing[1].subject}
          writingId={writing[1].writingId}
          writing={writing[1].writing}
          username={writing[1].username}
        ></WritingList>))  
        }
      </div>
    </>
  )

}

export default Like
