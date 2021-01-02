import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './subject.module.css'

const Subject = ({subject, subjectId, count}) => {
  const history = useHistory();

  const goToWritingPage = (event) =>{
    event.preventDefault()

    history.push({
      pathname:`/search`,
      state:{
        subject:subject,
        subjectId:subjectId}
      })
    }

  return (
    <li className={styles.item} onClick={goToWritingPage}>
      {subject}
      <span className={styles.count}>{count} 씀</span>
    </li>
  )
}

export default Subject
