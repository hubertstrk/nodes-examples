'use strict'

console.log('start')

const func1 = function(){
    console.log('func1')
}

function func2(){
    console.log('func2')
}

const func3 = function(){
    return func1
}

console.log(func3()())