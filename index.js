const program = require('commander')
const { prompt } = require('inquirer')
const postResume = require('./lib/post-resume')
const questions = require('./lib/questions')
const freshSerializer = require('./lib/fresh-serializer')
const freshFormatters = require('./conf/fresh-formatters')

// option defaults
let defaults = {
  path: './conf/resume.json',
  url: 'http://localhost:3000/resumes'
}

// process cli arguments
program
  .version('0.0.1-alpha')

program
  .command('apply') // No need of specifying arguments here
  .alias('a')
  .option('-p, --path [str]', 'path to the resume json file in FRESH format')
  .option('-u, --url [str]', 'json api url')
  .description('send resume to api')
  .action(cmd => {
    questions.setDefaults({ cmd, defaults })

    prompt(questions.getFirstGroup()).then(async answers => {
      const freshResumeRaw = await freshSerializer.readFileSync(answers.path)
      const freshResumeParsed = freshSerializer.parse(freshResumeRaw)

      if (!freshResumeParsed) {
        console.log(`${answers.path} is not valid json`)
        process.exit()
      }

      const freshResumeSerialized = freshSerializer.serialize(freshResumeParsed, freshFormatters)

      console.log(JSON.stringify(JSON.parse(freshResumeSerialized), null, 1))

      prompt(questions.getLastGroup()).then(confirmation => {
        if (confirmation.permit.toLowerCase().match('n')) {
          console.log('You have chosen not to submit your resume', answers)
          process.exit()
        }

        // postResume request options
        let url = answers.url || cmd.url

        let fetchOptions = {
          method: 'post',
          body: freshResumeSerialized,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }

        postResume({ url, fetchOptions })
      })
    })
  })

if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp()
  process.exit()
}

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message, error.stack)
})

program.parse(process.argv)
