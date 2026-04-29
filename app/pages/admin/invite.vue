<template>
  <div class="p-8 font-sarabun">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 flex items-center gap-3">
        <div class="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        เชิญ Reviewer ใหม่
      </h1>
      <p class="text-gray-500 mt-1 text-sm ml-13">ส่งคำเชิญทางอีเมลเพื่อให้ผู้ทรงคุณวุฒิลงทะเบียนเป็น Reviewer ในระบบ</p>
    </div>

    <!-- ─── Invite Reviewer Form ──────────────────────────────────────────── -->
    <div class="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm max-w-2xl">
      <div class="mb-6">
        <h2 class="text-lg font-bold text-gray-800 mb-2">ข้อมูลผู้รับคำเชิญ</h2>
        <p class="text-sm text-gray-400">ระบุอีเมลของ Reviewer ระบบจะส่งลิงก์ลงทะเบียนให้โดยอัตโนมัติ</p>
      </div>

      <form @submit.prevent="handleInvite" class="space-y-4">
        <div>
          <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">อีเมล (Email Address)</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              v-model="inviteEmail"
              placeholder="example@email.com"
              required
              :disabled="isInviting"
              class="w-full h-14 pl-12 pr-4 border-2 border-gray-100 rounded-2xl text-base focus:outline-none focus:border-gray-800 focus:ring-0 transition-all disabled:bg-gray-50 font-sarabun"
            />
          </div>
        </div>

        <div v-if="inviteError" class="bg-red-50 text-red-600 text-xs p-3 rounded-xl flex items-center gap-2 font-bold animate-shake">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          {{ inviteError }}
        </div>

        <button
          type="submit"
          :disabled="isInviting"
          class="w-full h-14 bg-[#1A1A1A] hover:bg-[#404040] text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-gray-200 hover:shadow-gray-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          <svg v-if="!isInviting" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <div v-else class="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
          {{ isInviting ? 'กำลังส่งคำเชิญ...' : 'ส่งคำเชิญ' }}
        </button>
      </form>
    </div>

    <!-- ─── Info Box ───────────────────────────────────────────────────────── -->
    <div class="mt-8 bg-blue-50 border border-blue-100 rounded-3xl p-6 max-w-2xl">
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 class="text-blue-900 font-bold text-sm mb-2">ขั้นตอนหลังจากส่งคำเชิญ</h3>
          <ul class="space-y-3">
            <li class="flex items-center gap-3 text-sm text-blue-700">
              <span class="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-[10px] font-bold">1</span>
              <span>Reviewer จะได้รับอีเมลแจ้งเตือนพร้อมลิงก์สำหรับสร้างรหัสผ่าน</span>
            </li>
            <li class="flex items-center gap-3 text-sm text-blue-700">
              <span class="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-[10px] font-bold">2</span>
              <span>เมื่อตั้งรหัสผ่านสำเร็จ Reviewer จะต้องกรอกข้อมูลส่วนตัวและสาขาความเชี่ยวชาญ</span>
            </li>
            <li class="flex items-center gap-3 text-sm text-blue-700">
              <span class="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-[10px] font-bold">3</span>
              <span>หลังจากนั้น Reviewer จะสามารถเริ่มรับการมอบหมายบทความจากคุณได้ทันที</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- ─── Success Modal ────────────────────────────────────────────────── -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div class="bg-white p-10 rounded-[40px] w-full max-w-[420px] shadow-2xl flex flex-col items-center font-sarabun animate-bounce-in">
        <div class="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="font-bold text-2xl mb-3 text-gray-800 text-center">ส่งคำเชิญสำเร็จ!</h2>
        <p class="text-sm text-gray-500 mb-10 text-center leading-relaxed">
          ระบบได้ส่งอีเมลคำเชิญไปยัง <br><strong class="text-gray-800">{{ inviteEmail }}</strong><br> เรียบร้อยแล้ว
        </p>
        <button @click="closeSuccess"
          class="w-full bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-colors cursor-pointer">
          ตกลง
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'sidebar' })

const inviteEmail    = ref('')
const isInviting     = ref(false)
const inviteError    = ref('')
const showSuccessModal = ref(false)

const handleInvite = async () => {
  inviteError.value = ''
  isInviting.value = true
  try {
    await $fetch('/api/admin/invite-reviewer', {
      method: 'POST',
      body: { email: inviteEmail.value }
    })
    showSuccessModal.value = true
  } catch (err: any) {
    const msg = err?.data?.message || err?.message || 'เกิดข้อผิดพลาดในการส่งคำเชิญ'
    inviteError.value = msg
  } finally {
    isInviting.value = false
  }
}

const closeSuccess = () => {
  showSuccessModal.value = false
  inviteEmail.value = ''
}
</script>

<style scoped>
@keyframes bounce-in {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); opacity: 1; }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); }
}
.animate-bounce-in {
  animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
.animate-shake {
  animation: shake 0.2s ease-in-out 0s 2;
}
</style>
