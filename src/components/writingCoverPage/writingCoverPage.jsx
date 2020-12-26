import React from 'react'
import styles from './writingCoverPage.module.css'
import {BsChevronDoubleRight} from 'react-icons/bs'

const WritingCoverPage = ({subject, writingInfo}) => {
  return (
    <section className={styles.container}>
      <span className={styles.subject}>{subject}</span>
      <span className={styles.writing}>{writingInfo.writing}</span>
      <div className={styles.writingInfo}>
        <span className={styles.writer}>{writingInfo.writer}</span>
        <span className={styles.title}>{`<${writingInfo.title}>`}</span>
      </div>

      <button className={styles.button}>
        <BsChevronDoubleRight className={styles.buttonIcon}></BsChevronDoubleRight>
        <span className={styles.buttonText}>넘겨서 보기</span>
      </button>
      
    </section>
  )
}

export default WritingCoverPage
