import React, { useEffect, useState } from 'react'
import styles from './myWriting.module.css'
import Header from '../header/header'
import { useHistory } from 'react-router-dom'
import WritingList from '../writingList/writingList'

const MyWriting = ({user, authService, writingRepository}) => {

  const [myWritings, setMyWritings] = useState([])
  const history = useHistory()

  const onEdit = (event) =>{
    event.preventDefault();
    const childeNodes = event.currentTarget.childNodes
    const subject = childeNodes[0].innerText
    const writing = childeNodes[1].innerHTML
    const subjectId = event.currentTarget.dataset.id

    history.push({
      pathname:`/mywritingpage`,
      state:{
        subject: subject,
        subjectId: subjectId,
        writing: writing
      }

    })

  }

  useEffect(() => {
    writingRepository.getMyWriting(user.uid, (writing)=>{
      setMyWritings(writing)})
  },[writingRepository, user])


  return (
    <>
      <Header authService={authService}></Header>
      <div className={styles.container}>
        {Object.keys(myWritings).length !== 0 &&

          (Object.keys(myWritings).includes("no") ?
            <div className={styles.noWriting}>
              작성한 글이 없습니다.
            </div>
            :
            Object.keys(myWritings).map(key => (
            <WritingList
              key={myWritings[key].addDateNow}
              subject={myWritings[key].subject}
              subjectId={key}
              writing={myWritings[key].writing}
              username={myWritings[key].username}
              addDate={myWritings[key].addDate}
              alignCenter={myWritings[key].alignCenter}
              onMove={onEdit}
            ></WritingList>
            ))  
          )
        }
      </div>
    </>
  )
}

export default MyWriting
