const data = require('../conf/questions')

let questions = {
  slice () {
    return this.data.slice(...arguments)
  },

  getFirstGroup () {
    return this.slice(0, -1)
  },

  getLastGroup () {
    return this.slice(-1)
  },

  setDefaults ({ cmd, defaults }) {
    this.getFirstGroup().map(question => {
      question.default = () => cmd[question.name] || defaults[question.name]
    })
  },

  data
}

module.exports = questions
