module.exports = () => {
  return {
    testResponse: '',
    readFileSync () {
      return this.testResponse
    }
  }
}
