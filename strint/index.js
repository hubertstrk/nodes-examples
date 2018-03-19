'use strict'

const rule = 'Rule: key in a number smaller than {0} and greater than {1}'

function stringFormat(str, arr) {
  return str.replace(
      /\{([0-9]+)\}/g,
      function (_, index) { return arr[index]; });
}

function stringFormat1(str, arr) {
  return str.replace(
      /\{([0-9]+)\}/g,
      function (match, index) { 
        return arr[index] 
      })
}

function stringFormat2(str, arr) {
  return str.replace(
    /\{([0-9]+)\}/g, (match, index) => { return arr[index] })
}

// const formatted = format(rule, 10, 20)
// console.info(formatted)

var str = 'Rule: key in a number smaller than {0} and greater than {1}'
console.info(stringFormat2(str, ['10', '20']))
