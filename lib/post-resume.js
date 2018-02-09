const fetch = require('node-fetch')

module.exports = async ({ url, fetchOptions }) => {
  try {
    this.response = await fetch(url, fetchOptions)
    this.json = await this.response.json()
  } catch (e) {
    throw e
  }
  console.log(this.json)
}
