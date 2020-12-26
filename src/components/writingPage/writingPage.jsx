import React from 'react'
import styles from './writingPage.module.css'
import {BsChevronCompactLeft} from 'react-icons/bs'

const WritingPage = ({subjectId, writingInfo, subject, count, users, onWritingPage }) => {

  // console.log("writingInfo: ", writingInfo)
  // console.log("right: ", rightButton)
  // console.log("left: ", leftButton)


  return (

      <div className={styles.container}>
        <BsChevronCompactLeft 
          className={styles.leftArrow}
          onClick={onWritingPage}
          ></BsChevronCompactLeft>
        {Object.entries(users).map((user)=>(
        <div key={user[1].id} className={styles.content}>
          <h3 className={styles.title}>{subject}</h3>
          <p className={styles.writing}>{user[1].content}</p>
          <span className={styles.writer}>{user[0]}</span>
        </div>
        ))}

      </div>



  )
}

export default WritingPage
