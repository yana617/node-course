module.exports = {
  apps: [{
    name: 'task-app',
    script: 'src/index.js',
    watch: './task-manager'
  }],

  deploy: {
    production: {
      user: 'root',
      host: '167.71.63.10',
      ref: 'origin/master',
      repo: 'git@github.com:yana617/node-course.git',
      path: '/var/www/node-course',
      'pre-deploy-local': '',
      'post-deploy': 'cd task-manager && npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'rm -rf /var/www/node-course/'
    }
  }
};
