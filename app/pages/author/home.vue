<template>
  <div class="min-h-screen bg-gray-50 font-sarabun">

    <!-- Navbar (จัดการ auth state อัตโนมัติ) -->
    <Navbar />

    <!-- ─── Page Content ──────────────────────────────────────────────────── -->
    <main class="max-w-5xl mx-auto px-6 py-8">

      <!-- Welcome -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">
          สวัสดี, <span class="text-blue-600">{{ displayName || 'ผู้แต่ง' }}</span> 👋
        </h1>
        <p class="text-gray-500 mt-1 text-sm">ยินดีต้อนรับสู่ระบบ BRICC — ส่งบทความและติดตามสถานะได้ที่นี่</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">0</p>
              <p class="text-xs text-gray-500">บทความที่ส่งแล้ว</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">0</p>
              <p class="text-xs text-gray-500">รอการตรวจสอบ</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">0</p>
              <p class="text-xs text-gray-500">ได้รับการอนุมัติ</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Action -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white mb-6">
        <h2 class="font-bold text-lg mb-1">📄 ส่งบทความใหม่</h2>
        <p class="text-blue-100 text-sm mb-4">เริ่มส่งบทความของคุณสำหรับงาน BRICC ครั้งที่ 12</p>
        <button class="bg-white text-blue-600 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
          + ส่งบทความ
        </button>
      </div>

      <!-- Recent Articles (placeholder) -->
      <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 class="font-bold text-gray-800 mb-4">บทความล่าสุดของฉัน</h2>
        <div class="text-center py-10 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-sm">ยังไม่มีบทความ — เริ่มส่งบทความแรกของคุณได้เลย!</p>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
// ใช้ layout: false เพราะ Navbar อยู่ใน template โดยตรง
definePageMeta({ layout: false })

const { displayName, fetchProfile } = useUserProfile()

onMounted(() => {
  fetchProfile()
})
</script>