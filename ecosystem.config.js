module.exports = {
  apps: [
    {
      name: 'work-experience-site',
      script: 'npm',
      args: 'start',
      instances: 'max', // Or a specific number of instances
      exec_mode: 'cluster', // Use cluster mode for better performance
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
