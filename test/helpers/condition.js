module.exports = function condition (fn) {
  const timeoutError = new Error('Condition timed out: ' + fn.toString())
  Error.captureStackTrace(timeoutError, condition)

  return new Promise((resolve, reject) => {
    const intervalId = global.setInterval(() => {
      if (fn()) {
        global.clearTimeout(timeout)
        global.clearInterval(intervalId)
        resolve()
      }
    }, 5)

    const timeout = global.setTimeout(() => {
      global.clearInterval(intervalId)
      reject(timeoutError)
    }, 500)
  })
}
