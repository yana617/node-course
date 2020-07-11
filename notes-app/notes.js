const fs = require('fs');
const chalk = require('chalk');

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.bold('Your notes:'));
  notes.forEach(note => {
    console.log(chalk.blue(note.title));
  })
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title)

  if(!duplicateNote){
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.bold('Your note is added!'));
  }

};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToSave = notes.filter(note => note.title !== title);

  if(notes.length !== notesToSave.length){
    saveNotes(notesToSave);
    console.log(chalk.green.bold('Note removed!'));
  } else {
    console.log(chalk.red('No note found'));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const saveNotes = (array) => {
  const dataJSON = JSON.stringify(array)
  fs.writeFileSync('notes.json', dataJSON)
}

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (note) {
    console.log('Title:' , chalk.bold.green(note.title));
    console.log('body: ', chalk.bold.green(note.body));
  } else {
    console.log(chalk.red('No note found!'));
  }
}

module.exports = {
  listNotes,
  addNote,
  removeNote,
  readNote,
};
