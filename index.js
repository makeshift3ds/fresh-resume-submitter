const program = require('commander')

program
  .version('0.0.1-alpha')
  .option('-p, --path [str]', 'path to the json configuration')
  .parse(process.argv)

// Program Execution
if (program.path) console.log(`path is set to ${program.path}`)
