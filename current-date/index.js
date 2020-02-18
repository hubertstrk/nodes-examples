const utcDateRangeToday = () => {
  // get current local time
  var now = new Date();
  // get timezone offset [minutes] and convert it to milliseconds
  const timeZoneOffset = now.getTimezoneOffset() * 60000
  // subtract current day: 86400000 is a full day in milliseconds
  const msToday = now - (now % 86400000) + timeZoneOffset
  // add a full day
  const msTomorrow = msToday + 86400000
  // return date range
  return {
    from: new Date(msToday).toUTCString(),
    to: new Date(msTomorrow).toUTCString()
  }
}

const daterange = utcDateRangeToday()
console.info(daterange.from)
console.info(daterange.to)