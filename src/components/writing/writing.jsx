import React, { useEffect, useState } from 'react'
import styles from './writing.module.css';
import Header from '../header/header'
import { useHistory } from 'react-router-dom';
import WritingPage from '../writingPage/writingPage'
import WritingCoverPage from '../writingCoverPage/writingCoverPage'

const Writing = ({user, authService, writingRepository}) => {
  const history = useHistory();
  const [writing, setWriting] = useState({})
  const [time, setTime] = useState(0)
  const [writingPage, setWritingPage] = useState(false)

  const onWritingPage = (event)=>{
    event.preventDefault();
    setWritingPage(!writingPage)
  }

  // console.log("user: ", user)

  // useEffect(() => {
  //   // check user log in
  //   authService.onAuthChange( user =>{
  //     if(!user){
  //       history.push('/')
  //     }
  //   })
  // })

  useEffect(() => {
    console.log("user: ", user)

    const currentHour = new Date().getHours()
    
    // get new subject every 12 hours
    if(currentHour !== time){
      const subjectList =  writingRepository.getWriting(writing=>{
        setWriting(writing)
        return ()=>subjectList();
    })
    setTime(currentHour)
    }

  }, [writingRepository, time])
  

  
  // console.log("count: ", count)


  

  return (
    <>
      <Header authService={authService}></Header>
      {Object.keys(writing).length !==0 &&  
        <div className={styles.wrapper}>
          {writingPage === false ? 
            <WritingCoverPage 
              subjectId={writing.subjectId}
              writingInfo={writing.info.cover}
              subject={writing.info.subject}
              count={writing.info.count}
              onWritingPage={onWritingPage}
              >
            </WritingCoverPage>
            :
            <WritingPage
              subjectId={writing.subjectId}
              writingInfo={writing.info.cover}
              subject={writing.info.subject}
              count={writing.info.count}
              users={writing.info.users}
              onWritingPage={onWritingPage}
            >
            </WritingPage> 
          }
        </div>
      }
    </>
  )
}

export default Writing
