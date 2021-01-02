import React, {useRef, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../header/header'
import styles from './writePage.module.css'
import {AiOutlineAlignLeft, AiOutlineAlignCenter} from 'react-icons/ai'

const WritePage = ({user, authService, writingRepository}) => {

  const historyState = useHistory().location.state
  const subject = historyState && historyState.subject
  const subjectId = historyState && historyState.subjectId
  const [alignCenter, setAlignCenter] = useState(false)

  const history = useHistory()
  const formRef = useRef();
  const textareaRef = useRef();

  const onSubmit = (event) =>{
    event.preventDefault();
    if(textareaRef.current.value === ''){
      alert('내용을 입력하세요')
      return ;
    }

    const date = new Date()

    const writing = {
      addDateNow: Date.now(),
      addDate :`${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}시`,
      subject:subject,
      writing:textareaRef.current.value,
      username:user.displayName,
      alignCenter:alignCenter
    }
 
    writingRepository.saveWriting(user.uid, subject, subjectId, writing)

    formRef.current.reset();

    history.push({
      pathname:'/mywriting'
    })
  }

  const textAlign = () =>{
    setAlignCenter(!alignCenter)
  }


  return (

    <>
      <Header authService={authService}></Header>
      <section className={styles.container}>
        <form ref={formRef} className={styles.form} >
          <span className={styles.title} >{subject}</span>
          <textarea 
            autoFocus={true}
            ref={textareaRef} 
            className={ alignCenter ? `${styles.content} ${styles.center}` : `${styles.content}`}
            minLength="1" 
            placeholder='당신의 생각을 들려주세요'
            >
          </textarea>
          <div className={styles.buttonContainer}>
            {alignCenter === true ? 
            <AiOutlineAlignCenter className={styles.textAlignIcon} onClick={textAlign}></AiOutlineAlignCenter> 
            : <AiOutlineAlignLeft className={styles.textAlignIcon} onClick={textAlign}></AiOutlineAlignLeft>}
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
