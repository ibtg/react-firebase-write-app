import firebase from 'firebase';
import firebaseApp from './firebase';

class AuthService{
  
  // Login
  login(providerName){
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    return firebaseApp.auth().signInWithPopup(authProvider);
  }
  

  // state change check
  onAuthChange(onUserChanged){
    firebase.auth().onAuthStateChanged(user =>{
      onUserChanged(user)
    })
  }


}

export default AuthService