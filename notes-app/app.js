const yargs = require('yargs');
const notes = require('./notes');

yargs.version('1.1.0')

yargs.command({
  command: 'add',
  describe: 'Add new note',
  builder: {
    title: {
      type: 'string',
      demandOption: true,
      describe: 'Note title',
    },
    body: {
      demandOption: true,
      describe: 'Note body',
      type: 'string',
    }
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body);
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove new note',
  builder: {
    title: {
      type: 'string',
      demandOption: true,
      describe: 'Note title',
    },
  },
  handler: (argv) => {
    notes.removeNote(argv.title)
  }
})

yargs.command({
  command: 'list',
  describe: 'List new note',
  handler: () => notes.listNotes()
})

yargs.command({
  command: 'read',
  describe: 'Read note',
  builder: {
    title: {
      type: 'string',
      demandOption: true,
      describe: 'Note title',
    },
  },
  handler: (argv) => notes.readNote(argv.title),
})

yargs.argv