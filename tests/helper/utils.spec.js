const chai = require('chai');

const expect = chai.expect;

const {
  generateError,
  getCombinedArray,
  isEmailEnglishFormat,
  getConditionQueries,
} = require('../../helper/utils');

describe('Test helper functions', () => {
  describe('Utils.js file', () => {
    describe('generateError()', () => {
      it('should return error code and message', () => {
        const emails = ['shawn@edu.com', 'john@doe.com']
        const invalidStudentString = getCombinedArray(emails)
        const code = 404
        const expectedErrorMessage = `Students doesn't exist: shawn@edu.com, john@doe.com`
        const result = generateError(code, `Students doesn't exist: ${invalidStudentString}`)

        expect(result).to.be.a('object')
        expect(result).to.have.property('code')
        expect(result).to.have.property('error')
        expect(result.code).to.be.a('number')
        expect(result.code).to.equal(code)
        expect(result.error.message).to.be.a('string')
        expect(result.error.message).to.equal(expectedErrorMessage)
      })
    })

    describe('getCombinedArray()', () => {
      it('should convert array of string into string separated by comma', () => {
        const emails = ['shawn@edu.com', 'john@doe.com']
        const expectedResult = `shawn@edu.com, john@doe.com`
        const result = getCombinedArray(emails)

        expect(result).to.be.a('string')
        expect(result).to.equal(expectedResult)
      })
    })

    describe('isEmailEnglishFormat()', () => {
      it('should return TRUE if email is a valid format', () => {
        const validEmail = 'shawn@edu.com'
        const isValid = isEmailEnglishFormat(validEmail)

        expect(isValid).to.be.a('boolean')
        expect(isValid).to.equal(true)
      })
      it('should return FALSE if email is not a valid format', () => {
        const validEmail = 'shawnedu.com'
        const isValid = isEmailEnglishFormat(validEmail)

        expect(isValid).to.be.a('boolean')
        expect(isValid).to.equal(false)
      })
    })

    describe('getConditionQueries()', () => {
      it('should convert object into condition queries with values in string', () => {
        const data = {email: 'shawn@edu.com', teacher_id: 1}
        const condition = 'AND'
        const expectedQueries = 'email = ? AND teacher_id = ?'
        const expectedValues = ['shawn@edu.com', 1]
        const result = getConditionQueries(data, condition)

        expect(result).to.be.a('object')
        expect(result).to.have.property('conditionQueries')
        expect(result).to.have.property('values')
        expect(result.conditionQueries).to.be.a('string')
        expect(result.conditionQueries).to.equal(expectedQueries)
        expect(result.values).to.be.a('array')
        expect(result.values[0]).to.equal(expectedValues[0])
        expect(result.values[1]).to.equal(expectedValues[1])
      })
    })
  })
})