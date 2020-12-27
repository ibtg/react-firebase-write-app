import React, {useRef, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../header/header'
import styles from './writePage.module.css'

const WritePage = ({user, authService, writingRepository}) => {

  const historyState = useHistory().location.state
  const [subjectId, setSubjectId] = useState(historyState && historyState.subjectId)
  const [subject, setSubject] = useState(historyState && historyState.subject)
  const history = useHistory()
  const formRef = useRef();
  const textareaRef = useRef();

  const onSubmit = (event) =>{
    event.preventDefault();
    if(textareaRef.current.value === ''){
      alert('내용을 입력하세요')
      return ;
    }

    // const writing = {
    //   contentId: Date.now(),
    //   subject:subject,
    //   content:textareaRef.current.value,
    //   username:user.displayName
    // }
  

    // console.log("saveWriting: ", user.uid, subjectId, writing )
    // // writingRepository.saveSubjectCount(subjectId, subjectCount+1)
    // writingRepository.saveWriting(user.uid, subjectId, writing )

    formRef.current.reset();
  }

  useEffect(() => {
    console.log("subjectId: ", subjectId === undefined )
    console.log("subject: ", subject === undefined)
    if(subjectId === undefined || subject === undefined){
      alert('접근 권한이 없습니다.');
      history.push({
        pathname:'/main'
      })

    }
  }, [subjectId, subject, history])


  console.log("historyState: ", historyState)

  return (

    <>
      {/* <Header authService={authService}></Header>
      <section className={styles.container}>
        <form ref={formRef} className={styles.form} >
          <span className={styles.title} >{subject}</span>
          <textarea ref={textareaRef} className={styles.content} minLength="1" placeholder='당신의 생각을 들려주세요'></textarea>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={onSubmit}>작성하기</button>
          </div>
          
        </form>
      </section> */}
    </>

  )
}

export default WritePage
