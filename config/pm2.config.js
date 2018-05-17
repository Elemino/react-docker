const config = require('../package');

module.exports = {
    name: config.name,
    script: 'index.mjs',
    exec_mode: 'cluster',
    node_args: '--harmony --trace-deprecation --experimental-modules --max_old_space_size=512',
    args: '--color',
    max_memory_restart: '512M',
    max_restarts: 3,
    restart_delay: 3000,
    min_uptime: 3000,
    log_file: 'logs/output.log',
    log_type: 'json',
    watch: ['package.json', 'index.mjs', 'config/', 'api/', 'models/'],
    env_development: {
        NODE_ENV: 'development',
    },
    env_staging: {
        NODE_ENV: 'staging',
    },
    env_production: {
        NODE_ENV: 'production',
    }
};