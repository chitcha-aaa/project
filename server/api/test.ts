import { pool } from '../utils/db'

export default defineEventHandler(async (event) => {
  try {
    // ดึงข้อมูลจากฐานข้อมูล โดยสมมติว่าตารางชื่อ users
    const result = await pool.query('SELECT id, email, firstname, lastname FROM users ORDER BY id ASC')
    return result.rows
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database error',
      message: err.message,
    })
  }
})
