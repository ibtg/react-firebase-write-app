import React from 'react'
import styles from './writingPage.module.css'
import Header from '../header/header'
import { useHistory } from 'react-router-dom'

const WritingPage = ({user, authService, writingRepository}) => {

  // console.log("writings: ", writings)
  // console.log("writings entries: ", Object.entries(writings))
  const historyState = useHistory().location.state
  const history = useHistory();
  const subject = historyState && historyState.subject
  const writing = historyState && historyState.writing
  const username = historyState && historyState.username
  const writingId = historyState && historyState.writingId

  const addToLike = (event)=>{
    event.preventDefault();
    const likeObj = {
      subject:subject,
      username:username,
      writing:writing,
      writingId:writingId
    }

    writingRepository.addToLike(user.uid, subject, likeObj)
    console.log("담아가기")
    history.push({
      pathname:"/like"
    })


  }

  return (
    <>
      <Header authService={authService}></Header>
      <div className={styles.wrapper}>
        <div className={styles.container}>
            <span className={styles.title} >{subject}</span>
            <div className={styles.content}>
              {writing}
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.username}>{username}의 글</div>
              <button className={styles.button} onClick={addToLike}>
                담아가기
              </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default WritingPage
