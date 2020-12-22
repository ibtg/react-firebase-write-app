import {firebaseAuth, githubProvider, googleProvider} from './firebase'

class AuthService{
  
  // Login
  login(providerName){
    const authProvider = this.getProvider(providerName)
    return firebaseAuth.signInWithPopup(authProvider);
  }
  
  // logout
  logout(){
    firebaseAuth.signOut()
  }

  // state change check
  onAuthChange(onUserChanged){
    firebaseAuth.onAuthStateChanged(user =>{
      onUserChanged(user)
    })
  }


  // get provider
  getProvider(providerName){
    switch(providerName){
      case 'Google':
        return googleProvider;
      case 'Github':
        return githubProvider;
      default:
        throw new Error();
    }
  }

}

export default AuthService