module.exports = {
  apps : [{
    script: 'yarn run dev',
  }],

  deploy : {
    production : {
      key: 'key.pem',
      user : 'ubuntu',
      host : '13.49.230.180',
      ref  : 'origin/main',
      repo : 'git@github.com:roshanchatei/verbinative-frontend.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy': 'yarn install && yarn build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
