import React, { useEffect, useState } from 'react'
import styles from './header.module.css'
import {FaBars} from 'react-icons/fa'
import Sidebar from '../sidebar/sidebar'
import { useHistory } from 'react-router-dom'


const Header = ({authService}) => {
  const [dateInfo, setDateInfo] = useState({})
  const [sidebar, setSidebar] = useState(false)
  const history = useHistory()

  const onClickMenu = () => {
    setSidebar(!sidebar)
  }

  const onLogout = () =>{
    authService.logout();
  }

  const goToSubjects = () =>{
    history.push({
      pathname:'/subjects'
    })
  }

  const goToWriting = () =>{
    history.push({
      pathname:'/writing'
    })
  }

  const goToMyWriting = () =>{
    history.push({
      pathname:'/mywriting'
    })
  }

  const onSubmit = (event) =>{
    event.preventDefault()
    const subject = event.target.keyword.value
    history.push({
      pathname:`/search/${subject}`,
      state:{
        subject:subject
      }
    })

  }


  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hours = date.getHours();

    if(6 <= hours && hours <12){
      setDateInfo({
        year: year,
        month: month,
        day : day,
        hour: '아침'
      })
    }
    else if(12 <= hours && hours <18){
      setDateInfo({
        year: year,
        month: month,
        day : day,
        hour: '낮'
      })
    }else{
      setDateInfo({
        year: year,
        month: month,
        day : day,
        hour: '밤'
      })
    }

  },[])


  return (
    <>
      <header className={styles.header}>
        <FaBars className={styles.menu} onClick={onClickMenu}></FaBars>
        <span className={styles.date}>
          {`${dateInfo.year}년 ${dateInfo.month}월 ${dateInfo.day}일, ${dateInfo.hour}`}
        </span>
      </header>
      <Sidebar 
        sidebar={sidebar} 
        onClickMenu={onClickMenu} 
        onLogout={onLogout} 
        goToSubjects={goToSubjects}
        goToWriting={goToWriting}
        goToMyWriting={goToMyWriting}
        onSubmit={onSubmit}
      >
      </Sidebar>
    </>

  )
}

export default Header
