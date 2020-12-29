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

    history.push({
      pathname:`/mywritingpage`,
      state:{
        subject: subject,
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
      <Header></Header>
      <div className={styles.container}>
        {Object.keys(myWritings).length !== 0 ?
        myWritings.map((myWriting)=>(
        <WritingList
          key={myWriting[1].writingId}
          subject={myWriting[1].subject}
          writingId={myWriting[0]}
          writing={myWriting[1].writing}
          username={myWriting[1].username}
          onMove={onEdit}
        ></WritingList>

        ))  
        :
        <div className={styles.noWriting}>
          작성한 글이 없습니다.
        </div>
        }



      </div>
    </>
  )
}

export default MyWriting
