module.exports = {
  apps: [
    {
      name: 'yiyanxing',
      script: './server/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      }
    }
  ],
};
