import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './subject.module.css'

const Subject = ({id, subject, count}) => {
  const history = useHistory();
  const goToWrite = (event) =>{
    event.preventDefault()
    // console.log("event: ", event.currentTarget) 
    // console.log("event: ", event.currentTarget.textContent) 
    // // console.log("event: ", event.currentTarget.querySele) 
    console.log("move to write")

    history.push({
      pathname:'/writing',
      state:{
        id:id , 
        subject:subject , 
        count: count}
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
