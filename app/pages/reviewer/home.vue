<template>
  <!-- ใช้ layout 'sidebar' → AppSidebar (ซ้าย) + เนื้อหา (ขวา) -->
  <div class="p-8 font-sarabun">

    <!-- Welcome -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">
        สวัสดี, <span class="text-green-600">{{ displayName || 'ผู้ตรวจสอบ' }}</span> 👋
      </h1>
      <p class="text-gray-500 mt-1 text-sm">ยินดีต้อนรับ — ตรวจสอบบทความที่ได้รับมอบหมายได้ที่นี่</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">0</p>
            <p class="text-xs text-gray-500">บทความรอตรวจ</p>
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
            <p class="text-xs text-gray-500">ตรวจแล้ว</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">0%</p>
            <p class="text-xs text-gray-500">อัตราการตรวจ</p>
          </div>
        </div>
      </div>
    </div>

    <!-- บทความรอตรวจ -->
    <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <h2 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
        บทความที่รอการตรวจสอบ
      </h2>
      <div class="text-center py-10 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-sm">ยังไม่มีบทความที่ได้รับมอบหมาย</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
// layout 'sidebar' → AppSidebar จะโหลดอัตโนมัติ (layouts/sidebar.vue)
definePageMeta({ layout: 'sidebar' })

const { displayName, fetchProfile } = useUserProfile()

onMounted(() => {
  fetchProfile()
})
</script>