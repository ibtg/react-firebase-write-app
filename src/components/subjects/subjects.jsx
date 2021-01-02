import React, { useEffect, useState } from 'react'
import Header from '../header/header'
import Subject from '../subject/subject'
import styles from './subjects.module.css'


const Subjects = ({authService, writingRepository}) => {
  const [subjects, setSubjects] = useState({})

  useEffect(() => {
    const subjectList =  writingRepository.getSubjects(subjects=>{
      setSubjects(subjects)
    })
    
    return ()=>subjectList();

  }, [writingRepository])


  return (
    <>
      <Header authService={authService}></Header>
      <section className={styles.container}>
        <ul className={styles.list}>
          {Object.keys(subjects).map(key => 
          <Subject 
            key={subjects[key].subjectId} 
            subject={key} 
            count={Object.keys(subjects[key].users).length}>
          </Subject>)}
        </ul>
      </section>
    </>
      
  )
}

export default Subjects
