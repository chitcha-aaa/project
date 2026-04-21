<template>
  <div class="w-full max-w-2xl font-sarabun">

    <!-- ─── Card หลัก: กรอกโปรไฟล์ Admin ──────────────────────────────────── -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

      <!-- Card Header (สีเทาเข้ม — สีประจำ Admin) -->
      <div class="bg-gradient-to-r from-gray-800 to-gray-700 px-8 py-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">ตั้งค่าโปรไฟล์ของคุณ</h1>
            <p class="text-gray-300 text-sm mt-0.5">สำหรับผู้ดูแลระบบ (Admin) — กรอกข้อมูลให้ครบก่อนเริ่มใช้งาน</p>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMsg" class="mx-8 mt-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-start gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ errorMsg }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSave" class="px-8 py-6 space-y-5">

        <!-- ─── ชื่อภาษาไทย ──────────────────────────────────────────────── -->
        <div>
          <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">ชื่อ-นามสกุล (ภาษาไทย)</p>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1">
                ชื่อจริง <span class="text-red-500">*</span>
              </label>
              <input v-model="form.firstname_th" type="text" placeholder="เช่น สมศักดิ์" required
                class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1">
                นามสกุล <span class="text-red-500">*</span>
              </label>
              <input v-model="form.lastname_th" type="text" placeholder="เช่น มีอำนาจ" required
                class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition" />
            </div>
          </div>
        </div>

        <!-- ─── ชื่อภาษาอังกฤษ ────────────────────────────────────────────── -->
        <div>
          <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">ชื่อ-นามสกุล (ภาษาอังกฤษ)</p>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1">
                First Name <span class="text-red-500">*</span>
              </label>
              <input v-model="form.firstname_eng" type="text" placeholder="e.g. Somsak" required
                class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1">
                Last Name <span class="text-red-500">*</span>
              </label>
              <input v-model="form.lastname_eng" type="text" placeholder="e.g. Meeamnat" required
                class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition" />
            </div>
          </div>
        </div>

        <!-- ─── ข้อมูลองค์กร (ไม่มี Province) ───────────────────────────────── -->
        <div>
          <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">ข้อมูลองค์กร</p>
          <div class="space-y-3">
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1">
                สังกัด / หน่วยงาน <span class="text-red-500">*</span>
              </label>
              <input v-model="form.institution" type="text" placeholder="เช่น มหาวิทยาลัยราชภัฏบุรีรัมย์" required
                class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-sm font-semibold text-gray-700 block mb-1">
                  ตำแหน่งทางวิชาการ <span class="text-red-500">*</span>
                </label>
                <select v-model="form.academic_position" required
                  class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition bg-white">
                  <option value="" disabled>เลือกตำแหน่ง</option>
                  <option v-for="pos in academicPositions" :key="pos" :value="pos">{{ pos }}</option>
                </select>
              </div>
              <div>
                <label class="text-sm font-semibold text-gray-700 block mb-1">
                  เบอร์โทรศัพท์ <span class="text-red-500">*</span>
                </label>
                <input v-model="form.phone" type="tel" placeholder="เช่น 0812345678" required
                  class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition" />
              </div>
            </div>
          </div>
        </div>

        <!-- ─── Submit ─────────────────────────────────────────────────────── -->
        <button type="submit" :disabled="isSaving"
          class="w-full h-11 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2">
          <svg v-if="isSaving" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          {{ isSaving ? 'กำลังบันทึก...' : '✓ บันทึกข้อมูลและเข้าสู่ระบบ' }}
        </button>

      </form>
    </div>

    <!-- ─── Card เปลี่ยนรหัสผ่าน ──────────────────────────────────────────── -->
    <div class="mt-4 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <button type="button" @click="showPasswordSection = !showPasswordSection"
        class="w-full px-8 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          <span class="font-semibold text-gray-700 text-sm">เปลี่ยนรหัสผ่าน</span>
          <span class="text-xs text-gray-400">(ไม่บังคับ)</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          :class="['w-4 h-4 text-gray-400 transition-transform duration-200', showPasswordSection ? 'rotate-180' : '']">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div v-show="showPasswordSection" class="px-8 pb-6 space-y-4 border-t border-gray-100 pt-4">
        <div v-if="pwErrorMsg"   class="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{{ pwErrorMsg }}</div>
        <div v-if="pwSuccessMsg" class="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">{{ pwSuccessMsg }}</div>
        <div>
          <label class="text-sm font-semibold text-gray-700 block mb-1">รหัสผ่านใหม่</label>
          <input :type="showPw ? 'text' : 'password'" v-model="newPassword" placeholder="อย่างน้อย 8 ตัวอักษร"
            class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600" />
        </div>
        <div>
          <label class="text-sm font-semibold text-gray-700 block mb-1">ยืนยันรหัสผ่านใหม่</label>
          <input type="password" v-model="confirmPassword" placeholder="กรอกรหัสผ่านอีกครั้ง"
            class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600" />
        </div>
        <button type="button" @click="handleChangePassword" :disabled="isChangingPw"
          class="w-full h-10 bg-gray-800 hover:bg-gray-700 text-white font-bold text-sm rounded-xl transition-colors duration-200 disabled:opacity-50">
          {{ isChangingPw ? 'กำลังเปลี่ยน...' : 'เปลี่ยนรหัสผ่าน' }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'setup' })

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const form = reactive({
  firstname_th:      '',
  lastname_th:       '',
  firstname_eng:     '',
  lastname_eng:      '',
  institution:       '',
  academic_position: '',
  phone:             '',
})

const isSaving = ref(false)
const errorMsg = ref('')

const showPasswordSection = ref(false)
const newPassword     = ref('')
const confirmPassword = ref('')
const showPw          = ref(false)
const isChangingPw    = ref(false)
const pwErrorMsg      = ref('')
const pwSuccessMsg    = ref('')

onMounted(async () => {
  if (!user.value) return
  const { data } = await supabase
    .from('profiles')
    .select('firstname_th, lastname_th, firstname_eng, lastname_eng, institution, academic_position, phone')
    .eq('id', user.value.id)
    .single()
  if (data) {
    Object.assign(form, {
      firstname_th:      data.firstname_th      || '',
      lastname_th:       data.lastname_th       || '',
      firstname_eng:     data.firstname_eng     || '',
      lastname_eng:      data.lastname_eng      || '',
      institution:       data.institution       || '',
      academic_position: data.academic_position || '',
      phone:             data.phone             || '',
    })
  }
})

const handleSave = async () => {
  errorMsg.value = ''
  isSaving.value = true
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ ...form, is_profile_complete: true })
      .eq('id', user.value!.id)
    if (error) throw error
    await navigateTo('/admin/home')
  } catch (e: any) {
    errorMsg.value = `เกิดข้อผิดพลาด: ${e.message || 'โปรดลองอีกครั้ง'}`
  } finally {
    isSaving.value = false
  }
}

const handleChangePassword = async () => {
  pwErrorMsg.value = ''
  pwSuccessMsg.value = ''
  if (newPassword.value.length < 8) { pwErrorMsg.value = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'; return }
  if (newPassword.value !== confirmPassword.value) { pwErrorMsg.value = 'รหัสผ่านทั้งสองช่องไม่ตรงกัน'; return }
  isChangingPw.value = true
  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword.value })
    if (error) throw error
    pwSuccessMsg.value = '✓ เปลี่ยนรหัสผ่านสำเร็จ'
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (e: any) {
    pwErrorMsg.value = `เกิดข้อผิดพลาด: ${e.message}`
  } finally {
    isChangingPw.value = false
  }
}

const academicPositions = [
  'ศาสตราจารย์ (ศ.)','รองศาสตราจารย์ (รศ.)','ผู้ช่วยศาสตราจารย์ (ผศ.)',
  'อาจารย์','อาจารย์พิเศษ','นักวิจัย','นักวิทยาศาสตร์','อื่นๆ',
]
</script>
