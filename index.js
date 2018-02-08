const program = require('commander')
const { prompt } = require('inquirer')
const fs = require('fs')
const postResume = require('./postResume')
const questions = require('./questions')
const path = require('path')

// option defaults
let defaults = {
  path: './resume.json',
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
  .action((cmd) => {
    const firstQuestions = questions.slice(0, 2)

    firstQuestions.map(question => {
      question.default = () => cmd[question.name] || defaults[question.name]
    })

    prompt(firstQuestions).then((answers) => {
      // wip - verification output
      console.log(JSON.stringify(answers, null, 1))

      // read the file
      let resumeRaw = {}
      let absolutePath = path.resolve(answers.path || cmd.path)

      try {
        resumeRaw = fs.readFileSync(absolutePath, 'utf-8')
      } catch (e) {
        throw e
      }

      prompt(questions.slice(-1)).then(confirmation => {
        if (confirmation.permit.toLowerCase().match('n')) {
          console.log('You have chosen not to submit your resume', answers)
          process.exit()
        }

        // option defaults
        let url = answers.url || cmd.url

        let fetchOptions = {
          method: 'post',
          body: resumeRaw,
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

program.parse(process.argv)
