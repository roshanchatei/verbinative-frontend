module.exports = {
  apps : [{
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
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
      'post-deploy': 'next build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
