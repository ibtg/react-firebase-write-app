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
    // console.log(userId, subject, writing)

    // save in subject
    firebaseDatabase.ref(`subjects/${subject}/users/${userId}`).set(writing)

    // save as user
    firebaseDatabase.ref(`users/${userId}/${subject}`).set(writing)

  }


  // get my writing
  getMyWriting(userId, onUpdate){
    const ref = firebaseDatabase.ref(`users/${userId}`)

    ref.orderByChild('writingId').once('value', snapshot =>{
      // const key = snapshot.key
      // const value = snapshot.val();

      const orderedObj = {}
      snapshot.forEach((childSnaphsot)=>{
        // console.log("childSnaphsot: ",childSnaphsot.val().writingId)
        // console.log("childSnaphsot: ", childSnaphsot.val())
        orderedObj[childSnaphsot.val().writingId] = childSnaphsot.val()

      })
      
      // const value = snapshot.val();
      // console.log("value: ",value)


      // const orderedValue = Object.keys(value).reverse().reduce((result ,key)=>{
      //   result[key] = value[key]
      //   return result
      // }, {})
      // console.log("object order: ", orderedValue)
      orderedObj && onUpdate(Object.entries(orderedObj).reverse())
    })

    return ()=>ref.off();

  }

  getSearch(subject, onUpdate){
    const ref = firebaseDatabase.ref(`subjects/${subject}/users`)
    ref.once('value', snapshot =>{

      const value = snapshot.val();
      // console.log("value: ", value)

    
      value && onUpdate(value)

      
    })
    return ()=>ref.off();
  }

}


export default WritingRepository