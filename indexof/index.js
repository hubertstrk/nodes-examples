const obj = {
  id: 3,
  name: 'test1'
}

const array = [
  {id: 1, name: 'test1'},
  {id: 2, name: 'test2'},
  {id: 3, name: 'test3'}
]

const index = array.findIndex( x => x.id === obj.id)
console.info(index)