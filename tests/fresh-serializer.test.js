const freshSerializer = require('./fresh-serializer')
const fsMock = require('./custom-mocks/fs')

describe('fresh-serializer', () => {
  describe('readFileSync', () => {
    it('returns buffer from fs.readFileSync', () => {
      fs.testResponse = '<Buffer 7b >'
      const res = freshSerializer.readFileSync('path')
      expect(res).toBe('<Buffer 7b >')
    })

    it('returns null when fs.readFileSync returns error', () => {
      fs.readFileSync = () => {
        throw new Error()
      }
      const res = freshSerializer.readFileSync('path')
      expect(res).toBeNull()
    })
  })
  describe('parse', () => {
    it('parses properly formatted json', () => {
      const res = freshSerializer.parse(`{"foo":"bar"}`)
      expect(res.foo).toBe('bar')
    })

    it('returns null for unparseable json', () => {

    })
  })
})
