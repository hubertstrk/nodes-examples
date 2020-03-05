const _ = require('lodash')
const moment = require('moment')

const results = [
  {id: 1, date: 1387271989749},
  {id: 2, date: 1387271989760}
]

let groupedResults = _.groupBy(results, (result) => moment(result['date']).startOf('isoWeek'))

console.info(JSON.stringify(groupedResults))