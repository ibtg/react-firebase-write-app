import React from 'react'
import styles from './writingCoverPage.module.css'
import {BsChevronDoubleRight} from 'react-icons/bs'
import { useHistory } from 'react-router-dom'

const WritingCoverPage = ({subject, writingCover}) => {
  const history = useHistory();

  const goToWrite = (event) =>{
    event.preventDefault()

    history.push({
      pathname:`/writepage/${subject}`,
      state:{
        subject:subject }
      })
    }

  const goToWritingPage = (event) =>{
    event.preventDefault()

    history.push({
      pathname:`/search/${subject}`,
      state:{
        subject:subject }
      })
    }


  return (
    <section className={styles.container}>
      <span className={styles.subject}>{subject}</span>
      <span className={styles.writing}>{writingCover.writing}</span>
      <div className={styles.writingInfo}>
        <p className={styles.writer}>{writingCover.writer}</p>
        <span className={styles.title}>{`<${writingCover.title}>`}</span>
      </div>

      <button className={styles.button}>
        <BsChevronDoubleRight className={styles.buttonIcon}></BsChevronDoubleRight>
        <span className={styles.buttonText} onClick={goToWritingPage}>넘겨서 보기</span>
      </button>

      <button className={styles.write} onClick={goToWrite}>나의 글 쓰기</button>
      
    </section>
  )
}

export default WritingCoverPage
