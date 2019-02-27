// 1-23
const timeData1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
// 1-59
const timeData2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
// 小时
const hours = [0].concat(timeData1)
const hoursUse = timeData1.concat([24])
// 分
const minutes = [0].concat(timeData2)
const minutesUse = timeData1.concat([60])
// 秒
const seconds = [0].concat(timeData2)
const secondsUse = timeData1.concat([60])

module.exports = {
  hours,
  hoursUse,
  minutes,
  minutesUse,
  seconds,
  secondsUse
}