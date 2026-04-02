<template>
  <div class="min-h-screen bg-white font-sarabun">

    <!-- Navbar -->
    <nav class="w-full bg-[#E8E8E8] px-6 py-3 flex items-center justify-between shadow-sm">
      <span class="text-sm font-bold text-gray-800 tracking-wide">
        งาน BRICC การประกวดโครงงานวิจัย
        <span class="ml-2 bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full">Admin</span>
      </span>

      <button
        @click="handleLogout"
        :disabled="isLoggingOut"
        class="bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer disabled:opacity-50 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        {{ isLoggingOut ? 'กำลังออก...' : 'ออกจากระบบ' }}
      </button>
    </nav>

    <!-- Content -->
    <div class="p-8 max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">จัดการผู้ตรวจสอบ (Reviewer)</h1>

      <!-- Invite Form -->
      <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6">
        <h2 class="text-base font-bold text-gray-700 mb-4">📧 เชิญ Reviewer ใหม่</h2>

        <form @submit.prevent="handleInvite" class="flex gap-3">
          <input
            type="email"
            v-model="inviteEmail"
            placeholder="กรอกอีเมลของ Reviewer"
            required
            :disabled="isInviting"
            class="flex-1 h-10 border px-3 border-gray-300 rounded-xl text-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            :disabled="isInviting"
            class="bg-[#1A1A1A] hover:bg-[#404040] text-white font-bold text-sm px-5 py-2 rounded-xl transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {{ isInviting ? 'กำลังส่ง...' : 'ส่งคำเชิญ' }}
          </button>
        </form>

        <!-- Invite result message -->
        <div v-if="inviteMessage" :class="inviteSuccess ? 'text-green-600' : 'text-red-600'" class="text-sm mt-3 font-bold">
          {{ inviteMessage }}
        </div>
      </div>

      <!-- Info box -->
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
        <p class="font-bold mb-1">ℹ️ ขั้นตอนหลังส่งคำเชิญ</p>
        <ol class="list-decimal list-inside space-y-1 text-blue-600">
          <li>Reviewer จะได้รับอีเมลคำเชิญ</li>
          <li>กดลิงก์ในอีเมล → เข้าสู่หน้าตั้งรหัสผ่าน</li>
          <li>ตั้งรหัสผ่านเสร็จ → เข้าสู่หน้า Reviewer Dashboard อัตโนมัติ</li>
        </ol>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-2xl w-[90%] sm:w-[400px] shadow-2xl flex flex-col items-center">
        <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="font-bold text-xl mb-2 text-gray-800">ส่งคำเชิญสำเร็จ!</h2>
        <p class="text-sm text-gray-500 mb-6 text-center">ส่งอีเมลคำเชิญไปยัง<br><strong>{{ inviteEmail }}</strong><br>เรียบร้อยแล้ว</p>
        <button @click="showSuccessModal = false; inviteEmail = ''" class="w-full bg-gray-100 text-gray-700 p-2.5 rounded-full font-bold hover:bg-gray-200 transition cursor-pointer">
          ตกลง
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const supabase = useSupabaseClient()

// Logout
const isLoggingOut = ref(false)
const handleLogout = async () => {
  isLoggingOut.value = true
  try {
    await supabase.auth.signOut()
    window.location.href = '/'
  } catch (err) {
    console.error(err)
  } finally {
    isLoggingOut.value = false
  }
}

// Invite Reviewer
const inviteEmail = ref('')
const isInviting = ref(false)
const inviteMessage = ref('')
const inviteSuccess = ref(false)
const showSuccessModal = ref(false)

const handleInvite = async () => {
  inviteMessage.value = ''
  isInviting.value = true
  try {
    const result = await $fetch('/api/admin/invite-reviewer', {
      method: 'POST',
      body: { email: inviteEmail.value }
    })
    inviteSuccess.value = true
    showSuccessModal.value = true
  } catch (err: any) {
    inviteSuccess.value = false
    const msg = err?.data?.message || err?.message || 'เกิดข้อผิดพลาด'
    inviteMessage.value = `❌ ${msg}`
  } finally {
    isInviting.value = false
  }
}
</script>