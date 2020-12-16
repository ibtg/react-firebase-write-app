import React from 'react'
import styles from './sidebar.module.css'
import {AiOutlineClose} from 'react-icons/ai'

const Sidebar = ({onClickMenu, sidebar}) => {
  console.log("click sidebar: ", sidebar)
  return (
    <section className={ sidebar ? styles.sidebar : `${styles.sidebar} ${styles.on}` } >

          <AiOutlineClose className={styles.menu} onClick={onClickMenu}></AiOutlineClose>

    </section>
  )
}

export default Sidebar
