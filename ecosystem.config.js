const QMULUS_CA_01 = '68.183.192.147'

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
      host: [QMULUS_CA_01],
      ref: 'origin/master',
      repo: 'git@github.com:queens-qmulus/qmulus.git',
      ssh_options: 'StrictHostKeyChecking=no',
      path: '/home/deploy/qmulus',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js',
    },
  },
}
