import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './search.module.css'
import Header from '../header/header'
import WritingList from '../writingList/writingList'

const Search = ({authService, writingRepository}) => {
  
  const historyState = useHistory().location.state
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

  useEffect(() => {
    
    // console.log("historyState: ", historyState)
 
    const writingList =  writingRepository.getSearch(historyState.subject, (results)=>{
      setWritings(results)
      
  })
  return ()=>writingList();

  },[writingRepository , historyState])

  // console.log("subject: ", subject)
  // console.log("writings object: ", Object.entries(writings))
  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        {writings!== null ?

      Object.entries(writings).map((writing)=>(
        <WritingList
          key={writing[1].writingId}
          subject={writing[1].subject}
          writingId={writing[1].writingId}
          writing={writing[1].writing}
          username={writing[1].username}
          onMove={goToWritingPage}
        ></WritingList>

        ))  
        :
        <div className={styles.pageNotFound}>
          검색 결과가 없습니다 
        </div>
        }



      </div>
    </>

  )
}

export default Search
