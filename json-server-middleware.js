module.exports = (req, res, next) => {
  let formatJson = obj => JSON.stringify(obj, null, 2)
  console.log('headers', formatJson(req.headers))
  console.log('body', formatJson(req.body))
  next()
}
