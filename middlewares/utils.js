const {
  generateError,
} = require('../helper/utils');

// Function to check form completeness dynamically based on required field and request body
const formCompleteness = (requiredFields) => {
  return (req, res, next) => {    
    // 1. Get object fields from request body
    const keys = Object.keys(req.body)
    
    // 2. Field is considered incompleted if:
    // - keys from request body is not exists on required fields
    // - value length from request body is 0
    const incompleteFields = []
    requiredFields && requiredFields.map(field => {
      const isNotExists = keys.indexOf(field) < 0 
      const isEmpty = req.body[field].length <= 0
      if (isNotExists || isEmpty) incompleteFields.push(field)
    })
    
    // 3. Proceed with errors with incomplete fields are not empty
    if (incompleteFields.length <= 0) next()
    if (incompleteFields.length > 0) {
      const string = incompleteFields.reduce((total, value) => total += `${value} `, '')
      const error = generateError(400, `Form has missing fields or empty value: ${string}`)
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
}