<template>
  <!-- layout 'sidebar' → AppSidebar (ซ้าย) + เนื้อหา (ขวา) -->
  <div class="p-8 font-sarabun">

    <!-- Welcome -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">
        สวัสดี, <span class="text-gray-700">{{ displayName || 'ผู้ดูแลระบบ' }}</span>
        <span class="ml-2 text-sm bg-gray-700 text-white px-2.5 py-0.5 rounded-full font-medium">Admin</span>
      </h1>
      <p class="text-gray-500 mt-1 text-sm">จัดการระบบ BRICC — เชิญ Reviewer และดูแลบทความทั้งหมด</p>
    </div>

    <!-- ─── Invite Reviewer Form ──────────────────────────────────────────── -->
    <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
      <h2 class="text-base font-bold text-gray-700 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        เชิญ Reviewer ใหม่
      </h2>

      <form @submit.prevent="handleInvite" class="flex gap-3"> <!--เป็กการเรียกใช้ฟังก์ชัน handleInvite-->
        <input
          type="email"
          v-model="inviteEmail"
          placeholder="กรอกอีเมลของ Reviewer"
          required
          :disabled="isInviting"
          class="flex-1 h-10 border px-3 border-gray-300 rounded-xl text-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 disabled:bg-gray-100 font-sarabun"
        />
        <button
          type="submit"
          :disabled="isInviting"
          class="bg-[#1A1A1A] hover:bg-[#404040] text-white font-bold text-sm px-5 py-2 rounded-xl transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap font-sarabun"
        >
          {{ isInviting ? 'กำลังส่ง...' : 'ส่งคำเชิญ' }}
        </button>
      </form>

      <div v-if="inviteMessage" :class="inviteSuccess ? 'text-green-600' : 'text-red-600'" class="text-sm mt-3 font-bold">
        {{ inviteMessage }}
      </div>
    </div>

    <!-- ─── Info Box ───────────────────────────────────────────────────────── -->
    <div class="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-sm text-blue-700 mb-6">
      <p class="font-bold mb-2">ℹ️ ขั้นตอนหลังส่งคำเชิญ</p>
      <ol class="list-decimal list-inside space-y-1 text-blue-600">
        <li>Reviewer จะได้รับอีเมลคำเชิญ</li>
        <li>กดลิงก์ในอีเมล → เข้าสู่หน้าตั้งรหัสผ่าน</li>
        <li>กรอกโปรไฟล์เสร็จ → เข้าสู่ Reviewer Dashboard อัตโนมัติ</li>
      </ol>
    </div>

    <!-- ─── Stats Cards ────────────────────────────────────────────────────── -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">0</p>
            <p class="text-xs text-gray-500">Reviewer ทั้งหมด</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">0</p>
            <p class="text-xs text-gray-500">บทความทั้งหมด</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">0</p>
            <p class="text-xs text-gray-500">อนุมัติแล้ว</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── Success Modal ──────────────────────────────────────────────────── -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-2xl w-[90%] sm:w-[400px] shadow-2xl flex flex-col items-center font-sarabun">
        <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="font-bold text-xl mb-2 text-gray-800">ส่งคำเชิญสำเร็จ!</h2>
        <p class="text-sm text-gray-500 mb-6 text-center">
          ส่งอีเมลคำเชิญไปยัง<br><strong>{{ inviteEmail }}</strong><br>เรียบร้อยแล้ว
        </p>
        <button @click="showSuccessModal = false; inviteEmail = ''"
          class="w-full bg-gray-100 text-gray-700 p-2.5 rounded-full font-bold hover:bg-gray-200 transition cursor-pointer">
          ตกลง
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
// layout 'sidebar' → AppSidebar โหลดอัตโนมัติจาก layouts/sidebar.vue
definePageMeta({ layout: 'sidebar' })

const supabase = useSupabaseClient() //เรียนใช้ฐานข้อมูล Supabase
const { displayName, fetchProfile } = useUserProfile()

onMounted(() => {
  fetchProfile()
})

// ─── Invite Reviewer ───────────────────────────────────────────────────────────
const inviteEmail    = ref('')
const isInviting     = ref(false)
const inviteMessage  = ref('')
const inviteSuccess  = ref(false)
const showSuccessModal = ref(false)

const handleInvite = async () => {
  inviteMessage.value = ''
  isInviting.value = true
  try {
    await $fetch('/api/admin/invite-reviewer', {
      method: 'POST',
      body: { email: inviteEmail.value }
    })
    inviteSuccess.value  = true
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