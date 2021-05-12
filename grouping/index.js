const {groupBy, inRange} = require('lodash')

const data1 = [
  { id: '1', value: 10, area: 3 },
  { id: '2', value: 12, area: 4 },
  { id: '3', value: 20, area: 3 },
  { id: '4', value: 30, area: 7 },
  { id: '5', value: 32, area: 1 },
  { id: '6', value: 27, area: 3 },
  { id: '7', value: 20, area: 3 },
  { id: '8', value: 4, area: 4 },
  { id: '9', value: 32, area: 5 },
  { id: '10', value: 6, area: 3 },
  { id: '11', value: 8, area: 3 },
  { id: '12', value: 1, area: 6 },
  { id: '13', value: 1, area: 3 },
  { id: '14', value: 2, area: 2 }
]

// {"D":[{"id":"1","value":10},{"id":"2","value":12},{"id":"3","value":20},{"id":"4","value":30},{"id":"5","value":32},{"id":"6","value":27},{"id":"7","value":20},{"id":"8","value":4},{"id":"9","value":32},{"id":"10","value":6},{"id":"11","value":8},{"id":"12","value":1},{"id":"13","value":1},{"id":"14","value":2}]}

const grouped = groupBy(data1, (x) => {
  if (inRange(x.value, 8)) return 'A'
  if (inRange(x.value, 8, 16)) return 'B'
  if (inRange(x.value, 16, 30)) return 'C'
  return 'D'
})

console.info(Object.keys(grouped))

grouped.map(g =>  g.values)
