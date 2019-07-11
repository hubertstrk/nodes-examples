const e1 = { id: 1, harvestYear: [2017, 2018, 2019] }
const e2 = { id: 1, harvestYear: [2016, 2018, 2019] }
const e3 = { id: 1, harvestYear: [2017, 2018, 2019] }
const e4 = { id: 1, harvestYear: [null] }
const entities = [e1, e2, e3, e4]

const harvestFilter = (harvestYear) => (entity) => {
  console.info(harvestYear)
  console.info(entity.harvestYear)
  return entity.harvestYear.includes(harvestYear)
}
const makeHarvestFilter = currentHarvestYear => harvestFilter(currentHarvestYear)


const filter = harvestYear(null)
const filtered = entities.filter(filter)
console.info(filtered)