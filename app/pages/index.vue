<template>
  <div class="min-h-screen bg-white font-sarabun">

    <!-- Navbar -->
    <nav class="w-full bg-[#E8E8E8] px-6 py-3 flex items-center justify-between shadow-sm">
      <!-- Left: Site name -->
      <span class="text-sm font-bold text-gray-800 tracking-wide">
        งาน BRICC การประกวดโครงงานวิจัย
      </span>

      <!-- Right: ถ้า login แล้วแสดงปุ่มไปหน้า Dashboard, ถ้ายังไม่ login แสดงปุ่มเข้าสู่ระบบ -->
      <NuxtLink
        v-if="dashboardPath"
        :to="dashboardPath"
        class="bg-[#1A1A1A] hover:bg-[#404040] text-white font-bold text-sm px-5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer"
      >
        ไปที่ Dashboard
      </NuxtLink>
      <NuxtLink
        v-else
        to="/login"
        class="bg-[#D1D1D1] hover:bg-[#BDBDBD] text-gray-800 font-bold text-sm px-5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer"
      >
        เข้าสู่ระบบ
      </NuxtLink>
    </nav>

    <!-- Page content -->
    <div class="p-8">
      <!-- เนื้อหาหน้าหลักใส่ที่นี่ -->
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const supabase = useSupabaseClient()
const dashboardPath = ref<string | null>(null)

// ตรวจสอบ session ตอนที่ component mount บน client
onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return

  // ดึง role จาก user_metadata หรือ profiles table
  let roleStr = session.user.user_metadata?.role
  if (!roleStr) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single() as { data: { role: string } | null }
    roleStr = profile?.role
  }

  const role = roleStr?.toLowerCase()?.trim() || ''
  if (role === 'admin') dashboardPath.value = '/admin/home'
  else if (role === 'reviewer') dashboardPath.value = '/reviewer/home'
  else if (role === 'author') dashboardPath.value = '/author/home'
})
</script>