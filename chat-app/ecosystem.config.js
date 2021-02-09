module.exports = {
  apps: [{
    name: 'chat-app',
    script: 'src/index.js',
    watch: './chat-app'
  }],
  deploy: {
    production: {
      user: 'root',
      host: '167.71.63.10',
      ref: 'origin/master',
      repo: 'git@github.com:yana617/node-course.git',
      path: '/var/www/node-course',
      'pre-deploy-local': '',
      'post-deploy': 'cd chat-app && npm install && pm2 reload ecosystem.config.js production',
      'pre-setup': 'rm -rf /var/www/node-course/'
    }
  }
};
