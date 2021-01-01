import React, {useRef, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import styles from './myWritingPage.module.css'
import Header from '../header/header'

const MyWritingPage = ({user, authService, writingRepository}) => {

  const historyState = useHistory().location.state
  const subject = historyState && historyState.subject
  const [writing, setWriting] = useState(historyState ? historyState.writing : '')
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
            value={writing}
            onChange={handleChange}
            >
            {writing}
          </textarea>
          <div className={styles.buttonContainer}>

            <div className="buttonContainer">
              <button className={styles.button} onClick={onDelete}>
                삭제하기
              </button>
              <button className={styles.button} onClick={onSubmit}>
                수정하기
              </button>
            </div>     
          </div>
        </form>
      </section>
    </>
  )
}

export default MyWritingPage