console.log('start')
setTimeout(() => {
  console.log('inside cb!')
}, 1000)
setTimeout(() => {
  console.log('second inside cb!')
}, 0)
console.log('end')