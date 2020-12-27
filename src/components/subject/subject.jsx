import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './subject.module.css'

const Subject = ({subjectId, subject, count}) => {
  const history = useHistory();
  const goToWrite = (event) =>{
    event.preventDefault()

    history.push({
      pathname:'/writepage',
      state:{
        subjectId:subjectId , 
        subject:subject
        }
    })
  }

  return (
    <li className={styles.item} onClick={goToWrite}>
      {subject}
      <span className={styles.count}>{count} 씀</span>
    </li>
  )
}

export default Subject
