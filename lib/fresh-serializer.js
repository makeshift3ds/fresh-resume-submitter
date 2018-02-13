const path = require('path')
const fs = require('fs')

let freshSerializer = {
  readFileSync (resumePath) {
    // read the file
    let absolutePath = path.resolve(resumePath)

    try {
      return fs.readFileSync(absolutePath)
    } catch (e) {
      console.log(e.toString())
      return null
    }
  },

  parse (raw) {
    try {
      return JSON.parse(raw)
    } catch (e) {
      return null
    }
  },

  serialize (resume, serializers) {
    const payload = serializers.reduce((prev, current) => {
      if (resume[current.freshKey]) {
        const formatted = current.format
          ? current.format(resume[current.freshKey])
          : resume[current.freshKey]

        prev[current.apiKey] = formatted
        return prev
      }
    }, {})

    return JSON.stringify(payload)
  }
}

module.exports = freshSerializer
