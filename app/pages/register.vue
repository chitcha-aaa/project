<template>
  <div>
    <p class="font-sarabun text-2xl font-bold pb-1">สร้างบัญชีใหม่</p>
    <form @submit.prevent="handle_register">
      <div class="bg-white p-4 border border-gray-300 rounded-2xl mt-4">
        <p class="font-sarabun text-small font-bold">ข้อมูลบัญชี</p>
        <div class="flex flex-col sm:flex-row gap-4 mt-2">
          <!-- email -->
          <div class="flex flex-col w-full sm:w-1/2">
            <label for="email" class="font-bold text-gray-500 font-sarabun text-[13px] mb-1">อีเมล</label>
            <input type="text" id="email" v-model="form.email" required
              class="w-full h-10 border px-3 py-2 border-gray-300 rounded-xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
          </div>

          <!-- username -->
          <div class="flex flex-col w-full sm:w-1/2">
            <label for="username" class="font-bold text-gray-500 font-sarabun text-[13px] mb-1">ชื่อผู้ใช้</label>
            <input type="text" id="username" v-model="form.username" required
              class="w-full h-10 border px-3 py-2 border-gray-300 rounded-xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>

        <!-- password -->
        <div class="font-sarabun mt-3">
          <label for="password" class="block text-[13px] font-bold text-gray-500 mb-1">รหัสผ่าน</label>
          <!-- ช่องใส่รหัสผ่าน -->
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.password" required
              class="w-full h-10 border px-3 py-2 border-gray-300 rounded-xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-10">
            <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- password_submit -->
        <div class="font-sarabun mt-3">
          <label for="password_submit" class="block text-[13px] font-bold text-gray-500 mb-1">ยืนยันรหัสผ่าน</label>
          <!-- ช่องใส่รหัสผ่าน -->
          <div class="relative">
            <input :type="showPasswordSubmit ? 'text' : 'password'" id="password_submit" v-model="form.password_submit" required
              class="w-full h-10 border px-3 py-2 border-gray-300 rounded-xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-10">
            <button type="button" @click="showPasswordSubmit = !showPasswordSubmit" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
              <svg v-if="showPasswordSubmit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        <button type="submit"
          class="bg-[#1A1A1A] text-white p-3 w-full rounded-3xl font-sarabun font-bold hover:bg-[#404040] cursor-pointer transition-colors duration-300 ease-in-out mt-4">
          ลงทะเบียน
        </button>

        <div class="flex items-center mt-5">
          <div class="flex-grow border-t border-gray-300"></div>
          <span class="flex-shrink mx-4 text-gray-500 font-bold font-sarabun text-sm">หรือ สมัครด้วย</span>
          <div class="flex-grow border-t border-gray-300"></div>
        </div>

        <div class="mt-4 mb-4 w-full flex justify-center ">
          <!-- gmail -->
          <div
            class="bg-white w-1/3  p-2 flex justify-center items-center rounded-3xl cursor-pointer hover:shadow-md hover:scale-105 transition-all">
            <div class="w-12 h-[2rem]">
              <img src="../assets/images/icon_google.png" alt="" class="w-full h-full object-cover">
            </div>

            <div class="font-sarabun">
              <p>Sign up to Google</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>


<script setup lang="ts">
definePageMeta({
  layout: 'log-regis'
})


const form = ref({
  email: '',
  username: '',
  password: '',
  password_submit:''
})

const showPassword = ref(false)
const showPasswordSubmit = ref(false)

const handle_register = async () => {
  if (form.value.password !== form.value.password_submit) {
    alert('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกันครับ!')
    return
  }
}
</script>
