import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../header/header'
import Subject from '../subject/subject'
import styles from './subjects.module.css'


const Subjects = ({authService, writingRepository}) => {
  const history = useHistory();
  const [subjects, setSubjects] = useState({})

  useEffect(() => {
    // check user log in
    authService.onAuthChange( user =>{
      if(!user){
        history.push('/')
      }

    })

  })

  useEffect(() => {
    // console.log("subjects: ", writingRepository)
    const subjectList =  writingRepository.getSubjects(subject=>{
      setSubjects(subject)
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
          <Subject key={subject[0]} id={subject[0]} subject={subject[1].subject} count={subject[1].count}></Subject>)}
        </ul>
      </section>
    </>
      
  )
}

export default Subjects
