module.exports = {
  apps: [{
    name: 'qmulus',
    script: 'bin/prod',
    instances: 1,
    increment_var: 'PORT',
    exec_mode: 'fork',

    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    interpreter_args: '-r esm',

    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
  }],

  deploy: {
    production: {
      user: 'deploy',
      host: ['167.172.205.165'],
      ref: 'origin/master',
      repo: 'git@github.com:queens-qmulus/qmulus.git',
      path: '/home/deploy/qmulus',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js',
    },
  },
}
