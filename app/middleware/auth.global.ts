export default defineNuxtRouteMiddleware(async (to, from) => {
  // รันเฉพาะฝั่ง Client เท่านั้น (SSR ไม่มี session)
  if (process.server) return

  const supabase = useSupabaseClient()

  // ดึง session ปัจจุบัน
  const { data: { session } } = await supabase.auth.getSession()

  // ─── Protected Routes: หน้าที่ต้อง login ก่อนถึงเข้าได้ ─────────────────
  const protectedPrefixes = ['/admin', '/author', '/reviewer']
  const isProtected = protectedPrefixes.some(prefix => to.path.startsWith(prefix))

  // หน้า setup ต้อง "whitelist" ไว้ ไม่งั้น redirect วนไม่หยุด
  // (/author/setup, /reviewer/setup, /admin/setup)
  const isSetupPage = to.path.endsWith('/setup')

  // ─── กรณีที่ 1: ยังไม่ login + เป็น protected route ────────────────────
  if (!session && isProtected) {
    return navigateTo('/login')
  }

  // ─── กรณีที่ 2: Login แล้ว → เช็ค is_profile_complete ──────────────────
  if (session && isProtected) {
    const { data: profile }: any = await supabase
      .from('profiles')
      .select('role, is_profile_complete')
      .eq('id', session.user.id)
      .single()

    const role = (profile?.role || '').toLowerCase()
    const isComplete = profile?.is_profile_complete === true

    // profile ยังไม่ครบ + ไม่ได้อยู่ที่หน้า setup → บังคับไปกรอกข้อมูล
    // (ซ่อนเมนูทั้งหมดโดย layout=setup)
    if (!isComplete && !isSetupPage) {
      if (role === 'admin')    return navigateTo('/admin/setup')
      if (role === 'reviewer') return navigateTo('/reviewer/setup')
      if (role === 'author')   return navigateTo('/author/setup')
    }

    // หมายเหตุ: ถ้า profile ครบแล้ว → เข้า setup ได้ (ใช้เป็น "แก้ไขโปรไฟล์")
    // ไม่ต้อง redirect กลับ home เพราะเราอยากให้ส่วน setup ทำงานเป็น profile editor ได้ด้วย
  }
})
