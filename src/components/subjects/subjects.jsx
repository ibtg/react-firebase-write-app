import React, { useEffect, useState } from 'react'
import Header from '../header/header'
import Subject from '../subject/subject'
import styles from './subjects.module.css'


const Subjects = ({authService, writingRepository}) => {
  const [subjects, setSubjects] = useState({})

  useEffect(() => {
    // console.log("subjects: ", writingRepository)
    const subjectList =  writingRepository.getSubjects(subjects=>{
      setSubjects(subjects)
    })
    
    return ()=>subjectList();

  }, [writingRepository])

  // console.log("subjects: ", subjects)
  // console.log("subjects entires: ", Object.entries(subjects))

  return (
    <>
      <Header authService={authService}></Header>
      <section className={styles.container}>
        <ul className={styles.list}>
          {subjects && Object.entries(subjects).map(subject => 
          <Subject 
            key={subject[1].subjectId} 
            subject={subject[0]} 
            count={Object.keys(subject[1].users).length}>
          </Subject>)}
        </ul>
      </section>
    </>
      
  )
}

export default Subjects
