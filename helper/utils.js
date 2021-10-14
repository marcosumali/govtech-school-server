const generateError = (code, errorMessage) => {
  return {
    code,
    error: new Error(errorMessage)
  }
}

// Function to convert array of strings into singular string
const getCombinedArray = (array) => array.reduce((total, value) => total += `${value} `, '')


module.exports = {
  generateError,
  getCombinedArray,
}
