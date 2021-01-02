import React from 'react'
import styles from './writingList.module.css'

const WritingList = ({subject, subjectId, writing, username, alignCenter, onMove}) => {
  return (
    <div data-id={subjectId} className={styles.content} onClick={onMove}>
      <h3 className={styles.title}>{subject}</h3>
      <p className={alignCenter ? `${styles.writing} ${styles.center}`:`${styles.writing}`}>{writing}</p>
      <span className={styles.writer}>{username}</span>
  </div>
  )
}

export default WritingList
