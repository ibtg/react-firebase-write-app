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
            <WritingCoverPage 
              writingInfo={writing.info.cover}
              subject={writing.info.subject}
              >
            </WritingCoverPage> 
          }
      </div>

    </>
  )
}

export default Writing
