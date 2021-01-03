import React, {useEffect} from 'react'
import styles from './favoritePage.module.css'
import Header from '../header/header'
import { useHistory } from 'react-router-dom'

const FavoritePage = ({user, authService, writingRepository}) => {

  const historyState = useHistory().location.state
  const history = useHistory();
  const subject = historyState && historyState.subject
  const writing = historyState && historyState.writing
  const username = historyState && historyState.username
  const addDate = historyState && historyState.addDate
  const subjectId = historyState && historyState.subjectId
  const alignCenter = historyState && historyState.alignCenter

  const removeFavoriteWriting= (event)=>{
    event.preventDefault()
    writingRepository.removeToFavorite(user.uid, subjectId)
    history.push({
      pathname:`/favorite`
    })

  }

  useEffect(() => {
    
    if(historyState === undefined){
      history.push({
        pathname:"/"
      })

    }


  }, [history, historyState])


  return (
    <>
      <Header authService={authService}></Header>
      <div className={styles.wrapper}>
        <div className={styles.container}>
            <span className={styles.title} >{subject}</span>
            <div className={styles.contentContainer}>
              <p className={alignCenter ? `${styles.content} ${styles.center}` : `${styles.content}` }>
                {writing}
              </p>
              <div className={styles.writingInfo}>
                <div className={styles.date}>{addDate}</div>
                <div >{username}의 글</div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={removeFavoriteWriting}>
                삭제하기
              </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default FavoritePage
