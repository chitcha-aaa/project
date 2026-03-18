<template>
    <div class="h-screen w-screen flex">
        <!-- left -->
        <div class="bg-gradient-to-t from-black to-yellow-500 w-1/2 h-full">

        </div>
        <!-- right -->
        <div class="bg-white w-1/2 h-full flex pt-10 px-10">
            <div class="w-full pt-2">
                <p class="font-sarabun text-2xl font-bold pb-1">ยินดีต้อนรับ</p>
                <p class="font-sarabun font-bold text-gray-400 pb-2">เข้าสู่ระบบเพื่อจัดการบทความของคุณ</p>

                <!-- Form Setup -->
                <form @submit.prevent="handleLogin">
                    <!-- Username / Email -->
                    <label for="username" class="font-bold ">Username / Email</label>
                    <input type="text" id="username" placeholder="กรอกชื่อผู้ใช้หรืออีเมล" v-model="form.username" required
                        class="w-full h-10 border px-2 py-2 mt-1 border-gray-300 rounded-2xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 mb-4">

                    <!-- Password -->
                    <label for="password" class="font-bold">Password</label>
                    <input type="password" id="password" placeholder="กรอกรหัสผ่าน" v-model="form.password" required
                        class="w-full h-10 border px-2 py-2 mt-1 border-gray-300 rounded-2xl font-sarabun text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-1">

                    <!-- Forgot password -->
                    <div class="mb-4">
                        <a href="#" class="font-sarabun text-[10px] font-bold text-[#8B6D00] hover:underline ">ลืมรหัสผ่าน?</a>
                    </div>

                    <!-- Login button -->
                    <button type="submit"
                        class="bg-[#1A1A1A] text-white p-3 w-full rounded-3xl font-sarabun font-bold hover:bg-[#404040] cursor-pointer transition-colors duration-300 ease-in-out">
                        เข้าสู่ระบบ
                    </button>
                </form>

                <div class="flex items-center mt-5">
                    <div class="flex-grow border-t border-gray-300"></div>
                    <span class="flex-shrink mx-4 text-gray-600 font-bold font-sarabun text-sm">หรือ
                        เข้าสู่ระบบด้วย</span>
                    <div class="flex-grow border-t border-gray-300"></div>
                </div>

                <!-- Others login -->
                <div class="flex justify-center items-center gap-4 mt-4 mb-8 w-full ">
                    <Icon name="uil:facebook" class="text-[40px] text-black hover:text-blue-600 hover:scale-110 transition-all duration-300 cursor-pointer" />
                    <Icon name="uil:google" class="text-[40px] text-black hover:text-red-600 hover:scale-110 transition-all duration-300 cursor-pointer" />
                </div>

                <!-- Register -->
                <span class="font-sarabun text-sm">ยังไม่มีบัญชีใช่ไหม? <a href="#" class="font-bold text-[#8B6D00] hover:underline">ลงทะเบียนที่นี่</a></span> <br>

                <!-- Help center -->
                <span class="font-sarabun text-sm">ต้องการความช่วยเหลือ? <a href="#" class="font-bold text-[#8B6D00] hover:underline">Help Center</a></span>
            </div>
        </div>
    </div>
</template> 

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  username: '',
  password: ''
})

const handleLogin = async () => {
  // ตรงนี้คือจุดที่เราจะส่งข้อมูลไปหา Database/API ครับ
  console.log('ลองดูข้อมูลที่พร้อมส่ง:', form.value)
  
  alert('กำลังส่งข้อมูลเข้าระบบ: ' + form.value.username)

  // ตัวอย่างการใช้ fetch ยิงไปหา API (ใช้ $fetch ของ Nuxt)
  /*
  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: form.value
    })
    
    if (response.success) {
      console.log('ล็อกอินสำเร็จ!')
      // navigateTo('/dashboard')
    }
  } catch (error) {
    console.error('เข้าสู่ระบบล้มเหลว', error)
  }
  */
}
</script>