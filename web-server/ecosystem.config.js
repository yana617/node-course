module.exports = {
  apps: [{
    script: 'src/app.js',
    watch: './web-server'
  }],

  deploy: {
    production: {
      user: 'root',
      host: '167.71.63.10',
      ref: 'origin/master',
      repo: 'git@github.com:yana617/node-course.git',
      path: '/var/www/node-course',
      'pre-deploy-local': '',
      'post-deploy': 'cd web-server && npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'rm -rf /var/www/node-course/'
    }
  }
};
