<template>
  <!--
    layouts/sidebar.vue — Layout สำหรับ Dashboard ของ Admin และ Reviewer
    ─────────────────────────────────────────────────────────────────────
    โครงสร้าง: AppSidebar (ซ้าย) | เนื้อหาหลัก (ขวา, scroll ได้)
    ใช้กับ: admin/home, reviewer/home
    set ใน script: definePageMeta({ layout: 'sidebar' })
  -->
  <div class="flex h-screen overflow-hidden font-sarabun bg-gray-50">

    <!-- ─── Sidebar (ซ้าย, ความกว้างคงที่) ─────────────────────────────── -->
    <AppSidebar />

    <!-- ─── Main Content (ขวา, scroll ได้, ยืดเต็มพื้นที่ที่เหลือ) ──────── -->
    <main class="flex-1 overflow-y-auto">
      <slot />
    </main>

  </div>
</template>
