'use strict'

// javascript does not distinguish between object literal and object created with new
// for..in iterates over all property keys

console.log('________Car')

const car = {}
car.type = 'Hyundai'
car.model = 'i30'
car.color = 'black'

for (const c in car) {
  // loops throuh the properties which have the internal javascript property IEnumerable set to true
  // output is the property key
  console.log(c) // type model color
}
for (const c in car) {
  // loops throuh the properties which have the internal javascript property IEnumerable set to true 
  // output is the property value
  console.log(car[c]) // Hyundai i30 black
}

console.log('test')
console.log('________Tree')
const tree = function (color, type) {
  this.color = color
  this.type = type
}
const tree1 = new tree('green', "eiche")
for (const t in tree1) {
  console.log(t)
}
for (const t in tree1) {
  console.log(tree1[t])
}

console.log('________Array')
const myArray = new Array()
myArray.push(new tree("green", "Eiche"))
myArray.push(new tree("yellow", "Esche"))
myArray.push(new tree("brown", "Fichte"))
for (const a in myArray) {
  // a is just the index inside the myArray
  // output: 0 1 2 
  console.log(a)
  // accesing the property via the index outputs the object which is a tree
  console.log(myArray[a])
  // loop through all objects via index
  for (const prop in myArray[a]) {
    // output the property keys of each tree which is the same in each iteration
    console.log(prop)
  }
}

console.log('________Simple Array')
const simpleArray = [11, 22, 33]
for (const a in simpleArray) {
  // a is just the index of the array
  console.log(a)
}
for (const a in simpleArray) {
  // access the property value with via index
  console.log(simpleArray[a])
}

console.log('________Difference beetween for..in vs/for..of')

// The for...in loop will iterate over all enumerable properties of an object.
// The for...of syntax is specific to collections. It will iterate over the elements of any collection that has a [Symbol.iterator] property.

Object.prototype.objCustom = function () { };
Array.prototype.arrCustom = function () { };

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  console.log(i); // output: 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i of iterable) {
  console.log(i); // output: logs 3, 5, 7
}

iterable.forEach((value) => {
  console.log(value)
})

console.log('________foreach() ES6')
const container = []
container.push(new tree("tan", "Eiche"))
container.push(new tree("beige", "Esche"))
container.push(new tree("cyan", "Fichte"))
container.forEach((tree) => {
  console.log(tree.color)
})