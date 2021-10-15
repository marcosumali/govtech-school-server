const isEmail = require('validator/lib/isEmail');

const generateError = (code, errorMessage) => {
  return {
    code,
    error: new Error(errorMessage)
  }
}

// Function to convert array of strings into singular string split by comma
const getCombinedArray = (array) => array.reduce((total, value, index, arr) => {
  if (index >= arr.length-1) return total += `${value}`
  return total += `${value}, `
}, '')

// The validator will not allow any non-English UTF8 character in email address' local part
// Some languange has english latin characters with intonation like chinese, vietnamese etc
// So by set as false, we only allow english latin characters of: A-Z, a-z, 0-9 and some symbols
const isEmailEnglishFormat = email => isEmail(email, {allow_utf8_local_part: false})

// Function to generate condition queries dynamically
// Example: 
// obj: {name: 'Test', phone: '123'}
// Expected queries: `name = ? OR phone = ?`
// Expected values: ['Test', '123']
const getConditionQueries = (obj, condition = 'OR') => {
  const keys = Object.keys(obj)
  const conditionQueries = keys.reduce((total, key, index, arr) => {
    if (index >= arr.length-1) return total += `${key} = ?`
    return total += `${key} = ? ${condition} `
  }, '')
  const values = Object.values(obj)
  
  return {conditionQueries, values}
}


module.exports = {
  generateError,
  getCombinedArray,
  isEmailEnglishFormat,
  getConditionQueries,
}
