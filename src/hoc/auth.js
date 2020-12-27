import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Auth(SpecificComponent, authService, writingRepository){

  const AuthentificationCheck = () =>{
    const history = useHistory();
    const [user, setUser] = useState('')

    useEffect(() => {
      // check user log in
      authService.onAuthChange( user =>{
        if(user){
          setUser(user)
        }else{
          history.push('/')

        }
        
      })
    },[history])

  
    return ( user && <SpecificComponent  user={user} authService={authService} writingRepository={writingRepository}></SpecificComponent>)
  }
  
  return AuthentificationCheck;

}

