import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './search.module.css'
import Header from '../header/header'
import WritingList from '../writingList/writingList'

const Search = ({authService, writingRepository}) => {
  
  const historyState = useHistory().location.state
  const subject = historyState && historyState.subject
  const subjectId = historyState && historyState.subjectId
  const history = useHistory()
  const [writings, setWritings] = useState({})

  const goToWritingPage = (event) =>{
    event.preventDefault();
    const subject = event.currentTarget.childNodes[0].innerHTML
    const writing = event.currentTarget.childNodes[1].innerHTML
    const username = event.currentTarget.childNodes[2].innerHTML

    history.push({
      pathname:'/writingPage',
      state:{
        subject:subject,
        writing:writing,
        username:username,
        subjectId:subjectId
      }
    })
  }

  const goToWrite = (event) =>{
    event.preventDefault()

    history.push({
      pathname:`/writepage`,
      state:{
        subject:subject,
        subjectId: writings.subjectId}
      })
    }


  useEffect(() => {
    const writingList =  writingRepository.getSearch(subject, (results)=>{
      setWritings(results)
      
  })
  return ()=>writingList();

  },[writingRepository , subject])

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
          {Object.keys(writings.users).map((key)=>(
                <WritingList
                  key={writings.users[key].addDateNow}
                  subject={writings.users[key].subject}
                  subjectId={writings.users[key].subjectId}
                  writing={writings.users[key].writing}
                  username={writings.users[key].username}
                  addDate={writings.users[key].addDate}
                  alignCenter={writings.users[key].alignCenter}
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
