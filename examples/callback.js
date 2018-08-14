let getUser = (id, fn) => {
  let user = {
    id: 1,
    name: 'Vicky'
  }
  setTimeout(() => {
    fn(user)
  }, 3000)
}

getUser(31, (user) => {
  console.log(user)
})