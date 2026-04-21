/**
 * useUserProfile — Composable สำหรับดึงและจัดการข้อมูล User Profile
 *
 * ใช้ useState ของ Nuxt เพื่อให้ทุก Component แชร์ state เดียวกัน
 * → Navbar.vue และ AppSidebar.vue ใช้ร่วมกันได้โดยไม่ต้อง fetch ซ้ำ
 *
 * ⚠️  ไฟล์นี้สำคัญมาก: ต้องใช้ใน Navbar และ AppSidebar ทุกครั้ง
 */

// กำหนด type ของ Profile (ตรงกับ columns ใน Supabase)
// ⚠️ หมายเหตุ: ใช้ lastname_th (สมมติว่า rename column จาก lastnamr_th แล้ว)
type Profile = {
  firstname_th: string | null
  lastname_th: string | null
  firstname_eng: string | null
  lastname_eng: string | null
  role: string
  is_profile_complete: boolean
}

export const useUserProfile = () => {
  // useSupabaseClient() — ดึง Supabase client (จาก @nuxtjs/supabase)
  const supabase = useSupabaseClient()
  // useSupabaseUser() — reactive ref ของ user ปัจจุบัน (null ถ้ายัง login ยัง)
  const user = useSupabaseUser()

  // ─── useState: แชร์ state ข้าม Component ────────────────────────────────
  // useState ต่างจาก ref ตรงที่ state นี้เป็น "global" ภายใน Nuxt app
  // ทุก Component ที่ใช้ useUserProfile() จะได้ข้อมูลชุดเดียวกัน
  const profile = useState<Profile | null>('userProfile', () => null)
  const isLoadingProfile = useState<boolean>('profileLoading', () => false)

  // ─── Computed Properties ─────────────────────────────────────────────────

  // ชื่อที่แสดงใน Navbar/Sidebar
  // ลำดับ: ชื่อไทย → ชื่ออังกฤษ → email
  const displayName = computed(() => {
    if (!profile.value) return user.value?.email || ''
    const first = profile.value.firstname_th || profile.value.firstname_eng || ''
    const last  = profile.value.lastname_th  || profile.value.lastname_eng  || ''
    return `${first} ${last}`.trim() || user.value?.email || ''
  })

  // ตัวย่อสำหรับ avatar (อักษรแรกของชื่อ)
  const avatarInitial = computed(() => {
    const name = displayName.value
    return name ? name.charAt(0).toUpperCase() : '?'
  })

  // เช็คว่า login แล้วหรือยัง
  const isLoggedIn = computed(() => !!user.value)

  // เช็คว่ากรอกโปรไฟล์ครบแล้วหรือยัง
  const isProfileComplete = computed(() => profile.value?.is_profile_complete === true)

  // role ของ user ปัจจุบัน (lowercase)
  const userRole = computed(() => (profile.value?.role || '').toLowerCase())

  // ─── Functions ───────────────────────────────────────────────────────────

  /**
   * ดึงข้อมูล profile จาก Supabase
   * เรียกใน onMounted() ของ Navbar และ AppSidebar
   */
  const fetchProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }
    // ป้องกัน fetch ซ้ำถ้ากำลัง loading อยู่
    if (isLoadingProfile.value) return

    isLoadingProfile.value = true
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('firstname_th, lastname_th, firstname_eng, lastname_eng, role, is_profile_complete')
        .eq('id', user.value.id)
        .single()

      if (!error && data) {
        profile.value = data as Profile
      }
    } catch (e) {
      console.error('useUserProfile: fetchProfile error', e)
    } finally {
      isLoadingProfile.value = false
    }
  }

  /**
   * ออกจากระบบ: Sign out + ล้าง profile state + กลับหน้าแรก
   */
  const logout = async () => {
    try {
      await supabase.auth.signOut()
      profile.value = null
    } catch (e) {
      console.error('logout error', e)
    } finally {
      window.location.href = '/'
    }
  }

  /**
   * หา path หน้า setup ของแต่ละ role
   * ใช้สำหรับ link "แก้ไขโปรไฟล์" ใน dropdown
   */
  const profileEditPath = computed(() => {
    const role = userRole.value
    if (role === 'admin')    return '/admin/setup'
    if (role === 'reviewer') return '/reviewer/setup'
    if (role === 'author')   return '/author/setup'
    return '/'
  })

  // ─── Return ──────────────────────────────────────────────────────────────
  return {
    profile,
    displayName,
    avatarInitial,
    isLoggedIn,
    isProfileComplete,
    userRole,
    profileEditPath,
    isLoadingProfile,
    fetchProfile,
    logout,
  }
}
