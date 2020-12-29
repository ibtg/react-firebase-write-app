import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './subject.module.css'

const Subject = ({subject, count}) => {
  const history = useHistory();

  const goToWritingPage = (event) =>{
    event.preventDefault()

    history.push({
      pathname:`/search/${subject}`,
      state:{
        subject:subject }
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
