import {firebaseDatabase, firebaseAuth} from './firebase'

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
    // console.log("ref: ", ref)
    ref.once('value', snapshot =>{
      // .StartAt(time).limitToFirst(1).
      const value = snapshot.val();
      // const randIdx = parseInt(Math.random()* Object.keys(value).length) //get rand Index
      // console.log("randIdx : ", randIdx )
      // console.log("value: ", value)
      
      const writing = Object.entries(value)[0]
      // console.log("writing: ", writing)
      value && onUpdate({subjectId:writing[0] , info:writing[1] })
    })

    return ()=>ref.off();
  }

  // when the writing about specific subject is written, number is counted
  saveSubjectCount(subjectId, count){
    firebaseDatabase.ref(`subjects/${subjectId}/count`).set(count)
  }


  // saver user's writing
  saveWriting(userId, subjectId, subject){
    console.log("user: ", firebaseAuth.currentUser)
    console.log("user id: ", firebaseAuth.currentUser.displayName)
    // firebaseDatabase.ref(`subjects/${subjectId}/${userId}`).set(subject)
  }
}


export default WritingRepository