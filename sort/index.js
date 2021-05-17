const foo = [
  {id: 1, value: '300'},
  {id: 2, value: '600'},
  {id: 3, value: '20'},
  {id: 4, value: '1000'},
  {id: 5, value: '9'}
]

const sorted = foo.sort((a, b) => {
  return parseFloat(a.value) - parseFloat(b.value)
})

console.info(JSON.stringify(sorted))
