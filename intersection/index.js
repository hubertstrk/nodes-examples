const _ = require('lodash')

const tagsByField = {
    'field1': ['tag1', 'tag2', 'tag3'],
    'field2': ['tag1'],
    'field3': ['tag2'],
  }
  
  const selection = ['field1', 'field2']
  
  const result = selection.reduce((acc, curr) => {
    const tags = tagsByField[curr]
    if (tags) {
      acc.push(tags)
    } else {
      acc.push([])
    }
    return acc
  }, [])
  console.info(result)

  const intersection = _.intersection(...result)
  console.info(intersection)