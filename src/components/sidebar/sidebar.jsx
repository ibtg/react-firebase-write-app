import React from 'react'
import styles from './sidebar.module.css'
import {AiOutlineClose} from 'react-icons/ai'

const Sidebar = ({onClickMenu, sidebar, onLogout, goToSubjects, goToWriting, goToMyWriting}) => {
  return (
    <section className={ sidebar ?  `${styles.sidebar} ${styles.on}` : styles.sidebar} >
        <div className={styles.closeContainer}>
          <AiOutlineClose className={styles.menu} onClick={onClickMenu}></AiOutlineClose>
        </div>
        <ul className={styles.list}>
          <li className={styles.item} onClick={goToWriting}>글쓰기</li>
          <li className={styles.item} onClick={goToSubjects}>글감</li>
          <li className={styles.item} onClick={goToMyWriting}>나의 글</li>
          <li className={styles.item} >구독</li>
          <li className={styles.item} onClick={onLogout}>로그 아웃</li>
        </ul>

    </section>
  )
}

export default Sidebar
