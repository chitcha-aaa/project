<template>
  <!--
    layout/setup.vue — Layout สำหรับหน้ากรอกข้อมูลโปรไฟล์
    ─────────────────────────────────────────────────────
    หน้าตา: Header เล็กๆ (ไม่มีเมนู) + Warning badge + เนื้อหากลางจอ
    ใช้กับ: author/setup, reviewer/setup, admin/setup
    set ใน script: definePageMeta({ layout: 'setup' })
  -->
  <div class="min-h-screen font-sarabun" style="background: linear-gradient(135deg, #f8fafc 0%, #fffbeb 100%);">

    <!-- ─── Minimal Header (ไม่มีเมนูใดๆ) ─────────────────────────────────── -->
    <header class="w-full bg-white border-b border-gray-100 px-6 h-16 flex items-center shadow-sm">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <span class="font-bold text-2xl text-gray-900 tracking-tight">BRICC</span>
        <span class="text-xs text-gray-400 font-medium">(ครั้งที่ 12)</span>
        <span class="hidden sm:inline text-gray-300 mx-2">|</span>
        <span class="hidden sm:inline text-sm text-gray-500">มหาวิทยาลัยราชภัฏบุรีรัมย์</span>
      </div>

      <!-- Warning badge (ฝั่งขวา) -->
      <div class="ml-auto">
        <span class="inline-flex items-center gap-1.5 text-xs text-amber-700 font-semibold
                     bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          กรุณากรอกข้อมูลให้ครบก่อนใช้งานระบบ
        </span>
      </div>
    </header>

    <!-- ─── Content Area ─────────────────────────────────────────────────── -->
    <main class="flex flex-col items-center py-10 px-4 min-h-[calc(100vh-4rem)]">
      <slot />
    </main>

  </div>
</template>
