module.exports = {
    apps: [
      {
        name: 'arc-ui',
        script: 'npm',
        args: 'start',
        env: {
            ENVIRONMENT: 'localhost'
        },
        env_dev: {
            ENVIRONMENT: 'development'
        },
        env_testing: {
          ENVIRONMENT: 'testing'
        },
        env_prod: {
            ENVIRONMENT: 'production'
        },
      }
    ]
}