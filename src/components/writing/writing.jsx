import React, { useEffect, useState } from 'react'
import styles from './writing.module.css';
import Header from '../header/header'
import { useHistory } from 'react-router-dom';
import WritingPage from '../writingPage/writingPage'
import WritingCoverPage from '../writingCoverPage/writingCoverPage'

const Writing = ({authService, writingRepository}) => {
  const history = useHistory();
  const [writing, setWriting] = useState({})
  const [time, setTime] = useState(0)
  const [writingPage, setWritingPage] = useState(false)

  const onWritingPage = (event)=>{
    event.preventDefault();
    setWriting(!writingPage)
  }

  useEffect(() => {
    // check user log in
    authService.onAuthChange( user =>{
      if(!user){
        history.push('/')
      }
    })
  })

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
  

  console.log("writing: ", writing)
  // console.log("count: ", count)

  return (
    <>
      <Header authService={authService}></Header>
      <div className={styles.wrapper}>
          {Object.keys(writing).length !==0 &&  
            writingPage === false ?        
            <WritingCoverPage 
              subjectId={writing.subjectId}
              writingInfo={writing.info.cover}
              subject={writing.info.subject}
              count={Object.keys(writing.info.users).length}
              onWritingPage={onWritingPage}
              >
            </WritingCoverPage>
            :
            <WritingPage>
            </WritingPage> 
          }
      </div>

    </>
  )
}

export default Writing
