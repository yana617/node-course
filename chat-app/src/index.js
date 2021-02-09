const server = require('./app');

if (process.env.NODE_ENV !== 'development' & process.env.NODE_ENV !== 'test') {
  require('dotenv').config();
}

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`[INFO] Server started on post ${port}!`);
});
