// TODO: npm install inquirer
// TODO: npm install inquirer-datepicker-prompt

const inquirer = require('inquirer')
inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'))

// define all questions
const questions = [
  {
    type: 'list',
    name: 'mode',
    message: 'Choose the date range you would like to query',
    choices: ['custom', 'today'],
  },
  {
    type: 'datetime',
    name: 'from',
    message: 'From',
    // only ask this question if following condition is true
    when: function(answers) {
      return answers.mode === 'custom'
    }
  },
  {
    type: 'datetime',
    name: 'to',
    message: 'To',
    // only ask this question if following condition is true
    when: function(answers) {
      return answers.mode === 'custom'
    }
  }
];

inquirer.prompt(questions).then(answers => {
  console.info(JSON.stringify(answers))
  // console.info(`${answers.mode}`)
  // console.info(`${answers.from}`)
  // console.info(`${answers.to}`)
})
