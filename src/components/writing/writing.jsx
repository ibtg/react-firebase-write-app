import React, { useEffect, useState } from 'react'
import styles from './writing.module.css';
import Header from '../header/header'
import WritingPage from '../writingPage/writingPage'
import WritingCoverPage from '../writingCoverPage/writingCoverPage'

const Writing = ({user, authService, writingRepository}) => {
  const [writing, setWriting] = useState({})
  const [time, setTime] = useState(0)
  const [writingPage, setWritingPage] = useState(false)

  const onWritingPage = (event)=>{
    event.preventDefault();
    setWritingPage(!writingPage)
  }


  useEffect(() => {
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



  // console.log("time: ", time)
  // console.log("writing: ", writing)
  // console.log("writing obj: ", Object.entries(writing))


  

  return (
    <>
      {Object.keys(writing).length !==0 &&  
        <div className={styles.wrapper}>
          {writingPage === false ? 
          <>
            <Header authService={authService}></Header>
            <WritingCoverPage 
              subject={writing.subject}
              subjectId={writing.info.subjectId}
              writingCover={writing.info.cover}
              onWritingPage={onWritingPage}
              >
            </WritingCoverPage>
          </>
            :
            <WritingPage
              subject={writing.subject}
              subjectId={writing.subjectId}
              writings={writing.info.users}
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
