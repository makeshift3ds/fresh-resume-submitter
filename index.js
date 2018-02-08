const program = require('commander')
const fs = require('fs')
const fetch = require('node-fetch')

// option defaults
let defaults = {
  resumePath: './resume.json',
  url: 'http://localhost:3000/resumes'
}

// process cli arguments
program
  .version('0.0.1-alpha')
  .option('-p, --path [str]', 'path to the json configuration')
  .option('-u, --url [str]', 'json api url')
  .parse(process.argv)

// option defaults
let conf = {
  resumePath: program.path || defaults.resumePath,
  apiUrl: program.url || defaults.url
}

// read the file
try {
  conf.resumeRaw = fs.readFileSync(conf.resumePath, 'utf-8')
} catch (e) {
  throw e
}

class Submitter {
  constructor ({ apiUrl, fetchOptions }) {
    this._conf = { apiUrl, fetchOptions }
  }

  async _sendRequest () {
    this.response = await fetch(this._conf.apiUrl, this._conf.fetchOptions)
    this.json = await this.response.json()
    console.log(this.json)
  }

  async doStuff () {
    try {
      await this._sendRequest()
    } catch (e) {
      throw e
    }
  }
}

let fetchOptions = {
  method: 'post',
  body: conf.resumeRaw,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

let submitter = new Submitter({ apiUrl: conf.apiUrl, fetchOptions })
submitter.doStuff()
