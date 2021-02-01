const express = require('express');
const chalk = require('chalk');

require('./db/mongoose');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(require('./routers'));

app.listen(port, () => {
  console.log(chalk.green.bold(`[INFO] Server started on post ${port}!`));
});
