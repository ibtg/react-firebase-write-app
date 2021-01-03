import React, { useEffect, useRef, useState, memo } from 'react'
import styles from './header.module.css'
import {AiOutlineMenu} from 'react-icons/ai'
import Sidebar from '../sidebar/sidebar'
import { useHistory } from 'react-router-dom'


const Header = memo(({authService}) => {
  const [dateInfo, setDateInfo] = useState({})
  const [sidebar, setSidebar] = useState(false)
  const history = useHistory()
  const headerRef = useRef()


  const onClickMenu = () => {
    setSidebar(!sidebar)
  }

  const goToWriting = () =>{
    history.push({
      pathname:'/writing'
    })
  }

  const goToSubjects = () =>{
    history.push({
      pathname:'/subjects'
    })
  }

  const goToMyWriting = () =>{
    history.push({
      pathname:'/mywriting'
    })
  }

  const goToFavorite = () =>{
    history.push({
      pathname:'/favorite'
    })
  }


  const onLogout = () =>{
    authService.logout();
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
      <header className={styles.header} ref={headerRef}>
        <AiOutlineMenu className={styles.menu} onClick={onClickMenu}></AiOutlineMenu>
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
        goToFavorite={goToFavorite}
      >
      </Sidebar>
    </>

  )
})

export default Header
