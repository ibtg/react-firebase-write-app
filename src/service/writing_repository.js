import {firebaseDatabase} from './firebase'

class WritingRepository{


  getSubjects(onUpdate){
    const ref = firebaseDatabase.ref('subjects');
    // console.log("ref: ", ref)

    ref.on('value', snapshot =>{
      const value = snapshot.val();
      // console.log("value: ", value)
      // console.log("object value: ", Object.values(value))
      // value && onUpdate(Object.entries(value))
      value && onUpdate(value)
    })

    return ()=>ref.off();
  }

  // saveWriting(userId, writing){
  //   firebaseDatabase.ref(`${userId}/writing/${writing.id}`).set(writing)
  // }
}


export default WritingRepository