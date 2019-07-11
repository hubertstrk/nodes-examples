const tagsByField = {
    'field1': ['tag1', 'tag2'],
    'field2': ['tag3', 'tag4'],
    'field3': ['tag2'],
}
  
const selectedFields = ['field1', 'field2', 'field4']
const selectedTags = ['tag5', 'tag6']

const result = {}
selectedFields.forEach((f) => {
  const tags = (tagsByField[f] || []).concat(selectedTags)
  result[f] = tags
})

const result1 = selectedFields.reduce((acc, curr) => {
  const tags = (tagsByField[curr] || []).concat(selectedTags)
  acc[curr] = tags
  return acc
},[])

console.info(result1)
  