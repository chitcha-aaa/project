<template>
  <div class="min-h-screen bg-gray-50 font-sarabun flex flex-col">

    <!-- Navbar -->
    <nav class="w-full bg-[#E8E8E8] px-6 py-3 flex items-center shadow-sm">
      <span class="text-sm font-bold text-gray-800">
        งาน BRICC การประกวดโครงงานวิจัย
        <span class="ml-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">ตั้งค่าบัญชี Reviewer</span>
      </span>
    </nav>

    <div class="flex flex-1 justify-center items-center px-4">
      <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <!-- Icon -->
        <div class="flex justify-center mb-4">
          <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        </div>

        <!-- Error -->
        <div v-if="errorMsg" class="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
          {{ errorMsg }}
        </div>

        <!-- ── Step 1: login ด้วย temp password ── -->
        <template v-if="!isLoggedIn">
          <h1 class="text-xl font-bold text-gray-800 text-center mb-1">ยินดีต้อนรับสู่ระบบ</h1>
          <p class="text-sm text-gray-500 text-center mb-6">กรอกข้อมูลจากอีเมลคำเชิญที่ได้รับ</p>

          <form @submit.prevent="handleTempLogin" class="flex flex-col gap-4">
            <div>
              <label class="text-sm font-bold text-gray-700 mb-1 block">อีเมล</label>
              <input type="email" v-model="emailInput" placeholder="อีเมลของคุณ" required
                autocomplete="username"
                class="w-full h-10 border px-3 border-gray-300 rounded-2xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
            </div>
            <div>
              <label class="text-sm font-bold text-gray-700 mb-1 block">
                รหัสผ่านชั่วคราว <span class="text-gray-400 font-normal">(จากอีเมลคำเชิญ)</span>
              </label>
              <input type="text" v-model="tempPassword" placeholder="วางรหัสผ่านชั่วคราวที่นี่" required
                autocomplete="off"
                class="w-full h-10 border px-3 border-gray-300 rounded-2xl text-sm font-mono tracking-widest focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
            </div>
            <button type="submit" :disabled="isLoading"
              class="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-2xl transition-colors duration-200 cursor-pointer disabled:opacity-50 mt-2">
              {{ isLoading ? 'กำลังตรวจสอบ...' : 'ถัดไป →' }}
            </button>
          </form>
        </template>

        <!-- ── Step 2: ตั้งรหัสผ่านใหม่ ── -->
        <template v-else>
          <h1 class="text-xl font-bold text-gray-800 text-center mb-1">ตั้งรหัสผ่านใหม่</h1>
          <p class="text-sm text-gray-500 text-center mb-6">
            บัญชี: <strong class="text-green-700">{{ reviewerEmail }}</strong>
          </p>

          <form @submit.prevent="handleSetPassword" class="flex flex-col gap-4">
            <div>
              <label class="text-sm font-bold text-gray-700 mb-1 block">รหัสผ่านใหม่</label>
              <div class="relative">
                <input :type="showPassword ? 'text' : 'password'" v-model="password"
                  placeholder="กรอกรหัสผ่านใหม่ (อย่างน้อย 8 ตัว)" required
                  class="w-full h-10 border px-3 py-2 border-gray-300 rounded-2xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 pr-10" />
                <button type="button" @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                  <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label class="text-sm font-bold text-gray-700 mb-1 block">ยืนยันรหัสผ่าน</label>
              <input type="password" v-model="confirmPassword" placeholder="กรอกรหัสผ่านอีกครั้ง" required
                class="w-full h-10 border px-3 py-2 border-gray-300 rounded-2xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
            </div>
            <button type="submit" :disabled="isLoading"
              class="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-2xl transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2">
              {{ isLoading ? 'กำลังบันทึก...' : 'ยืนยันและเข้าสู่ระบบ' }}
            </button>
          </form>
        </template>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const supabase = useSupabaseClient()
const emailInput = ref('')
const tempPassword = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMsg = ref('')
const isLoggedIn = ref(false)
const reviewerEmail = ref('')

// Step 1: ล็อกอินด้วย temp password จากอีเมล
const handleTempLogin = async () => {
  errorMsg.value = ''
  isLoading.value = true
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailInput.value,
      password: tempPassword.value
    })
    if (error) {
      errorMsg.value = 'อีเมลหรือรหัสผ่านชั่วคราวไม่ถูกต้อง กรุณาตรวจสอบอีเมลคำเชิญอีกครั้ง'
      return
    }
    isLoggedIn.value = true
    reviewerEmail.value = data.user.email ?? emailInput.value
  } catch {
    errorMsg.value = 'เกิดข้อผิดพลาด โปรดลองอีกครั้ง'
  } finally {
    isLoading.value = false
  }
}

// Step 2: ตั้งรหัสผ่านใหม่
const handleSetPassword = async () => {
  errorMsg.value = ''

  if (password.value.length < 8) {
    errorMsg.value = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'รหัสผ่านทั้งสองช่องไม่ตรงกัน'
    return
  }

  isLoading.value = true
  try {
    const { error } = await supabase.auth.updateUser({ password: password.value })
    if (error) {
      errorMsg.value = `เกิดข้อผิดพลาด: ${error.message}`
      return
    }
    window.location.href = '/reviewer/home'
  } catch {
    errorMsg.value = 'เซิร์ฟเวอร์ขัดข้อง โปรดลองอีกครั้ง'
  } finally {
    isLoading.value = false
  }
}
</script>
