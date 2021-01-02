import React, { useRef } from 'react'
import styles from './sidebar.module.css'
import {AiOutlineClose} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import { useHistory } from 'react-router-dom'

const Sidebar = ({onClickMenu, sidebar, onLogout, goToSubjects, goToWriting, goToMyWriting, goToFavorite}) => {
  const inputRef = useRef();
  const history = useHistory()

  const onSubmit = (event) =>{
    event.preventDefault()
    const subject = inputRef.current.value
    if(subject === ''){
      alert('검색어를 입력해주세요.')
      return;
    }
    inputRef.current.value=""
    history.push({
      pathname:`/search`,
      state:{
        subject:subject
      }
    })

  }
  
  return (
    <section className={ sidebar ?  `${styles.sidebar} ${styles.on}` : styles.sidebar} >
        <div className={styles.closeContainer}>
          <AiOutlineClose className={styles.menu} onClick={onClickMenu}></AiOutlineClose>
        </div>
        <div className={styles.info}>
          <ul className={styles.list}>
            <li className={styles.item} onClick={goToWriting}>글쓰기</li>
            <li className={styles.item} onClick={goToSubjects}>글감</li>
            <li className={styles.item} onClick={goToMyWriting}>나의 글</li>
            <li className={styles.item} onClick={goToFavorite}>보관함</li>
            <li className={styles.item} onClick={onLogout}>로그아웃</li>
          </ul>
          <div className={styles.searchBox}>
            <BiSearch className={styles.search}></BiSearch>
            <form onSubmit={onSubmit} >
              <input
                ref={inputRef}
                className={styles.searchInput} 
                type="text" 
                placeholder="무엇을 찾고 계시나요?"/>
            </form>
            
          </div>
        </div>

    </section>
  )
}

export default Sidebar
