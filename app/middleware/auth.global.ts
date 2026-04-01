export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser()
  const publicRoutes = ['/', '/login', '/register']

  // 1. ถ้ายังไม่ได้ Login และพยายามเข้าหน้าอื่นที่ไม่ใช่ Public Routes ให้เตะไปหน้าแรก
  if (!user.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  // 2. ถ้า Login แล้ว ให้เช็คสิทธิ์ (Role)
  if (user.value) {
    // ดึงค่า role จากระบบ (เช็คใน Meta Data ของตอนสมัครก่อน เพื่อความรวดเร็วและแก้ปัญหาช่วงโหลดหน้าแรก)
    let roleStr = user.value.user_metadata?.role
    
    // ถ้าในระบบไม่มี ค่อยพึ่งพาการดึงจากฐานข้อมูล Profiles (เป็นแผนสำรอง)
    if (!roleStr) {
      const supabase = useSupabaseClient()
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.value.id)
        .single() as { data: { role: string } | null }
      roleStr = profile?.role
    }

    const role = roleStr?.toLowerCase()?.trim() || ''

    // 3. ป้องกันการเข้าผิดหน้า (Role-based Protection)
    if (to.path.startsWith('/admin') && role !== 'admin') {
      return navigateTo(role === 'author' ? '/author/home' : role === 'reviewer' ? '/reviewer/home' : '/')
    }
    
    if (to.path.startsWith('/author') && role !== 'author') {
      return navigateTo(role === 'admin' ? '/admin/home' : role === 'reviewer' ? '/reviewer/home' : '/')
    }

    if (to.path.startsWith('/reviewer') && role !== 'reviewer') {
      return navigateTo(role === 'admin' ? '/admin/home' : role === 'author' ? '/author/home' : '/')
    }

    // 4. ถ้าคนเข้าสู่ระบบแล้ว พยายามเข้าหน้าล็อกอินหรือสมัครสมาชิก ให้เตะไปหน้า Dashboard ของตนเอง (แต่อนุญาตให้เล่นหน้าแรก / ได้)
    if (to.path === '/login' || to.path === '/register') {
       if (role === 'admin') return navigateTo('/admin/home')
       if (role === 'reviewer') return navigateTo('/reviewer/home')
       if (role === 'author') return navigateTo('/author/home')
    }
  }
})
