const {
  generateError,
  getCombinedArray,
  isEmailEnglishFormat,
} = require('../helper/utils');

// Function to check form completeness dynamically based on required field and request body
const formCompleteness = (requiredFields) => {
  return (req, res, next) => {
    const emptyPayload = req.body && Object.keys(req.body).length === 0 && Object.getPrototypeOf(req.body) === Object.prototype
    // Check for empty payload
    // If empty payload then send error message
    if (emptyPayload) {
      const error = generateError(400, `Form has missing request payload`)
      next(error)
    }

    if (!emptyPayload) {
      // 1. Get object fields from request body
      const keys = Object.keys(req.body)
      
      // 2. Field is considered incompleted if:
      // - keys from request body is not exists on required fields
      // - value length from request body is 0
      const incompleteFields = []
      requiredFields && requiredFields.map(field => {
        const isNotExists = keys.indexOf(field) < 0 
        const isEmpty = req.body[field] ? req.body[field].length <= 0 : true
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
// requiredFields = [teacher, students]
// teachers: shawn@edu.com
// students: [john1@edu,com, john2@edu.com]
const validateEmails = (requiredFields) => {
  return (req, res, next) => {
    const invalidEmails = []
    requiredFields && requiredFields.map(field => {
      const value = req.body[field]
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
      const error = generateError(400, `Form has missing invalid emails: ${emailString}`)
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