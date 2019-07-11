const fs = require('fs')
const path = require('path')
const uuidv4 = require('uuid/v4')
/**
 *
 *
 * @param {*} directory
 * @param {*} name
 * @param {*} data
 * @returns
 */
const writeNote = (directory, name, data) => {
  return new Promise((resolve) => {
    var stream = fs.createWriteStream(path.join(directory, name))
    stream.write(data)
    stream.end()
    stream.on('finish', function () {
      resolve()
    })
  })
}
/**
 *
 *
 * @param {*} directory
 * @param {*} name
 * @returns
 */
const readFile = (directory, name) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(directory, name), (error, data) => {
      if (error) reject(error)
      resolve(data)
    })
  })
}

const serialize = ({starred, project, text}) => {
  const starredBuffer = encodeBoolean(starred)

  const projectBuffer = encodeString(project)

  const textBuffer = encodeString(text)

  return Buffer.concat([starredBuffer, projectBuffer, textBuffer]);
}

const deserialize = (result) => {
  let length = 0
  let index = 0
  const buffer = Buffer.from(result)

  const starred = buffer[0] === 1 ? true : false
  index += 1

  length = buffer.readUInt16BE(index)
  index += 16

  const project = buffer.toString('utf-8', index, index + length)
  index += length

  length = buffer.readUInt16BE(index)
  index += 16

  const text = buffer.toString('utf-8', index, index + length)
  index += length

  return {starred, project, text}
}

const encodeString = (data) => {
  const encoded = Buffer.alloc(16 +  Buffer.byteLength(data))
  encoded.writeUInt16BE(Buffer.byteLength(data))
  encoded.write(data, 16)
  return encoded
}

const encodeBoolean = (data) => {
  const encoded = Buffer.alloc(1)
  encoded[0] = data ? 1 : 0
  return encoded
}

async function writeAndRead  (note) {

  const encoded = serialize(note)

  const fileName = uuidv4()
  await writeNote('C:\\temp', fileName, encoded)

  const fileContent = await readFile('C:\\temp', fileName)
  const {starred, project, text} = await deserialize(fileContent)

  console.info(`${starred}, ${project}, ${text}`)
}

const projects = [
  'Coordinating',
  'Project Management',
  'Meetings Notes',
  'Marketing Management',
  'Commanding',
  'Code Snippets',
  'Information Technology',
  'Design',
  'Controlling',
  'Todo',
  'How To',
  'Partners',
  'Tools',
  'Decision Management',
  'Risk Management',
  'Staff',
  'Emerging Markets',
  'Diagnose',
  'Data Analysis',
  'Passwords',
  'Expenses',
  'Training',
  'Accounting',
  'Security Management',
  'Human Resources',
  'Planning',
  'Social Organization',
  'Administration',
  'Motivation',
  'Financial Management',
  'Strategic Management',
  'Mission Critical',
  'Accomplishments',
  'Embezzelment',
  'Performance',
  'Flamboyance',
  'Mentoring Skills'
]

const starred = [true, false]

const markdown = '# h1 Heading \n ## h2 Heading \n ### h3 Heading \n #### h4 Heading \n ##### h5 Heading \n > Blockquotes can also be nested... \n >> ...by using additional greater-than signs right next to each other... \n + Create a list by starting a line with `+`, `-`, or `*` \n + Sub-lists are made by indenting 2 spaces: \n   - Marker character change forces new list start: \n     * Ac tristique libero volutpat at \n     + Facilisis in pretium nisl aliquet \n     - Nulla volutpat aliquam velit \n 1. Lorem ipsum dolor sit amet \n 2. Consectetur adipiscing elit \n 1. You can use sequential numbers... \n 57. foo \n     // Some comments \n     line 1 of code \n     line 2 of code \n | Option | Description | \n | ------ | ----------- | \n | data   | path to data files to supply the data that will be passed into templates. | \n | engine | engine to be used for processing templates. Handlebars is the default. | \n | Option | Description | \n | ------:| -----------:| \n | data   | path to data files to supply the data that will be passed into templates. | \n | engine | engine to be used for processing templates. Handlebars is the default. | \n ![Minion](https://octodex.github.com/images/minion.png) \n The killer feature of markdown-it is very effective support of \n > Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum: \n > \n - 19^th^ \n :   Definition 1 \n Term 1 \n Term 2 \n   ~ Definition 2a \n ::: warning \n *here be dragons* \n :::'

for (let i = 0; i < 100; i++) {
  writeAndRead({
    starred: starred[Math.floor(Math.random() * 2)],
    project: projects[Math.floor(Math.random() * projects.length - 1)],
    text: markdown
  })
}