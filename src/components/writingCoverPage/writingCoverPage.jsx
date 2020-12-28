import React from 'react'
import styles from './writingCoverPage.module.css'
import {BsChevronDoubleRight} from 'react-icons/bs'
import { useHistory } from 'react-router-dom'

const WritingCoverPage = ({subject, subjectId, writingCover, onWritingPage}) => {
  const history = useHistory();

  const goToWrite = (event) =>{
    event.preventDefault()

    history.push({
      pathname:`/writepage/${subject}`,
      state:{
        subject:subject }
      })
    }

  return (
    <section className={styles.container}>
      <span className={styles.subject}>{subject}</span>
      <span className={styles.writing}>{writingCover.writing}</span>
      <div className={styles.writingInfo}>
        <span className={styles.writer}>{writingCover.writer}</span>
        <span className={styles.title}>{`<${writingCover.title}>`}</span>
      </div>

      <button className={styles.button} onClick={onWritingPage}>
        <BsChevronDoubleRight className={styles.buttonIcon}></BsChevronDoubleRight>
        <span className={styles.buttonText}>넘겨서 보기</span>
      </button>

      <button className={styles.write} onClick={goToWrite}>나의 글 쓰기</button>
      
    </section>
  )
}

export default WritingCoverPage
