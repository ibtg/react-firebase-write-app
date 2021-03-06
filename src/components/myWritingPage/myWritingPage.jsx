import React, {useRef, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import styles from './myWritingPage.module.css'
import Header from '../header/header'
import {AiOutlineAlignLeft, AiOutlineAlignCenter} from 'react-icons/ai'

const MyWritingPage = ({user, authService, writingRepository}) => {

  const historyState = useHistory().location.state
  const subject = historyState && historyState.subject
  const subjectId = historyState && historyState.subjectId
  const [writing, setWriting] = useState(historyState ? historyState.writing : '')
  const history = useHistory()
  const formRef = useRef();
  const textareaRef = useRef();
  const [alignCenter, setAlignCenter] = useState(historyState && historyState.alignCenter)


  useEffect(() => {
    
    if(historyState === undefined){
      history.push({
        pathname:"/"
      })

    }


  }, [history, historyState])
  
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

  const onDelete = (event)=>{
    event.preventDefault();
    writingRepository.deleteWriting(user.uid, subject, subjectId)
    history.push({
      pathname:'/mywriting'
    })

  }

  const textAlign = () =>{
    setAlignCenter(!alignCenter)
  }

  const handleChange = (event) =>{
    setWriting(event.currentTarget.value)
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
            className={ alignCenter === true ? `${styles.content} ${styles.center}` : `${styles.content}`}
            minLength="1" 
            placeholder='당신의 생각을 들려주세요'
            value={writing}
            onChange={handleChange}
            >
            {writing}
          </textarea>
          <div className={styles.buttonContainer}>


            {alignCenter === true ? 
            <AiOutlineAlignCenter className={styles.textAlignIcon} onClick={textAlign}></AiOutlineAlignCenter> 
            : <AiOutlineAlignLeft className={styles.textAlignIcon} onClick={textAlign}></AiOutlineAlignLeft>}
              <button className={styles.button} onClick={onDelete}>
                삭제하기
              </button>
              <button className={styles.button} onClick={onSubmit}>
                수정하기
              </button>   
          </div>
        </form>
      </section>
    </>
  )
}

export default MyWritingPage
