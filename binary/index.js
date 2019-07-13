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

const headings = ['There were white out conditions in the town; subsequently, the roads were impassable.','Someone I know recently combined Maple Syrup & buttered Popcorn thinking it would taste like caramel popcorn. It didn’t and they don’t recommend anyone else do it either.','The quick brown fox jumps over the lazy dog.','Wow, does that work?','Wednesday is hump day, but has anyone asked the camel if he’s happy about it?','I love eating toasted cheese and tuna sandwiches.','We need to rent a room for our party.','I am counting my calories, yet I really want dessert.','A song can make or ruin a person’s day if they let it get to them.','The stranger officiates the meal.','He turned in the research paper on Friday; otherwise, he would have not passed the class.','Writing a list of random sentences is harder than I initially thought it would be.','Abstraction is often one floor above you.','I would have gotten the promotion, but my attendance wasn’t good enough.','Rock music approaches at high velocity.','Hurry!','He told us a very exciting adventure story.','This is a Japanese doll.','I think I will buy the red car, or I will lease the blue one.','Dont step on the broken glass.','Joe made the sugar cookies; Susan decorated them.','If I don’t like something, I’ll stay away from it.','I currently have 4 windows open up… and I don’t know why.','He said he was not there yesterday; however, many people saw him there.','The mysterious diary records the voice.','I checked to make sure that he was still alive.','The old apple revels in its authority.','The clock within this blog and the clock on my laptop are 1 hour different from each other.','The sky is clear; the stars are twinkling.','She did her best to help him.','I want more detailed information.','Cats are good pets, for they are clean and are not noisy.','She did not cheat on the test, for it was not the right thing to do.','This is the last random sentence I will be writing and I am going to stop mid-sent','Where do random thoughts come from?','The waves were crashing on the shore; it was a lovely sight.','She folded her handkerchief neatly.','We have never been to Asia, nor have we visited Africa.','She was too short to see over the fence.','Sometimes, all you need to do is completely make an ass of yourself and laugh it off to realise that life isn’t so bad after all.','If you like tuna and tomato sauce- try combining the two. It’s really not as bad as it sounds.','I really want to go to work, but I am too sick to drive.','Christmas is coming.','There was no ice cream in the freezer, nor did they have money to go to the store.','It was getting dark, and we weren’t there yet.','Malls are great places to shop; I can find everything I need under one roof.','She borrowed the book from him many years ago and hasnt yet returned it.','I am never at home on Sundays.','The lake is a long way from here.','A glittering gem is not enough.']

const starred = [true, false]

const markdown = `{heading} \n============\nParagraphs are separated by a blank line.\n2nd paragraph. *Italic*, **bold**, and monospace. Itemized lists\nlook like:\n  * this one\n  * that one\n  * the other one\nNote that --- not considering the asterisk --- the actual text\ncontent starts at 4-columns in.\n> Block quotes are\n> written like so.\n>\n> They can span multiple paragraphs,\n> if you like.\nUse 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "its all\nin chapters 12--14"). Three dots ... will be converted to an ellipsis.\nUnicode is supported. ☺\nAn h2 header\n------------\nHeres a numbered list:\n 1. first item\n 2. second item\n 3. third item\nNote again how the actual text starts at 4 columns in (4 characters\nfrom the left side). Heres a code sample:\n    # Let me re-iterate ...\n    for i in 1 .. 10 { do-something(i) }\nAs you probably guessed, indented 4 spaces. By the way, instead of\nindenting the block, you can use delimited blocks, if you like:\n~~~\ndefine foobar() {\n    print "Welcome to flavor country!";\n}\n~~~\n(which makes copying & pasting easier). You can optionally mark the\ndelimited block for Pandoc to syntax highlight it:\n~~~python\nimport time\n# Quick, count to ten!\nfor i in range(10):\n    # (but not *too* quick)\n    time.sleep(0.5)\n    print(i)\n~~~\n### An h3 header ###\nNow a nested list:\n 1. First, get these ingredients:\n      * carrots\n      * celery\n      * lentils\n 2. Boil some water.\n 3. Dump everything in the pot and follow\n    this algorithm:\n        find wooden spoon\n        uncover pot\n        stir\n        cover pot\n        balance wooden spoon precariously on pot handle\n        wait 10 minutes\n        goto first step (or shut off burner when done)\n    Do not bump wooden spoon or it will fall.\nNotice again how text always lines up on 4-space indents (including\nthat last line which continues item 3 above).\nHeres a link to [a website](http://foo.bar), to a [local\ndoc](local-doc.html), and to a [section heading in the current\ndoc](#an-h2-header). Heres a footnote [^1].\n[^1]: Some footnote text.\nTables can look like this:\nName           Size  Material      Color\n------------- -----  ------------  ------------\nAll Business      9  leather       brown\nRoundabout       10  hemp canvas   natural\nCinderella       11  glass         transparent\nTable: Shoes sizes, materials, and colors.\n(The above is the caption for the table.) Pandoc also supports\nmulti-line tables:\n--------  -----------------------\nKeyword   Text\n--------  -----------------------\nred       Sunsets, apples, and\n          other red or reddish\n          things.\ngreen     Leaves, grass, frogs\n          and other things its\n          not easy being.\n--------  -----------------------`

for (let i = 0; i < 100; i++) {
  writeAndRead({
    starred: starred[Math.floor(Math.random() * 2)],
    project: projects[Math.floor(Math.random() * projects.length - 1)],
    text: markdown.replace('{heading}', `${headings[Math.floor(Math.random() * 49)]}`)
  })
}