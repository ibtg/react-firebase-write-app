import React from 'react'
import styles from './writingList.module.css'

const WritingList = ({subject, subjectId, writing, username, addDate, alignCenter, onMove}) => {
  return (
    <div data-id={subjectId} className={styles.content} onClick={onMove}>
      <h3 className={styles.title}>{subject}</h3>
      <p className={alignCenter ? `${styles.writing} ${styles.center}`:`${styles.writing}`}>{writing}</p>
      <div className={styles.writingInfo}>
        <span className={styles.writer}>{username}</span>
        <span className={styles.date}>{addDate}</span>
      </div>

  </div>
  )
}

export default WritingList
