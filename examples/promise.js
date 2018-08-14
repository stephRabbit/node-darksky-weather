const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b)
      }
      else {
        reject('Arguments must be numbers!')
      }
    }, 3000)
  })
}

const somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve('Data resolved')
    reject('Unable to fulfill promise!')
  }, 2500)
})


somePromise.then(res => {
  console.log('Success! ', res)
}, error => {
  console.log('Error! ', error)
})

// asyncAdd(5, '7').then(res => {
//   console.log(res)
//   return asyncAdd(res, 33)
// }, error => {
//   console.log(error)
// }).then(res => {
//   console.log('Should be 45', res)
// }, error => {
//   console.log(error)
// })

asyncAdd(5, '7').then(res => {
  console.log(res)
  return asyncAdd(res, 33)
})
.then(res => {
  console.log('Should be 45', res)
})
.catch(error => {
  console.log(error)
})