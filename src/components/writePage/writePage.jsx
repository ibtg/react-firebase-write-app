import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../header/header'
import styles from './writePage.module.css'

const WritePage = ({authService, writingRepository}) => {

  // console.log("history: ", useHistory())
  const [userId, setUserId] = useState('')
  const subjectId = useHistory().location.state.id;
  const subject = useHistory().location.state.subject;
  const subjectCount = useHistory().location.state.count;

  const history = useHistory();
  const formRef = useRef();
  const textareaRef = useRef();

  
  const onSubmit = (event) =>{
    event.preventDefault();
    if(textareaRef.current.value === ''){
      alert('내용을 입력하세요')
      return ;
    }

    const writing = {
      id: Date.now(),
      title:subject,
      content:textareaRef.current.value 
    }
  
    
    console.log("saveSubjectCount: ", subjectId, subjectCount+1 )
    console.log("saveWriting: ", userId, subjectId, writing )
    writingRepository.saveSubjectCount(subjectId, subjectCount+1)
    writingRepository.saveWriting(userId, subjectId, writing )

    formRef.current.reset();
  }


  useEffect(() => {
    // check user log in
    authService.onAuthChange( user =>{
      if(!user){
        history.push('/')
      }
      setUserId(user.uid)
    })

  })



  return (

    <>
      <Header authService={authService}></Header>
      <section className={styles.container}>
        <form ref={formRef} className={styles.form} >
          <span className={styles.title} >{subject}</span>
          <textarea ref={textareaRef} className={styles.content} minLength="1" placeholder='당신의 생각을 들려주세요'></textarea>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={onSubmit}>작성하기</button>
          </div>
          
        </form>
      </section>
    </>

  )
}

export default WritePage
