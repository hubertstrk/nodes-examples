const tags = [
    'tag1',
    'tag2',
    'tag3'
  ]
  
  const result = tags.map(t => ({'name': t, 'value': t}))
  
  console.info(result)
  
  const result1 = result.map(f => f.name)
  
  console.info(result1)