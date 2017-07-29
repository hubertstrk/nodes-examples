foo = {
    prop1: 'hello',
    prop2: 'world'
}

const getProp = (selector) => {
  if(!foo) {return ''}
  return selector(foo)
}

// const result = getProp(x => x.prop1)
const result = getProp(function(data){
  return data.prop1
})

console.info(result)