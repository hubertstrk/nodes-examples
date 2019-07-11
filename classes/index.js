class Folder {
  constructor (folder) {
    this.folder = folder
  }
  renameFolder (name) {
    this.folder = name
  }
}

class Note {
  constructor (name, folder) {
    this.name = name
    this.folder = folder
  }
}

const folder = new Folder ('C:\\Test\\a')
const noteA = new Note('Note a', folder)
const noteB = new Note('Note b', folder)
const noteC = new Note('Note c', folder)

const notes = [noteA, noteB, noteC]

notes.forEach(note => console.info(note.folder))

folder.renameFolder('C:\\Test\\b')

notes.forEach(note => console.info(note.folder))
