require('dotenv').config()

const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.POSTGRES_USER || process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB,
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}
