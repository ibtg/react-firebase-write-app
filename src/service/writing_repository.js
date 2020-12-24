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
    // console.log("ref: ", ref)

    ref.once('value', snapshot =>{
      const value = snapshot.val();
      // const randIdx = parseInt(Math.random()* Object.keys(value).length) //get rand Index
      // const writingKey = Object.keys(value)[randIdx] // get key of rand Index
      // console.log("object keys: ", Object.keys(value)[randIdx])
      // const writing = value[Object.keys(value)[0]] //  value[Object.keys(value)[writingKey]] 
      // console.log("randIdx : ", randIdx )
      // console.log("value: ", value)
      
      const writing = value[Object.keys(value)[0]]
      // // console.log("writing: ", writing.users)
      value && onUpdate(Object.entries(writing.users))
    })

    return ()=>ref.off();
  }

  // when the writing about specific subject is written, number is counted
  saveSubjectCount(subjectId, count){
    firebaseDatabase.ref(`subjects/${subjectId}/count`).set(count)
  }


  // saver user's writing
  saveWriting(userId, subjectId, subject){
    firebaseDatabase.ref(`subjects/${subjectId}/${userId}`).set(subject)
  }
}


export default WritingRepository