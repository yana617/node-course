const chalk = require('chalk');

const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
  console.log(chalk.green.bold(`[INFO] Server started on post ${port}!`));
});
