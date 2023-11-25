


export default {
    schema: './schema.js',
    out: './drizzle/migrations',
    driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
    dbCredentials: {
        host: 'localhost',
        user: 'postgres',
        password: '123456',
        database: 'drizzel',
    },
} 