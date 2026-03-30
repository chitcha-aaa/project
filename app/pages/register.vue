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

          <!-- เกณฑ์การตั้งรหัสผ่าน -->
          <div v-if="form.password.length > 0" class="mt-2 text-[12px] font-sarabun text-gray-500 transition-all duration-300">
            <ul class="space-y-1">
              <li :class="passwordCriteria.length ? 'text-green-500' : 'text-gray-400'" class="flex items-center gap-2 transition-colors duration-200">
                <svg v-if="passwordCriteria.length" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                <span v-else class="w-2 h-2 rounded-full bg-gray-300 ml-0.5 mr-0.5"></span>
                ขั้นต่ำ 12 ตัวอักษรขึ้นไป
              </li>
              <li :class="passwordCriteria.uppercase ? 'text-green-500' : 'text-gray-400'" class="flex items-center gap-2 transition-colors duration-200">
                <svg v-if="passwordCriteria.uppercase" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                <span v-else class="w-2 h-2 rounded-full bg-gray-300 ml-0.5 mr-0.5"></span>
                อักษรตัวพิมพ์ใหญ่ (A-Z)
              </li>
              <li :class="passwordCriteria.lowercase ? 'text-green-500' : 'text-gray-400'" class="flex items-center gap-2 transition-colors duration-200">
                <svg v-if="passwordCriteria.lowercase" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                <span v-else class="w-2 h-2 rounded-full bg-gray-300 ml-0.5 mr-0.5"></span>
                อักษรตัวพิมพ์เล็ก (a-z)
              </li>
              <li :class="passwordCriteria.number ? 'text-green-500' : 'text-gray-400'" class="flex items-center gap-2 transition-colors duration-200">
                <svg v-if="passwordCriteria.number" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                <span v-else class="w-2 h-2 rounded-full bg-gray-300 ml-0.5 mr-0.5"></span>
                ตัวเลข (0-9)
              </li>
            </ul>
          </div>
        </div>

        <!-- password_submit -->
        <div class="font-sarabun mt-3">
          <label for="password_submit" class="block text-[13px] font-bold text-gray-500 mb-1">ยืนยันรหัสผ่าน</label>
          <!-- ช่องใส่รหัสผ่าน -->
          <div class="relative">
            <!-- Overlay ดักจับการคลิกถ้าไม่ผ่านเกณฑ์ -->
            <div v-if="!isPasswordValid" @click="alert_invalid_password" class="absolute inset-0 z-10 "></div>
            
            <input :type="showPasswordSubmit ? 'text' : 'password'" id="password_submit" v-model="form.password_submit" required
              :readonly="!isPasswordValid"
              @focus="!isPasswordValid && alert_invalid_password()"
              :class="!isPasswordValid ? 'bg-gray-50 text-gray-400 focus:ring-0 focus:border-gray-300' : 'focus:ring-1 focus:ring-blue-500 focus:border-blue-500'"
              class="w-full h-10 border px-3 py-2 border-gray-300 rounded-xl font-sarabun text-sm focus:outline-none pr-10">
            <button type="button" @click="showPasswordSubmit = !showPasswordSubmit" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none" :class="{'opacity-50': !isPasswordValid}">
              <svg v-if="showPasswordSubmit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          
          <!-- แสดงสถานะยืนยันรหัสผ่าน -->
          <div v-if="form.password_submit.length > 0 && passwordMatchStatus !== 'idle'" class="mt-2 text-[12px] font-sarabun h-4 transition-all duration-300">
            <span v-if="passwordMatchStatus === 'match'" class="text-green-500 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              รหัสผ่านถูกต้อง
            </span>
            <span v-else-if="passwordMatchStatus === 'mismatch'" class="text-red-500 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
              รหัสผ่านไม่ตรงกัน
            </span>
            <span v-else-if="passwordMatchStatus === 'typing'" class="text-gray-400 flex items-center gap-1 animate-pulse">
              กำลังตรวจสอบ...
            </span>
          </div>
        </div>

        <button type="submit" :disabled="isLoading"
          class="bg-[#1A1A1A] text-white p-3 w-full rounded-3xl font-sarabun font-bold hover:bg-[#404040] disabled:bg-gray-400 cursor-pointer transition-colors duration-300 ease-in-out mt-4">
          {{ isLoading ? 'กำลังส่งรหัส OTP...' : 'ลงทะเบียน' }}
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

    <!-- Modal: OTP Popup -->
    <div v-if="showOtpModal" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div class="bg-white p-8 rounded-2xl w-[90%] sm:w-[400px] shadow-2xl flex flex-col items-center">
        <h2 class="font-sarabun text-2xl font-bold mb-2">ยืนยันอีเมล</h2>
        <p class="font-sarabun text-sm text-gray-500 mb-6 text-center">
          เราได้ส่งรหัส OTP ไปยังอีเมล <br/><span class="font-bold text-black">{{ form.email }}</span>
        </p>

        <input type="text" v-model="otpInput" placeholder="กรอกรหัส 6 หลัก" maxlength="6"
          class="w-full h-12 border border-gray-300 rounded-xl px-4 text-center text-xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6">
        
        <button @click="verify_otp"
          class="w-full bg-blue-600 text-white p-3 rounded-full font-sarabun font-bold hover:bg-blue-700 transition mb-3">
          ยืนยันรหัส OTP
        </button>

        <button @click="showOtpModal = false"
          class="w-full bg-gray-100 text-gray-600 p-3 rounded-full font-sarabun font-bold hover:bg-gray-200 transition">
          ยกเลิก
        </button>
      </div>
    </div>

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

const passwordCriteria = computed(() => {
  const pwd = form.value.password
  return {
    length: pwd.length >= 12,
    uppercase: /[A-Z]/.test(pwd),
    lowercase: /[a-z]/.test(pwd),
    number: /[0-9]/.test(pwd)
  }
})

const isPasswordValid = computed(() => {
  return passwordCriteria.value.length &&
         passwordCriteria.value.uppercase &&
         passwordCriteria.value.lowercase &&
         passwordCriteria.value.number
})

const alert_invalid_password = () => {
  alert('โปรดตั้งรหัสผ่านให้ถูกต้องตามเกณฑ์')
}

const passwordMatchStatus = ref<'idle' | 'typing' | 'match' | 'mismatch'>('idle')
let typingTimer: any = null

watch([() => form.value.password, () => form.value.password_submit], ([newPwd, newSubmit]) => {
  if (!newSubmit) {
    passwordMatchStatus.value = 'idle'
    if (typingTimer) clearTimeout(typingTimer)
    return
  }

  passwordMatchStatus.value = 'typing'
  if (typingTimer) clearTimeout(typingTimer)

  typingTimer = setTimeout(() => {
    if (form.value.password === form.value.password_submit) {
      passwordMatchStatus.value = 'match'
    } else {
      passwordMatchStatus.value = 'mismatch'
    }
  }, 3000)
})

// ตัวแปรสำหรับระบบ OTP
const showOtpModal = ref(false)
const otpInput = ref('')
const expectedOtp = ref('') // เก็บชั่วคราวจาก Backend ไว้เทียบ
const isLoading = ref(false)

const handle_register = async () => {
  if (!isPasswordValid.value) {
    alert('กรุณาตั้งรหัสผ่านให้ตรงตามเกณฑ์ที่กำหนดครับ!')
    return
  }

  if (form.value.password !== form.value.password_submit) {
    alert('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกันครับ!')
    return
  }

  // เรียกใช้ API ส่งอีเมล
  isLoading.value = true
  try {
    const response = await $fetch('/api/email', {
      method: 'POST',
      body: { email: form.value.email }
    })

    if (response) {
      alert('เช็คอีเมลของคุณเพื่อดูรหัส OTP!')
      showOtpModal.value = true
      expectedOtp.value = (response as any).otpDebug // ดึงค่ามารอเทียบ
    } else {
      alert('เกิดข้อผิดพลาดจากเซิร์ฟเวอร์')
    }
  } catch (error) {
    alert('ส่งอีเมลไม่สำเร็จ กรุณาตรวจสอบการเชื่อมต่อ')
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const verify_otp = () => {
  if (otpInput.value === expectedOtp.value && otpInput.value !== '') {
    alert('ลงทะเบียนสำเร็จ! ยินดีต้อนรับเข้าสู่ระบบ')
    showOtpModal.value = false
    // นำทางไปหน้าเข้าสู่ระบบ หรือหน้าอื่น:
    // navigateTo('/login')
  } else {
    alert('รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่')
  }
}
</script>
