const {groupBy, minBy, keyBy} = require('lodash')

const data = [
  { user: 'a', value: 10 },
  { user: 'a', value: 12 },
  { user: 'b', value: 20 },
  { user: 'c', value: 30 },
  { user: 'c', value: 32 }
]

const data1 = [
  { id: 'e65b1798-b412-4517-8bb7-bcfb947cddc0', value: 10 },
  { id: 'ecf9f671-ff3d-403d-b849-1f4832af9e47', value: 12 },
  { id: 'd87e6300-7bdb-4749-9831-5b1a8df1e2b5', value: 20 },
  { id: 'd3a2dac9-ac5a-4341-bd16-eb49b9571dc4', value: 30 },
  { id: 'edcac6a9-93bc-494f-b219-91648a194c8b', value: 32 }
]


// const grouped = groupBy(data1, 'id')
// console.info(`grouped: ${JSON.stringify(grouped)}`)


const keyed = keyBy(data1, x => x.id);
console.info(JSON.stringify(keyed))


// console.info(`grouped length: ${Object.keys(grouped).length}`)

// const reducer = (acc, curr) => acc + curr.value;
// const sum_result = Object.keys(grouped).map(x => grouped[x].reduce(reducer, 0))
// console.info(sum_result)

// const min_result = Object.keys(grouped).map(x => minBy(grouped[x], 'value')).map(x => x.value)
// console.info(min_result)

