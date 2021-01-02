import React, { useEffect, useState } from 'react'
import styles from './writing.module.css';
import Header from '../header/header'
import {BsChevronDoubleRight} from 'react-icons/bs'
import { useHistory } from 'react-router-dom'

const Writing = ({authService, writingRepository}) => {
  const [writing, setWriting] = useState({})
  const history = useHistory();

  const goToWrite = (event) =>{
    event.preventDefault()

    history.push({
      pathname:`/writepage`,
      state:{
        subject:writing.subject,
        subjectId:writing.info.subjectId }
      })
    }

  const goToWritingPage = (event) =>{
    event.preventDefault()

    history.push({
      pathname:`/search`,
      state:{
        subject:writing.subject,
        subjectId:writing.info.subjectId }
      })
    }



  useEffect(() => {
    
    const subjectList =  writingRepository.getWriting(writing=>{
      setWriting(writing)
      
  })
  return ()=>subjectList();

  },[writingRepository])


  return (
    <>
      <Header authService={authService}></Header>
      {Object.keys(writing).length !==0 &&
        <section className={styles.container}>
          <h2 className={styles.subject}>{writing.subject}</h2>
          <p className={styles.writing}>{writing.info.cover.writing}</p>
          <div className={styles.writingInfo}>
            <span className={styles.writer}>{writing.info.cover.writer}</span>
            <span className={styles.title}>{`<${writing.info.cover.title}>`}</span>
          </div>
          <button className={styles.button}>
              <BsChevronDoubleRight className={styles.buttonIcon}></BsChevronDoubleRight>
              <span className={styles.buttonText} onClick={goToWritingPage}>넘겨서 보기</span>
            </button>
          <button className={styles.write} onClick={goToWrite}>나의 글 쓰기</button>
        </section>
    }
    </>
  )
}

export default Writing
