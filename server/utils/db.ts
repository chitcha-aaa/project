import pkg from 'pg'

const {Pool} = pkg;

export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
});

pool.on('connect', () => {
    console.log('Pool client connected')
});

pool.on('error', (err) => {
    console.log('Pool client error', err)
});

pool.query('SELECT NOW()')
    .then((res) => {
        console.log('✅ เชื่อมต่อฐานข้อมูลสำเร็จ! เวลาที่ DB:', res.rows[0].now);
    })
    .catch((err) => {
        console.log('❌ ไม่สามารถเชื่อมต่อฐานข้อมูลได้ กรุณาเช็ค .env:', err.message);
    });