import { serverSupabaseServiceRole } from '#supabase/server'
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email } = body

  if (!email) {
    throw createError({ statusCode: 400, message: 'กรุณาระบุ email' })
  }

  // ✅ ใช้เฉพาะ service role เท่านั้น ไม่แตะ session ของ admin เลย
  const client = serverSupabaseServiceRole(event)

  // ── ตรวจสอบว่า email มีในระบบแล้วหรือยัง ──
  const { data: usersData, error: listError } = await client.auth.admin.listUsers()
  if (listError) {
    throw createError({ statusCode: 500, message: `Service key ผิดพลาด: ${listError.message}` })
  }

  const existingUser = usersData?.users?.find(u => u.email === email)

  // สร้าง temp password แบบ random
  const tempPassword = Math.random().toString(36).slice(2, 8).toUpperCase() +
    Math.random().toString(36).slice(2, 5) + '@9'

  let targetUserId: string

  if (existingUser) {
    // มีอยู่แล้ว → อัปเดต password เป็น temp password ใหม่
    targetUserId = existingUser.id
    await client.auth.admin.updateUserById(targetUserId, {
      password: tempPassword,
      user_metadata: { role: 'reviewer' }
    })
  } else {
    // สร้าง reviewer account ใหม่พร้อม temp password
    const { data: newUserData, error: createErr } = await client.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { role: 'reviewer' }
    })
    if (createErr) {
      throw createError({ statusCode: 400, message: createErr.message })
    }
    targetUserId = newUserData.user.id
  }

  // บันทึก role ใน profiles table
  await client.from('profiles').upsert({ id: targetUserId, role: 'reviewer' } as any)

  // ── ส่งอีเมลด้วย Nodemailer พร้อม temp password ──
  const setupUrl = `${process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reviewer/setup`

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NAME_APP,
      pass: process.env.PASS_APP,
    }
  })

  await transporter.sendMail({
    from: `"ระบบ BRICC" <${process.env.NAME_APP}>`,
    to: email,
    subject: 'คำเชิญเข้าร่วมระบบในฐานะ Reviewer',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
        <h2 style="color:#166534;">ยินดีต้อนรับสู่ระบบ BRICC</h2>
        <p>คุณได้รับเชิญให้เข้าร่วมในฐานะ <strong>Reviewer</strong></p>
        <p>กรุณาใช้ข้อมูลด้านล่างเพื่อตั้งรหัสผ่านของคุณ:</p>
        <table style="background:#f3f4f6;padding:16px;border-radius:8px;width:100%;margin:16px 0;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 8px;color:#374151;font-weight:bold;">อีเมล:</td>
            <td style="padding:6px 8px;">${email}</td>
          </tr>
          <tr>
            <td style="padding:6px 8px;color:#374151;font-weight:bold;">รหัสผ่านชั่วคราว:</td>
            <td style="padding:6px 8px;font-family:monospace;font-size:18px;color:#1d4ed8;font-weight:bold;">${tempPassword}</td>
          </tr>
        </table>
        <p>กดปุ่มด้านล่างเพื่อไปตั้งรหัสผ่านใหม่:</p>
        <a href="${setupUrl}"
           style="display:inline-block;padding:12px 24px;background:#16a34a;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;">
          ตั้งรหัสผ่านและเข้าสู่ระบบ
        </a>
        <p style="margin-top:20px;color:#6b7280;font-size:12px;">
          กรุณาอย่าแชร์รหัสผ่านชั่วคราวนี้กับผู้อื่น
        </p>
      </div>
    `
  })

  return { success: true, message: `ส่งคำเชิญไปยัง ${email} เรียบร้อยแล้ว` }
})
