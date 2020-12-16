import React from 'react'
import styles from './sidebar.module.css'
import {AiOutlineClose} from 'react-icons/ai'

const Sidebar = ({onClickMenu, sidebar, onLogout}) => {
  return (
    <section className={ sidebar ?  `${styles.sidebar} ${styles.on}` : styles.sidebar} >
        <AiOutlineClose className={styles.menu} onClick={onClickMenu}></AiOutlineClose>
        <ul className={styles.list}>
          <li className={styles.item} onClick={onLogout}>로그 아웃</li>
        </ul>

    </section>
  )
}

export default Sidebar
