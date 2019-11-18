const HOSTS = (process.env.PM2_HOSTS || '').split(',').map(h => h.trim()) || []
const HOST_IPS = HOSTS.map(h => process.env[h])

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
      host: HOST_IPS,
      ref: 'origin/master',
      repo: 'git@github.com:queens-qmulus/qmulus.git',
      ssh_options: 'StrictHostKeyChecking=no',
      path: '/home/deploy/qmulus',
      'pre-deploy': 'git reset --hard',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js',
    },
  },
}
