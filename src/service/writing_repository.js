import {firebaseDatabase} from './firebase'

class WritingRepository{


  getSubjects(onUpdate){
    const ref = firebaseDatabase.ref('subjects');

    ref.once('value', snapshot =>{
      const value = snapshot.val();

      // console.log("value: ", value)
      // console.log("object lendght: ", Object.keys(value).length)
      value && onUpdate(value)
    })

    return ()=>ref.off();
  }

  getWriting(onUpdate){
    const ref = firebaseDatabase.ref('subjects')
    ref.once('value', snapshot =>{
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

  // when the writing about specific subject is written, number is counted
  saveSubjectCount(subjectId, count){
    firebaseDatabase.ref(`subjects/${subjectId}/count`).set(count)
  }


  // save user's writing
  saveWriting(userId, subjectId, writing){
    console.log(userId, subjectId, writing)
    // console.log("user: ", firebaseAuth.currentUser)
    // console.log("user id: ", firebaseAuth.currentUser.displayName)

    // save in subject
    firebaseDatabase.ref(`subjects/${subjectId}/users/${userId}`).set(writing)

    // // save as user
    firebaseDatabase.ref(`users/${userId}/${subjectId}`).set(writing)

  }


  // get my writing
  getMyWriting(userId, onUpdate){
    const ref = firebaseDatabase.ref(`users/${userId}`);

    ref.once('value', snapshot =>{
      const value = snapshot.val();

      // console.log("value: ", value)
      // console.log("object lendght: ", Object.keys(value).length)
      value && onUpdate(value)
    })

    return ()=>ref.off();

  }

}


export default WritingRepository