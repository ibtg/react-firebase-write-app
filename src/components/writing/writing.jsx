import React, { useEffect, useState } from 'react'
import styles from './writing.module.css';
import Header from '../header/header'
import WritingCoverPage from '../writingCoverPage/writingCoverPage'

const Writing = ({user, authService, writingRepository}) => {
  const [writing, setWriting] = useState({})

  useEffect(() => {
    
    const subjectList =  writingRepository.getWriting(writing=>{
      setWriting(writing)
      
  })
  return ()=>subjectList();

  },[writingRepository])



  // console.log("writing: ", writing)
  // console.log("writing obj: ", Object.entries(writing))


  

  return (
    <>
      <Header authService={authService}></Header>
      {Object.keys(writing).length !==0 &&
        <WritingCoverPage 
          subject={writing.subject}
          writingCover={writing.info.cover}
        >
        </WritingCoverPage>
    }
    </>
  )
}

export default Writing
