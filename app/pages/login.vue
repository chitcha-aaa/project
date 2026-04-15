<template>
  <p class="font-sarabun text-2xl font-bold pb-1">ยินดีต้อนรับ</p>
  <p class="font-sarabun font-bold text-gray-400 pb-2">เข้าสู่ระบบเพื่อจัดการบทความของคุณ</p>

  <!-- Form Setup -->
  <form @submit.prevent="handleLogin">
    <!-- Username / Email -->
    <label for="username" class="font-bold ">Email</label>
    <input type="text" id="username" placeholder="กรอกชื่อผู้ใช้หรืออีเมล" v-model="form.username" required
      class="w-full h-10 border px-2 py-2 mt-1 border-gray-300 rounded-2xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 mb-4">

    <!-- Password -->
    <label for="password" class="font-bold">Password</label>
    <div class="relative mt-1 mb-1">
      <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="กรอกรหัสผ่าน" v-model="form.password" required
        class="w-full h-10 border px-3 py-2 border-gray-300 rounded-2xl font-sarabun text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10">
      <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer">
        <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>

    <!-- Forgot password -->
    <div class="mb-4">
      <a href="#" class="font-sarabun text-[10px] font-bold text-[#8B6D00] hover:underline ">ลืมรหัสผ่าน?</a>
    </div>

    <!-- Cancel button -->
    <NuxtLink to="/"
      class="block text-center bg-gray-300 p-3 w-full rounded-3xl font-sarabun font-bold text-gray-700 hover:bg-red-400 hover:text-white border-none cursor-pointer transition-colors duration-200 ease-in-out mb-3">
      ยกเลิก
    </NuxtLink>

    <!-- Login button -->
    <button type="submit" :disabled="isLoading"
      class="bg-[#1A1A1A] text-white p-3 w-full rounded-3xl font-sarabun font-bold hover:bg-[#404040] disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer transition-colors duration-200 ease-in-out">
      {{ isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}
    </button>
  </form>

  <div class="flex items-center mt-5">
    <div class="flex-grow border-t border-gray-500"></div>
    <span class="flex-shrink mx-4 text-gray-600 font-bold font-sarabun text-sm">หรือ เข้าสู่ระบบด้วย</span>
    <div class="flex-grow border-t border-gray-500"></div>
  </div>

  <!-- Others login -->
  <div class="mt-4 mb-4 w-full flex justify-center ">
    <!-- gmail -->
    <div class="bg-white w-full sm:w-auto sm:px-8 p-2 flex justify-center items-center gap-2 rounded-3xl cursor-pointer hover:shadow-md hover:scale-105 transition-all">
      <div class="w-12 h-[2rem]">
        <img src="../assets/images/icon_google.png" alt="" class="w-full h-full object-cover">
      </div>

      <div class="font-sarabun">
        <p>Sign up to Google</p>
      </div>
    </div>
  </div>

  <!-- Register -->
  <span class="font-sarabun text-sm">ยังไม่มีบัญชีใช่ไหม? <NuxtLink to="/register" 
      class="font-bold text-[#8B6D00] hover:underline">ลงทะเบียนที่นี่</NuxtLink></span> <br>

  <!-- Help center -->
  <span class="font-sarabun text-sm">ต้องการความช่วยเหลือ? <a href="#"
      class="font-bold text-[#8B6D00] hover:underline">Help Center</a></span>

  <!-- Error Modal -->
  <div v-if="showErrorModal" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-2xl w-[90%] sm:w-[400px] shadow-2xl flex flex-col items-center">
      <!-- SVG Icon Error -->
      <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      </div>
      <h2 class="font-sarabun text-xl font-bold mb-2 text-gray-800">เข้าสู่ระบบล้มเหลว</h2>
      <p class="font-sarabun text-sm text-gray-500 mb-6 text-center">{{ alertMessage }}</p>
      <button @click="showErrorModal = false" class="w-full bg-gray-100 text-gray-700 p-2.5 rounded-full font-sarabun font-bold hover:bg-gray-200 transition cursor-pointer">ตกลง</button>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'log-regis'
})

const form = ref({
  username: '', // ใช้รับข้อมูลอีเมล
  password: ''
})

const isLoading = ref(false)
const showPassword = ref(false)
const showErrorModal = ref(false)
const alertMessage = ref('')

const showAlert = (msg: string) => {
  alertMessage.value = msg
  showErrorModal.value = true
}

const supabase = useSupabaseClient()

const handleLogin = async () => {
  if (!form.value.username || !form.value.password) {
    showAlert('กรุณากรอกข้อมูลให้ครบถ้วน')
    return
  }

  // ป้องกันกรณีที่ผู้ใช้เผลอกรอก Username เฉยๆ เพราะ Supabase ใช้ Email ในการล็อกอิน
  if (!form.value.username.includes('@')) {
    showAlert('ระบบอนุญาตให้ใช้เฉพาะอีเมล (Email) ในการเข้าสู่ระบบครับ')
    return
  }

  isLoading.value = true
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.value.username,
      password: form.value.password,
    })

    if (error) {
      console.error(error)
      // ดักจับ Error Message ที่ใช้บ่อยให้ออกมาเป็นภาษาไทยชัดเจน
      if (error.message.includes('Invalid login credentials')) {
        showAlert('อีเมลหรือรหัสผ่านไม่ถูกต้อง โปรดลองอีกครั้งคุณอาจจะพิมพ์ผิด')
      } else if (error.message.includes('Email not confirmed')) {
        showAlert('คุณยังไม่ได้ยืนยันอีเมลครับ โปรดเช็คกล่องจดหมายของคุณแล้วกดลิงก์ยืนยันก่อน')
      } else {
        showAlert(`เกิดข้อผิดพลาด: ${error.message}`)
      }
    } else {
      // ดึง role จากตาราง profiles ของผู้ใช้
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single() as { data: { role: string } | null, error: any }
        
      if (profileError || !profile) {
        console.error('Error fetching profile:', profileError)
        showAlert('เข้าสู่ระบบสำเร็จแต่ไม่พบข้อมูลสิทธิ์ (Role) โปรดติดต่อผู้ดูแลระบบ')
        return
      }

      const userRole = profile.role?.toLowerCase() || ''

      // ส่งไปยังหน้า Dashboard ตาม Role ตัวพิมพ์เล็ก-ใหญ่ถือว่าเหมือนกัน
      if (userRole === 'admin') {
        return navigateTo('/admin/home')
      } else if (userRole === 'reviewer') {
        return navigateTo('/reviewer/home')
      } else if (userRole === 'author') {
        return navigateTo('/author/home')
      } else {
        showAlert('บัญชีของคุณไม่มีสิทธิ์เข้าถึงระบบใดๆ')
      }
    }
  } catch (err) {
    console.error(err)
    showAlert('เซิร์ฟเวอร์ขัดข้อง โปรดตรวจสอบอินเทอร์เน็ตของคุณ')
  } finally {
    isLoading.value = false
  }
}
</script>