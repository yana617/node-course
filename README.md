# The Complete Node.js Developer Course (3rd Edition)

udemy.com online course

## Pre requirements

- nodejs >= 8.x
- npm

npm will be installed with Node:

```bash
brew install node
```

## Notes App

### How to run

```bash
// Add new note
node app.js add --title="title" --body="body"

// Remove a note
node app.js remove --title="title" --body="body"

// List notes
node app.js list

// Read a note
node app.js read --title="title"
```

### Modules & features

- yargs
- chalk
- debugging

## Weather App

### How to run

```bash
npm install
npm start

// development
npm run dev
npm run deploy // deploy to the server
```

### Modules & features

- postman-request
- weatherstack API
- mapbox API
- callbacks, arrow functions, destructuring
- http request without library
- html, css, public directory
- express.js
- hbs (views, templates)
- query
- fetch
- git & heroku
- **pm2 (deploy & run)**

## Task Manager App

### How to run

Create **dev.env** file in config/ directory and setup values from **env.example** file.

```bash
npm install
npm run dev
```

### Modules & features

- mongodb ([CRUD](../master/task-manager/mongodb-CRUD.md))
- promises
- mongoose (find*, populate, virtual&methods&pre&statics)
- validator
- async/await
- express get,post,patch,delete with mongoose
- express router
- bcrypt
- jsonwebtoken (jwt)
- middleware
- sorting, pagination, filtering
- multer
- sharp
- sendGrid email service
- mongodb Atlas & compass