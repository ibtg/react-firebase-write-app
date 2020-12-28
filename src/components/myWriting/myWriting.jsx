import React, { useEffect, useRef, useState } from 'react'
import styles from './myWriting.module.css'
import Header from '../header/header'
import { useHistory } from 'react-router-dom'

const MyWriting = ({user, authService, writingRepository}) => {

  const [myWriting, setMyWriting] = useState([])
  const subjectRef = useRef()
  const writingRef = useRef();
  const history = useHistory()
  const onEdit = (event) =>{
    event.preventDefault();
    const childeNodes = event.currentTarget.childNodes
    const subject = childeNodes[0].innerText
    const writing = childeNodes[1].innerText

    history.push({
      pathname:`/writepage/${subject}`,
      state:{
        subject: subject,
        writing: writing
      }

    })

  }

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
        <div key={writing[1].writingId} className={styles.content} onClick={onEdit}>
          <h3 className={styles.title} ref={subjectRef}>{writing[1].subject}</h3>
          <p className={styles.writing} ref={writingRef}>{  `${writing[1].writing}`.replace("\\n", "\n")}</p>
          <span className={styles.writer}>{writing[1].username}</span>
        </div>
        ))}
      </div>
      
    </>

  )
}

export default MyWriting
