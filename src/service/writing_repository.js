import {firebaseDatabase} from './firebase'

class WritingRepository{


  getSubjects(onUpdate){
    const ref = firebaseDatabase.ref('subjects');

    ref.once('value', snapshot =>{
      const value = snapshot.val();
      value && onUpdate(value)
    })

    return ()=>ref.off();
  }

  getWriting(onUpdate){
    const ref = firebaseDatabase.ref('subjects')
    ref.once('value', snapshot =>{
      const value = snapshot.val();
      const randIdx = parseInt(Math.random()*Object.keys(value).length) //get rand Index
      const writing = Object.entries(value)[randIdx]
      value && onUpdate({subject:writing[0], info:writing[1] })
    })

    return ()=>ref.off();
  }

  // save user's writing
  saveWriting(userId, subject, writing){

    // save in subject
    firebaseDatabase.ref(`subjects/${subject}/users/${userId}`).set(writing)

    // save as user
    firebaseDatabase.ref(`users/${userId}/subjects/${subject}`).set(writing)

  }

  deleteWriting(userId, subject){
    
    // save in subject
    firebaseDatabase.ref(`subjects/${subject}/users/${userId}`).remove()

    // save as user
    firebaseDatabase.ref(`users/${userId}/subjects/${subject}`).remove()

  }


  // get my writing
  getMyWriting(userId, onUpdate){
    const ref = firebaseDatabase.ref(`users/${userId}/subjects`)

    ref.orderByChild('writingId').once('value', snapshot =>{

      const value = snapshot.val()
      if (value === null){
        onUpdate({})
      }else{
        const orderedValue = Object.entries(value).sort((prev, curr) => curr[1].writingId - prev[1].writingId)
        orderedValue && onUpdate((orderedValue))
      }
    })

    return ()=>ref.off();

  }

  getSearch(subject, onUpdate){
    const ref = firebaseDatabase.ref(`subjects/${subject}`)
    ref.once('value', snapshot =>{

      const value = snapshot.val();
      if(value){
        onUpdate({cover: value.cover, users:value.users, subject:subject})
      }else{
        onUpdate({})
      }
    })
    return ()=>ref.off();
  }

  getFavorite(userId, onUpdate){
    const ref = firebaseDatabase.ref(`users/${userId}/favorite`)

    ref.orderByChild('writingId').once('value', snapshot =>{

      const value = snapshot.val()
      if (value === null){
        onUpdate({})
      }else{
        const orderedValue = Object.entries(value).sort((prev, curr) => curr[1].date - prev[1].date)
        console.log("orderedValue: ", orderedValue)
        orderedValue && onUpdate((orderedValue))
      }

    })
    return ()=>ref.off();
  }

  // add to user's favorite writing
  addToFavorite(userId, writingId, writing){
    // save as user
    firebaseDatabase.ref(`users/${userId}/favorite/${writingId}`).set(writing)

  }

  // remove from favorite list
  removeToFavorite(userId, writingId){
    firebaseDatabase.ref(`users/${userId}/favorite/${writingId}`).remove()
  }

}


export default WritingRepository