import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Main = ({authService}) => {
  const history = useHistory();

  useEffect(() => {
    authService.onAuthChange(user => {
      if(!user){
        history.push('/')
      }
    })

  })

  return(
    <div>Main</div>
  )
}

export default Main;