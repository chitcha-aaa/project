<template>
  <div class="min-h-screen bg-white font-sarabun">

    <!-- Navbar -->
    <nav class="w-full bg-[#E8E8E8] px-6 py-3 flex items-center justify-between shadow-sm">
      <span class="text-sm font-bold text-gray-800 tracking-wide">
        งาน BRICC การประกวดโครงงานวิจัย
        <span class="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">Author</span>
      </span>

      <button
        @click="handleLogout"
        :disabled="isLoading"
        class="bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer disabled:opacity-50 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        {{ isLoading ? 'กำลังออกจากระบบ...' : 'ออกจากระบบ' }}
      </button>
    </nav>

    <!-- Page content -->
    <div class="p-8">
      <h1 class="font-sarabun text-3xl font-bold text-gray-800">แดชบอร์ดผู้แต่ง (Author)</h1>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const supabase = useSupabaseClient()
const isLoading = ref(false)

const handleLogout = async () => {
  isLoading.value = true
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout error:', error)
      alert('ล้มเหลวในการออกจากระบบ โปรดลองอีกครั้ง')
      return
    }
    // ออกจากระบบสำเร็จ → กลับหน้าแรก
    window.location.href = '/'
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>