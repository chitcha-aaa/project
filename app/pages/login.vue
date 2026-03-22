<template>
  <p class="font-sarabun text-2xl font-bold pb-1">ยินดีต้อนรับ</p>
  <p class="font-sarabun font-bold text-gray-400 pb-2">เข้าสู่ระบบเพื่อจัดการบทความของคุณ</p>

  <!-- Username / Email -->
  <label for="username" class="font-bold ">Username / Email</label>
  <input type="text" id="username" placeholder="กรอกชื่อผู้ใช้หรืออีเมล"
    class="w-full h-10 border px-2 py-2 mt-1 border-gray-300 rounded-2xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 mb-4">

  <!-- Password -->
  <label for="password" class="font-bold">Password</label>
  <input type="password" id="password" placeholder="กรอกรหัสผ่าน"
    class="w-full h-10 border px-2 py-2 mt-1 border-gray-300 rounded-2xl font-sarabun text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-1">

  <!-- Forgot password -->
  <div class="mb-4">
    <a href="#" class="font-sarabun text-[10px] font-bold text-[#8B6D00] hover:underline ">ลืมรหัสผ่าน?</a>
  </div>

  <!-- Login button -->
  <button
    class="bg-[#1A1A1A] text-white p-3 w-full rounded-3xl font-sarabun font-bold hover:bg-[#404040] cursor-pointer transition-colors duration-300 ease-in-out">
    เข้าสู่ระบบ
  </button>

  <div class="flex items-center mt-5">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="flex-shrink mx-4 text-gray-600 font-bold font-sarabun text-sm">หรือ
      เข้าสู่ระบบด้วย</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <!-- Others login -->
  <div class="flex justify-center items-center gap-4 mt-4 mb-8 w-full ">
    <Icon name="uil:facebook"
      class="text-[40px] text-black hover:text-blue-600 hover:scale-110 transition-all duration-300 cursor-pointer" />
    <Icon name="uil:google"
      class="text-[40px] text-black hover:text-red-600 hover:scale-110 transition-all duration-300 cursor-pointer" />
  </div>

  <!-- Register -->
  <span class="font-sarabun text-sm">ยังไม่มีบัญชีใช่ไหม? <a href="#"
      class="font-bold text-[#8B6D00] hover:underline">ลงทะเบียนที่นี่</a></span> <br>

  <!-- Help center -->
  <span class="font-sarabun text-sm">ต้องการความช่วยเหลือ? <a href="#"
      class="font-bold text-[#8B6D00] hover:underline">Help Center</a></span>

</template>

<script setup lang="ts">
definePageMeta({
  layout: 'log-regis'
})
</script>