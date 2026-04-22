<template>
  <div class="w-full max-w-2xl font-sarabun">

    <!-- ─── Card หลัก: กรอกโปรไฟล์ Reviewer ─────────────────────────────── -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

      <!-- Card Header (สีเขียว — สีประจำ Reviewer) -->
      <div class="bg-gradient-to-r from-green-600 to-green-500 px-8 py-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">ตั้งค่าโปรไฟล์ของคุณ</h1>
            <p class="text-green-100 text-sm mt-0.5">สำหรับผู้ตรวจสอบบทความ (Reviewer) — กรอกข้อมูลให้ครบก่อนเริ่มใช้งาน</p>
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
              <input v-model="form.firstname_th" type="text" placeholder="เช่น สมหญิง" required
                class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1">
                นามสกุล <span class="text-red-500">*</span>
              </label>
              <input v-model="form.lastname_th" type="text" placeholder="เช่น รักวิจัย" required
                class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition" />
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
              <input v-model="form.firstname_eng" type="text" placeholder="e.g. Somying" required
                class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1">
                Last Name <span class="text-red-500">*</span>
              </label>
              <input v-model="form.lastname_eng" type="text" placeholder="e.g. Rakwichai" required
                class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition" />
            </div>
          </div>
        </div>

        <!-- ─── ข้อมูลองค์กร ──────────────────────────────────────────────── -->
        <div>
          <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">ข้อมูลองค์กร</p>
          <div class="space-y-3">
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1">
                สังกัด / หน่วยงาน / มหาวิทยาลัย <span class="text-red-500">*</span>
              </label>
              <input v-model="form.institution" type="text" placeholder="เช่น มหาวิทยาลัยราชภัฏบุรีรัมย์" required
                class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-sm font-semibold text-gray-700 block mb-1">
                  ตำแหน่งทางวิชาการ <span class="text-red-500">*</span>
                </label>
                <select v-model="form.academic_position" required
                  class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition bg-white">
                  <option value="" disabled>เลือกตำแหน่ง</option>
                  <option v-for="pos in academicPositions" :key="pos" :value="pos">{{ pos }}</option>
                </select>
              </div>
              <div>
                <label class="text-sm font-semibold text-gray-700 block mb-1">
                  จังหวัด <span class="text-red-500">*</span>
                </label>
                <select v-model="form.province" required
                  class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition bg-white">
                  <option value="" disabled>เลือกจังหวัด</option>
                  <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
                </select>
              </div>
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1">
                เบอร์โทรศัพท์ <span class="text-red-500">*</span>
              </label>
              <input v-model="form.phone" type="tel" placeholder="เช่น 0812345678" required
                class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition" />
            </div>
          </div>
        </div>

        <!-- ─── สาขาความเชี่ยวชาญ (เฉพาะ Reviewer) ───────────────────────── -->
        <div>
          <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
            สาขาความเชี่ยวชาญ
            <span class="normal-case text-green-600 font-semibold ml-1">(สำคัญ: ใช้จับคู่กับบทความ)</span>
          </p>
          <div class="space-y-3">
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1">
                สาขาหลัก <span class="text-red-500">*</span>
              </label>
              <select v-model="form.expertise" required
                class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition bg-white">
                <option value="" disabled>เลือกสาขาความเชี่ยวชาญ</option>
                <option v-for="ex in expertiseList" :key="ex" :value="ex">{{ ex }}</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1">รายละเอียดความเชี่ยวชาญเพิ่มเติม</label>
              <textarea v-model="form.expertise_detail" rows="3"
                placeholder="เช่น ปัญญาประดิษฐ์, การเรียนรู้ของเครื่อง, การประมวลผลภาษาธรรมชาติ"
                class="w-full border border-gray-300 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition resize-none" />
            </div>
          </div>
        </div>

        <!-- ─── Submit ─────────────────────────────────────────────────────── -->
        <button type="submit" :disabled="isSaving"
          class="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2">
          <svg v-if="isSaving" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          {{ isSaving ? 'กำลังบันทึก...' : '✓ บันทึกข้อมูลและเข้าสู่ระบบ' }}
        </button>

      </form>
    </div>

    <!-- ─── Card เปลี่ยนรหัสผ่าน (Optional) ─────────────────────────────── -->
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
          <div class="relative">
            <input :type="showPw ? 'text' : 'password'" v-model="newPassword" placeholder="อย่างน้อย 8 ตัวอักษร"
              class="w-full h-10 border border-gray-300 px-3 pr-10 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
            <button type="button" @click="showPw = !showPw"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
              <svg v-if="!showPw" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
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
          <label class="text-sm font-semibold text-gray-700 block mb-1">ยืนยันรหัสผ่านใหม่</label>
          <input type="password" v-model="confirmPassword" placeholder="กรอกรหัสผ่านอีกครั้ง"
            class="w-full h-10 border border-gray-300 px-3 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
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
  province:          '',
  phone:             '',
  expertise:         '',
  expertise_detail:  '',
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

// Pre-fill ถ้ามีข้อมูลอยู่แล้ว
onMounted(async () => {
  if (!user.value) return
  const { data } = await supabase
    .from('profiles')
    .select('firstname_th, lastname_th, firstname_eng, lastname_eng, institution, academic_position, province, phone, expertise, expertise_detail')
    .eq('id', user.value.id)
    .single()
  if (data) {
    const d = data as any
    Object.assign(form, {
      firstname_th:      d.firstname_th      || '',
      lastname_th:       d.lastname_th       || '',
      firstname_eng:     d.firstname_eng     || '',
      lastname_eng:      d.lastname_eng      || '',
      institution:       d.institution       || '',
      academic_position: d.academic_position || '',
      province:          d.province          || '',
      phone:             d.phone             || '',
      expertise:         d.expertise         || '',
      expertise_detail:  d.expertise_detail  || '',
    })
  }
})

const handleSave = async () => {
  errorMsg.value = ''
  isSaving.value = true
  try {
    const { data: { user: authUser } } = await supabase.auth.getUser()
    if (!authUser) throw new Error("Session หมดอายุ กรุณาเข้าสู่ระบบใหม่")

    const { error, data } = await supabase
      .from('profiles')
      .update({
        firstname_th:      form.firstname_th,
        lastname_th:       form.lastname_th,
        firstname_eng:     form.firstname_eng,
        lastname_eng:      form.lastname_eng,
        institution:       form.institution,
        academic_position: form.academic_position,
        province:          form.province,
        phone:             form.phone,
        expertise:         form.expertise,
        expertise_detail:  form.expertise_detail,
        is_profile_complete: true,
      } as never)
      .eq('id', authUser.id)
      .select()
      
    if (error) throw error
    if (!data || data.length === 0) {
      throw new Error("บันทึกไม่สำเร็จ (Row Level Security หรือฐานข้อมูลไม่ให้สิทธิ์ Update)")
    }
    window.location.href = '/reviewer/home'
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
  'อาจารย์','อาจารย์พิเศษ','นักวิจัย','นักวิทยาศาสตร์',
  'นักศึกษาระดับบัณฑิตศึกษา','นักศึกษา','อื่นๆ',
]

const expertiseList = [
  'วิทยาศาสตร์และเทคโนโลยี',
  'วิทยาการคอมพิวเตอร์และเทคโนโลยีสารสนเทศ',
  'วิศวกรรมศาสตร์',
  'บริหารธุรกิจและเศรษฐศาสตร์',
  'มนุษยศาสตร์และสังคมศาสตร์',
  'ศิลปกรรมศาสตร์',
  'ครุศาสตร์และศึกษาศาสตร์',
  'เกษตรศาสตร์',
  'สาธารณสุขและพยาบาลศาสตร์',
  'นิติศาสตร์และรัฐศาสตร์',
  'อื่นๆ',
]

const provinces = [
  'กรุงเทพมหานคร','กระบี่','กาญจนบุรี','กาฬสินธุ์','กำแพงเพชร',
  'ขอนแก่น','จันทบุรี','ฉะเชิงเทรา','ชลบุรี','ชัยนาท',
  'ชัยภูมิ','ชุมพร','เชียงราย','เชียงใหม่','ตรัง',
  'ตราด','ตาก','นครนายก','นครปฐม','นครพนม',
  'นครราชสีมา','นครศรีธรรมราช','นครสวรรค์','นนทบุรี','นราธิวาส',
  'น่าน','บึงกาฬ','บุรีรัมย์','ปทุมธานี','ประจวบคีรีขันธ์',
  'ปราจีนบุรี','ปัตตานี','พระนครศรีอยุธยา','พะเยา','พังงา',
  'พัทลุง','พิจิตร','พิษณุโลก','เพชรบุรี','เพชรบูรณ์',
  'แพร่','ภูเก็ต','มหาสารคาม','มุกดาหาร','แม่ฮ่องสอน',
  'ยโสธร','ยะลา','ร้อยเอ็ด','ระนอง','ระยอง',
  'ราชบุรี','ลพบุรี','ลำปาง','ลำพูน','เลย',
  'ศรีสะเกษ','สกลนคร','สงขลา','สตูล','สมุทรปราการ',
  'สมุทรสงคราม','สมุทรสาคร','สระแก้ว','สระบุรี','สิงห์บุรี',
  'สุโขทัย','สุพรรณบุรี','สุราษฎร์ธานี','สุรินทร์','หนองคาย',
  'หนองบัวลำภู','อ่างทอง','อำนาจเจริญ','อุดรธานี','อุตรดิตถ์',
  'อุทัยธานี','อุบลราชธานี',
]
</script>
