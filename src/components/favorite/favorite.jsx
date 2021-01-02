import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../header/header'
import WritingList from '../writingList/writingList'
import styles from './favorite.module.css'

const Favorite = ({user, authService, writingRepository}) => {

  const [writings, setWritings] = useState({})
  const history = useHistory()

  const goToFavoritePage = (event) =>{
    event.preventDefault();
    const subject = event.currentTarget.childNodes[0].innerHTML
    const writing = event.currentTarget.childNodes[1].innerHTML
    const username = event.currentTarget.childNodes[2].innerHTML
    const subjectId = event.currentTarget.dataset.id

    history.push({
      pathname:`/favoritePage/${subject}`,
      state:{
        subject:subject,
        writing:writing,
        username:username,
        subjectId:subjectId
      }
    })
  }

  useEffect(() => {
    const writingList = writingRepository.getFavorite(user.uid, async (results)=>{
      setWritings(results)
    })
    return () => writingList()
  }, [writingRepository, user])

  console.log("favorite ",writings)

  return (
    <>
      <Header authService={authService}></Header>
      <div className={styles.container}>

        {Object.keys(writings).length !== 0 &&
          (Object.keys(writings).includes("no") ?
            <div className={styles.noWriting}>
              담아온 글이 없습니다.
            </div>
            :
            Object.keys(writings).map(key=>(
              <WritingList
                key={writings[key].addDate}
                subject={writings[key].subject}
                subjectId={key}
                writing={writings[key].writing}
                username={writings[key].username}
                alignCenter={writings[key].alignCenter}
                onMove={goToFavoritePage}
              ></WritingList>
              ))
          )
        }



      </div>
    </>
  )

}

export default Favorite
