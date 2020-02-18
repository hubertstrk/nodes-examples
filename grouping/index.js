const {groupBy, minBy} = require('lodash')

const data = [
  { user: 'a', value: 10 },
  { user: 'a', value: 12 },
  { user: 'b', value: 20 },
  { user: 'c', value: 30 },
  { user: 'c', value: 32 }
]

const grouped = groupBy(data, 'user')

console.info(`grouped: ${grouped}`)
console.info(`grouped length: ${Object.keys(grouped).length}`)

const reducer = (acc, curr) => acc + curr.value;
const sum_result = Object.keys(grouped).map(x => grouped[x].reduce(reducer, 0))
console.info(sum_result)

const min_result = Object.keys(grouped).map(x => minBy(grouped[x], 'value')).map(x => x.value)
console.info(min_result)