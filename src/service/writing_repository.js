import {firebaseDatabase} from './firebase'

class WritingRepository{


  getSubjects(onUpdate){
    const ref = firebaseDatabase.ref('subjects');

    ref.once('value', snapshot =>{
      const value = snapshot.val();

      console.log("value: ", value)
      // console.log("object lendght: ", Object.keys(value).length)
      value && onUpdate(value)
    })

    return ()=>ref.off();
  }

  getWriting(onUpdate){
    const ref = firebaseDatabase.ref('subjects')
    ref.once('value', snapshot =>{
      // .StartAt(time).limitToFirst(1).
      const value = snapshot.val();
      const randIdx = parseInt(Math.random()*Object.keys(value).length) //get rand Index
      // console.log("randIdx : ", randIdx )
      // console.log("value: ", value)
      
      const writing = Object.entries(value)[randIdx]
      // console.log("writing: ", writing)
      value && onUpdate({subject:writing[0], info:writing[1] })
    })

    return ()=>ref.off();
  }

  // save user's writing
  saveWriting(userId, subject, writing){
    // console.log("saving")
    // console.log(userId, subject, writing)

    // save in subject
    firebaseDatabase.ref(`subjects/${subject}/users/${userId}`).set(writing)

    // save as user
    firebaseDatabase.ref(`users/${userId}/subjects/${subject}`).set(writing)

  }

  deleteWriting(userId, subject){
    // console.log("saving")
    // console.log(userId, subject, writing)

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
    const ref = firebaseDatabase.ref(`subjects/${subject}/users`)
    ref.once('value', snapshot =>{

      const value = snapshot.val();
      onUpdate(value)

      
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