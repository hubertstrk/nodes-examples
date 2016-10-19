// https://rainsoft.io/gentle-explanation-of-this-in-javascript/

/*
    There are four different invocation types:
    - function invocation: alert('Hello World!')
    - method invocation: console.log('Hello World!')
    - constructor invocation: new RegExp('\\d')
    - indirect invocation: alert.call(undefined, 'Hello World!')
*/

// Function Invocation
console.log('=> Function Invocation')

function func1(a){
    console.log(this === global) // => true
    this.number = a
}
func1(10)
console.log(func1.a===undefined) // => true
console.log(global.number) // => 10

// Function Invocation in strict mode
console.log('=> Function Invocation in strict mode')
function func2(a){
    'use strict'
    console.log(this===undefined) // => true
}
func2(10)

// function invocation inner/outer scope
console.log('=> Function Invocation inner/outer scope')
var numbers = {  
   numberA: 5,
   numberB: 10,
   sum: function() {
     console.log(this === numbers); // => true
     function calculate() {
       // this is window or undefined in strict mode
       console.log(this === numbers); // => false
       return this.numberA + this.numberB;
     }
     return calculate(); // this is a normal function invocation => this refers to window/global/undefined
   }
};
numbers.sum(); // => NaN or throws TypeError in strict mode 
// to get the correct context of the numbers function use calculate().call(this) to eplicitly set the correct context

console.log('=> Method Invocation')
var calc = {  
  num: 0,
  increment: function() {
    console.log(this === calc); // => true
    this.num += 1;
    return this.num;
  }
};
// method invocation. this refers to calc
calc.increment(); // => 1  
calc.increment(); // => 2
console.log(calc.num) // => 2
// the same applies for 'class' and 'constructor'

console.log('=> Method Invocation with separated method')

function myObject(a){
    'use strict'
    this.prop1 = a
    this.MyFunc = function(){
        console.log(`prop1 is ${this.prop1}`)
    }

}
var myObj = new myObject(10)
console.log(myObj.prop1) // => 10
myObj.MyFunc() // => logs the correct value 10
setTimeout(myObj.MyFunc, 1000) // => separated method due to setTimeout() => logs undefined
setTimeout(myObj.MyFunc.bind(myObj), 1000) // => separated method but functions can use bind() to set the context

console.log('=> Constructor Invocation')

console.log('=> Indirect Invocation ')