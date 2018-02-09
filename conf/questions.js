const validUrl = require('valid-url')
const fs = require('fs')

module.exports = [
  {
    type: 'input',
    name: 'url',
    message: 'What is the url for the json api?',
    validate (val) {
      if (validUrl.isUri(val)) {
        return true
      }
      return 'Please provide a valid url'
    }
  },
  {
    type: 'input',
    name: 'path',
    message: 'Where is your json resume in fresh format?',
    validate (val) {
      try {
        fs.statSync(val)
      } catch (e) {
        return `json file not found at ${val}`
      }
      return true
    }
  },
  {
    type: 'boolean',
    name: 'permit',
    message: 'You ready to do this? (YyNn)',
    validate (val) {
      if (val !== '' && ['y', 'n'].indexOf(val.toLowerCase()) > -1) {
        return true
      }
      return 'Please input Y or y or N or n.'
    }
  }
]
