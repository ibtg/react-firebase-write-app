import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './subject.module.css'

const Subject = ({subject, subjectId, count}) => {
  const history = useHistory();
  // const [subjectId, setSubjectId] = useState(subjectId)

  const goToWritingPage = (event) =>{
    event.preventDefault()

    history.push({
      pathname:`/search/${subject}`,
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
