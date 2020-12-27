import React, { useState } from 'react'
import styles from './writingPage.module.css'
import {BsChevronCompactLeft} from 'react-icons/bs'

const WritingPage = ({subject, subjectId, writings, onWritingPage}) => {

  // console.log("writings: ", writings)
  // console.log("writings entries: ", Object.entries(writings))

  return (
      <div className={styles.container}>
        <BsChevronCompactLeft 
          className={styles.leftArrow}
          onClick={onWritingPage}
          ></BsChevronCompactLeft>
        {Object.entries(writings).map((writing)=>(
        <div key={writing[1].writingId} className={styles.content}>
          <h3 className={styles.title}>{writing[1].subject}</h3>
          <p className={styles.writing}>{writing[1].writing}</p>
          <span className={styles.writer}>{writing[1].username}</span>
        </div>
        ))}
      </div>
  )
}

export default WritingPage
