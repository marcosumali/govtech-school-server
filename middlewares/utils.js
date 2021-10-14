const {
  generateError,
  getCombinedArray,
  isEmailEnglishFormat,
} = require('../helper/utils');

// Function to check form completeness dynamically based on required field and request body
// request field: represent type of request field that need to be check
// e.g. req.body => {teacher: shawn@edu.com, students: [john1@edu.com, john2@edu.com]}
// requiredFields: represent mandatory fields to be check on the payload request
// e.g. ['teacher', 'students']
// Expected return: to check whether request body contain teacher and students field
// and each field must have values
const formCompleteness = (requestField, requiredFields) => {
  return (req, res, next) => {
    const payload = req[requestField] // E.g. req.body || req.query
    const emptyPayload = payload && Object.keys(payload).length === 0 && Object.getPrototypeOf(payload) === Object.prototype
    // Check for empty payload
    // If empty payload then send error message
    if (emptyPayload) {
      const error = generateError(400, `Form has missing request payload`)
      next(error)
    }

    if (!emptyPayload) {
      // 1. Get object fields from request body
      const keys = Object.keys(payload)
      
      // 2. Field is considered incompleted if:
      // - keys from request body is not exists on required fields
      // - value length from request body is 0
      const incompleteFields = []
      requiredFields && requiredFields.map(field => {
        const isNotExists = keys.indexOf(field) < 0 
        const isEmpty = payload[field] ? payload[field].length <= 0 : true
        if (isNotExists || isEmpty) incompleteFields.push(field)
      })
      
      // 3. Proceed with errors with incomplete fields are not empty
      if (incompleteFields.length <= 0) next()
      if (incompleteFields.length > 0) {
        const fieldString = getCombinedArray(incompleteFields)
        const error = generateError(400, `Form has missing fields or empty value: ${fieldString}`)
        next(error)
      }
    }
  }
}

// Function to dynamically check whether value from required fields is a valid english email format
// Function must able to validate value in string or in array of strings
// For example:
// request field: represent type of request field that need to be check
// e.g. req.body => {teacher: shawn@edu.com, students: [john1@edu.com, john2@edu.com]}
// requiredFields: represent mandatory fields to be check on the payload request
// e.g. ['teacher', 'students']
// Expected goal: return whether value of required fields are valid email
const validateEmails = (requestField, requiredFields) => {
  return (req, res, next) => {
    const payload = req[requestField] // E.g. req.body || req.query
    const invalidEmails = []
    requiredFields && requiredFields.map(field => {
      const value = payload[field]
      const isString = typeof value === 'string'
      const isArray = Array.isArray(value)

      if (isString) {
        if (!isEmailEnglishFormat(value)) invalidEmails.push(value)
      }

      if (isArray) {
        value && value.map(email => {
          if (!isEmailEnglishFormat(email)) invalidEmails.push(email)
        })
      }
    }) 
    
    if (invalidEmails.length <= 0) next()
    if (invalidEmails.length > 0) {
      const emailString = getCombinedArray(invalidEmails)
      const error = generateError(400, `Form has invalid emails: ${emailString}`)
      next(error)
    }
  }
}

const catchError = (err, req, res, next) => {
  if (!err) next()
  if (err) {
    const {code, error} = err
    res.status(code).json({message: error.message})
  }
}


module.exports= {
  formCompleteness,
  catchError,
  validateEmails,
}