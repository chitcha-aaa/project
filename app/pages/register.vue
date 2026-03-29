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
          <input for="text" id="password" type="password" v-model="form.password" required
            class="w-full h-10 border px-3 py-2 border-gray-300 rounded-xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
        </div>

        <!-- password_submit -->
        <div class="font-sarabun mt-3">
          <label for="password" class="block text-[13px] font-bold text-gray-500 mb-1">ยืนยันรหัสผ่าน</label>
          <!-- ช่องใส่รหัสผ่าน -->
          <input for="text" id="password_submit" type="password" v-model="form.password_submit" required
            class="w-full h-10 border px-3 py-2 border-gray-300 rounded-xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
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

const handle_register = async () => {
  if (form.value.password !== form.value.password_submit) {
    alert('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกันครับ!')
    return
  }
}
</script>
