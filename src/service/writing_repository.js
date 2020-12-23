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