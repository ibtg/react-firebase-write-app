import React, { useEffect, useState } from 'react'
import styles from './writing.module.css';
import Header from '../header/header'
import { useHistory } from 'react-router-dom';
import WritingPage from '../writingPage/writingPage'


const Writing = ({authService, writingRepository}) => {
  const history = useHistory();
  const [count, setCount] = useState(0)
  const [writing, setWriting] = useState([])
  const [rightButton, setRightButton] = useState(true)
  const [leftButton, setLeftButton] = useState(false)
  
  const onAdd = ()=>{
    if(count+1 === Object.keys(writing).length){
      alert('마지막 페이지입니다.')
      return
    }
    setCount(count+1)
    setLeftButton(true)
  }

  const onMinus = ()=>{
    if(count-1 < 0){
      return
    }
    else if(count-1 ===0){
      setLeftButton(false)
    }
    setCount(count-1)
    
  }

  useEffect(() => {
    // check user log in
    authService.onAuthChange( user =>{
      if(!user){
        history.push('/')
      }
    })
  })

  useEffect(() => {
    const writingList =  writingRepository.getWriting((users)=>{
      setWriting(users)
    })
    
    return ()=>writingList()

  }, [writingRepository])
  

  // console.log("users: ", writing)
  console.log("count: ", count)
  console.log(Object.keys(writing).length)

  return (
    <>
      <Header authService={authService}></Header>
      {writing.length !==0 && 
      <WritingPage 
        writing={writing[count]} 
        rightButton={rightButton}
        leftButton={leftButton}
        onAdd={onAdd}
        onMinus={onMinus}
      >
      </WritingPage>}
    </>
  )
}

export default Writing
