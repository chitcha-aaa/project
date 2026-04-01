import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  try {
    // 1. รับค่าที่ส่งมาจากอิมพุต
    const body = await readBody(event)
    const userEmail = body.email

    if (!userEmail) {
      return { success: false, message: 'กรุณาระบุอีเมล', otpDebug: undefined }
    }

    // 2. สุ่มรหัส OTP 6 หลัก
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()

    // 3. ตั้งค่าบัญชีอีเมลที่จะใช้ส่งออก (สมมติว่าเป็น Gmail)
    // ตรงนี้นำอีเมลและ App Password มาใส่แทนที่ได้เลย (หรือใช้จากไฟล์ .env)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NAME_APP, // ⚠️ เปลี่ยนเป็นอีเมล Gmail ของคุณ
        pass: process.env.PASS_APP     // ⚠️ เปลี่ยนเป็น App Password 16 ตัวอักษร
      }
    })

    // 4. ตั้งค่าหัวข้อ และ หน้าตาของอีเมล
    const mailOptions = {
      from: `"BRICC"`, // เชื่อมกับอีเมลด้านบน
      to: userEmail,
      subject: 'รหัส OTP สำหรับลงทะเบียนงาน BRICC',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap');
          </style>
        </head>
        <body>
          <div style="font-family: 'Sarabun', Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #333;">ยืนยันการลงทะเบียนของคุณ</h2>
            <p>สวัสดีครับ/ค่ะ,</p>
            <p>ขอบคุณที่สมัครสมาชิกกับเรา นี่คือรหัส OTP ของคุณ:</p>
            <div style="text-align: center; margin: 30px 0;">
              <b style="font-size: 32px; color: #4F46E5; letter-spacing: 5px;">${otpCode}</b>
            </div>
            <p>โปรดนำรหัสนี้ไปกรอกในหน้าเว็บเพื่อยืนยันบัญชีของคุณ รหัสผ่านจะหมดอายุภายใน 2 นาที</p>
            <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;">
            <p style="font-size: 12px; color: #999;">หากคุณไม่ได้ลงทะเบียน กรุณาเพิกเฉยต่ออีเมลฉบับนี้</p>
          </div>
        </body>
        </html>
      `
    }

    // 5. ทำการส่งอีเมล!
    await transporter.sendMail(mailOptions)

    // TODO: (จุดที่จะต้องเพิ่มเติมในอนาคต) 
    // คุณควรบันทึกรหัส otpCode นี้ลง Database ผูกติดกับอีเมล เพื่อเอาไว้รอเทียบยืนยัน
    console.log('[DEBUG] ส่ง OTP:', otpCode, 'ไปยังอีเมล:', userEmail)

    // 6. ส่งผลลัพธ์กลับไปให้ฝั่งเว็บว่าส่งเสร็จสิ้นแล้ว
    return { 
      success: true, 
      message: 'ส่งรหัส OTP สำเร็จแล้ว กรุณาเช็คอินบ็อกซ์หรือโฟลเดอร์จดหมายขยะ',
      otpDebug: otpCode // (ชั่วคราว) คืนค่า OTP ให้ Frontend เอาไปตรวจสอบ (ในระบบจริงควรเก็บ Database)
    }

  } catch (error) {
    console.error('Email error:', error)
    return { success: false, message: 'เกิดข้อผิดพลาดในการส่งอีเมล กรุณาลองใหม่', otpDebug: undefined }
  }
})
