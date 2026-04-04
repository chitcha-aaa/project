export default defineNuxtRouteMiddleware(async (to, from) => {
  // รันเฉพาะฝั่ง Client เท่านั้น
  if (process.server) return

  const supabase = useSupabaseClient()

  // ดึง session ปัจจุบัน
  const { data: { session } } = await supabase.auth.getSession()

  // ถ้ายังไม่ได้ login และพยายามเข้าหน้า protected → ไปหน้า login
  const protectedPrefixes = ['/admin', '/author', '/reviewer']
  const isProtected = protectedPrefixes.some(prefix => to.path.startsWith(prefix))

  if (!session && isProtected) {
    return navigateTo('/login')
  }

  // ถ้า Login แล้ว → อนุญาตให้เข้าทุกหน้าได้อิสระ (รวมถึงหน้า login เพื่อ demo)
  // การ redirect ตาม role จะเกิดจาก login.vue เท่านั้น (ไม่บังคับที่นี่)
})
