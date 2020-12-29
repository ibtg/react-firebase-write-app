import React, {useRef, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../header/header'
import styles from './writePage.module.css'

const WritePage = ({user, authService, writingRepository}) => {

  const historyState = useHistory().location.state
  const subject = historyState && historyState.subject
  const history = useHistory()
  const formRef = useRef();
  const textareaRef = useRef();

  const onSubmit = (event) =>{
    event.preventDefault();
    if(textareaRef.current.value === ''){
      alert('내용을 입력하세요')
      return ;
    }

    const writing = {
      writingId: Date.now(),
      subject:subject,
      writing:textareaRef.current.value,
      username:user.displayName
    }
    
    // console.log("writing: ", writing)
    // console.log("subjectId: ", subjectId)
    writingRepository.saveWriting(user.uid, subject, writing)

    formRef.current.reset();

    history.push({
      pathname:'/mywriting'
    })
  }

  const onDelete = (event)=>{
    event.preventDefault();
    writingRepository.deleteWriting(user.uid, subject)
    history.push({
      pathname:'/mywriting'
    })

  }

  const handleChange = (event) =>{
    setWriting(event.currentTarget.value)
  }

  useEffect(() => {
    if(subject === undefined){
      alert('접근 권한이 없습니다.');
      history.push({
        pathname:'/main'
      })

    }
  }, [subject, history])

  
  return (

    <>
      <Header authService={authService}></Header>
      <section className={styles.container}>
        <form ref={formRef} className={styles.form} >
          <span className={styles.title} >{subject}</span>
          <textarea 
            autoFocus={true}
            ref={textareaRef} 
            className={styles.content}
            minLength="1" 
            placeholder='당신의 생각을 들려주세요'
            >
          </textarea>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={onSubmit}>
              작성하기
            </button>
          </div>

        </form>
      </section>
    </>

  )
}

export default WritePage
