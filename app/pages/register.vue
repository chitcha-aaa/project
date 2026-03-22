<template>
    <div>
        <p class="font-sarabun text-2xl font-bold pb-1">สร้างบัญชีใหม่</p>

        <div class="bg-white p-4 border border-gray-300 rounded-2xl mt-4">
          <p class="font-sarabun text-small font-bold">ข้อมูลบัญชี</p>

          <div class="flex flex-col sm:flex-row gap-4 mt-2">
            <!-- email -->
             <div class="flex flex-col w-full sm:w-1/2">
              <label for="email" class="font-bold text-gray-500 font-sarabun text-[13px] mb-1">อีเมล</label>
              <input type="email" id="email" class="w-full h-10 border px-3 py-2 border-gray-300 rounded-xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
             </div>

            <!-- username -->
             <div class="flex flex-col w-full sm:w-1/2">
              <label for="username" class="font-bold text-gray-500 font-sarabun text-[13px] mb-1">ชื่อผู้ใช้</label>
              <input type="text" id="username" class="w-full h-10 border px-3 py-2 border-gray-300 rounded-xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
             </div>
          </div>

          <!-- password -->
          <div class="font-sarabun mt-2">
            <label for="password" class="text-[13px] font-bold text-gray-500">รหัสผ่าน</label>
            <!-- ช่องใส่รหัสผ่าน -->
            <input for="text" id="password" class="w-full h-10 border px-3 py-2 border-gray-300 rounded-xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"> 
          </div>

          <div class="font-sarabun mt-2">
            <label for="password" class="text-[13px] font-bold text-gray-500">ยืนยันรหัสผ่าน</label>
            <!-- ช่องใส่รหัสผ่าน -->
            <input for="text" id="password" class="w-full h-10 border px-3 py-2 border-gray-300 rounded-xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"> 
          </div>
          </div>
        </div>
</template>


<script setup lang="ts">
definePageMeta({
  layout: 'log-regis'
})
</script>
