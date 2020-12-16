import React, { useEffect, useState } from 'react'
import styles from './header.module.css'
import {FaBars} from 'react-icons/fa'

const Header = ({onClickMenu}) => {
  const [dateInfo, setDateInfo] = useState({})

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
    <header className={styles.header}>
      <FaBars className={styles.menu} onClick={onClickMenu}></FaBars>
      <span className={styles.date}>{`${dateInfo.year}년 ${dateInfo.month}월 ${dateInfo.day}일 ${dateInfo.hour}`}</span>
  </header>
  )
}

export default Header
