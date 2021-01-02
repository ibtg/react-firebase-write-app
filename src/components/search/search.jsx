import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './search.module.css'
import Header from '../header/header'
import WritingList from '../writingList/writingList'

const Search = ({authService, writingRepository}) => {
  
  const historyState = useHistory().location.state
  const subject = historyState && historyState.subject
  const history = useHistory()
  const [writings, setWritings] = useState({})

  const goToWritingPage = (event) =>{
    event.preventDefault();
    const subject = event.currentTarget.childNodes[0].innerHTML
    const writing = event.currentTarget.childNodes[1].innerHTML
    const username = event.currentTarget.childNodes[2].innerHTML
    const writingId = event.currentTarget.dataset.id
    history.push({
      pathname:'/writingPage',
      state:{
        subject:subject,
        writing:writing,
        username:username,
        writingId:writingId
      }
    })
  }

  const goToWrite = (event) =>{
    event.preventDefault()

    history.push({
      pathname:`/writepage/${subject}`,
      state:{
        subject:subject }
      })
    }


  useEffect(() => {
    const writingList =  writingRepository.getSearch(subject, (results)=>{
      setWritings(results)
      
  })
  return ()=>writingList();

  },[writingRepository , subject])

  // console.log("writings: ", writings)
  return (
    <>
      <Header authService={authService}></Header>
      <div className={styles.container}>
        {Object.keys(writings).length !== 0 && 
        (Object.keys(writings).includes("no") ?
          <div className={styles.noResults}>
            결과를 찾을 수 없습니다.
          </div>
          :
        <>
          <h2 className={styles.subject}>{writings.subject}</h2>
          <p className={styles.writing}>{writings.cover.writing}</p>
          <div className={styles.writingInfo}>
            <span className={styles.writer}>{writings.cover.writer}</span>
            <span className={styles.title}>{`<${writings.cover.title}>`}</span>
          </div>
          <button className={styles.write} onClick={goToWrite}>나의 글 쓰기</button>
          {Object.entries(writings.users).map((writing)=>(
                <WritingList
                  key={writing[1].writingId}
                  subject={writing[1].subject}
                  writingId={writing[1].writingId}
                  writing={writing[1].writing}
                  username={writing[1].username}
                  alignCenter={writing[1].alignCenter}
                  onMove={goToWritingPage}
                ></WritingList>
              ))}
        </>)
        }
    </div>
  </>

  )
}

export default Search
