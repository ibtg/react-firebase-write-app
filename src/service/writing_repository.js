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
  saveWriting(userId, subject, subjectId, writing){

    // save in subject
    firebaseDatabase.ref(`subjects/${subject}/users/${userId}`).set(writing)

    // save as user
    firebaseDatabase.ref(`users/${userId}/subjects/${subjectId}`).set(writing)

  }

  deleteWriting(userId, subject, subjectId){
    
    // save in subject
    firebaseDatabase.ref(`subjects/${subject}/users/${userId}`).remove()

    // save as user
    firebaseDatabase.ref(`users/${userId}/subjects/${subjectId}`).remove()

  }


  // get my writing
  getMyWriting(userId, onUpdate){
    const ref = firebaseDatabase.ref(`users/${userId}/subjects`)

    ref.orderByChild('addDate').once('value', snapshot =>{

      const value = snapshot.val()
      if (value === null){
        onUpdate({'no':'no results'})
      }else{
        const orderedArray = Object.entries(value).sort((prev, curr) => curr[1].addDate - prev[1].addDate)
        const orderedObj = Object.fromEntries(orderedArray)
        onUpdate(orderedObj)
      }
    })

    return ()=>ref.off();

  }

  getSearch(subject, onUpdate){
    const ref = firebaseDatabase.ref(`subjects/${subject}`)
    ref.once('value', snapshot =>{
      
      const value = snapshot.val();

      if(value === null){
        onUpdate({'no':'no results'})
      }else{
        onUpdate({cover: value.cover, users:value.users, subjectId:value.subjectId, subject:subject})
      }
    })
    return ()=>ref.off();
  }

  getFavorite(userId, onUpdate){
    const ref = firebaseDatabase.ref(`users/${userId}/favorite`)

    ref.orderByChild('addDate').once('value', snapshot =>{

      const value = snapshot.val()

      if (value === null){
        onUpdate({'no':'no results'})
      }else{
        const orderedArray = Object.entries(value).sort((prev, curr) => curr[1].addDate - prev[1].addDate)
        const orderedObj = Object.fromEntries(orderedArray)
        onUpdate(orderedObj)
      }

    })
    return ()=>ref.off();
  }

  // add to user's favorite writing
  addToFavorite(userId, subjectId, writing){
    // save as user
    firebaseDatabase.ref(`users/${userId}/favorite/${subjectId}`).set(writing)

  }

  // remove from favorite list
  removeToFavorite(userId, subjectId){
    firebaseDatabase.ref(`users/${userId}/favorite/${subjectId}`).remove()
  }

}


export default WritingRepository