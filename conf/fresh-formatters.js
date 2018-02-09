module.exports = [
  {
    freshKey: 'name',
    apiKey: 'first_name',
    format (val) {
      return val.split(' ').slice(0, 1)[0]
    }
  },
  {
    freshKey: 'name',
    apiKey: 'last_name',
    format (val) {
      return val.split(' ').slice(-1)[0]
    }
  }
]
