import React from 'react'
import styles from './writingPage.module.css'
import Header from '../header/header'
import { useHistory } from 'react-router-dom'

const WritingPage = ({user, authService, writingRepository}) => {

  const historyState = useHistory().location.state
  const history = useHistory();
  const subject = historyState && historyState.subject
  const writing = historyState && historyState.writing
  const username = historyState && historyState.username
  const subjectId = historyState && historyState.subjectId

  const addFavoriteWriting= (event)=>{
    event.preventDefault();

    const favoriteObj = {
      subject:subject,
      username:username,
      writing:writing,
      addDate:Date.now()
    }

    writingRepository.addToFavorite(user.uid, subjectId, favoriteObj)
    history.push({
      pathname:`/favorite`
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
              <button className={styles.button} onClick={addFavoriteWriting}>
                담아가기
              </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default WritingPage
