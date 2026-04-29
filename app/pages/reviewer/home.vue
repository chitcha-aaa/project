<template>
  <!-- ใช้ layout 'sidebar' → AppSidebar (ซ้าย) + เนื้อหา (ขวา) -->
  <div class="p-8 font-sarabun">

    <!-- Welcome -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">
        สวัสดี, <span class="text-green-600">{{ displayName || 'ผู้ตรวจสอบ' }}</span> 👋
      </h1>
      <p class="text-gray-500 mt-1 text-sm">ยินดีต้อนรับ — ตรวจสอบบทความที่ได้รับมอบหมายได้ที่นี่</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ pendingCount }}</p>
            <p class="text-xs text-gray-500">บทความรอตรวจ</p>
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
            <p class="text-2xl font-bold text-gray-900">{{ reviewedCount }}</p>
            <p class="text-xs text-gray-500">ตรวจแล้ว</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ completionRate }}%</p>
            <p class="text-xs text-gray-500">อัตราการตรวจ</p>
          </div>
        </div>
      </div>
    </div>

    <!-- บทความรอตรวจ -->
    <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-hidden">
      <h2 class="font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
        บทความที่ได้รับมอบหมาย
      </h2>
      
      <div v-if="isLoading" class="py-12 flex flex-col items-center justify-center text-gray-400">
        <div class="animate-spin h-8 w-8 border-4 border-gray-300 border-t-green-600 rounded-full mb-4"></div>
        <p class="text-sm">กำลังโหลดข้อมูลบทความ...</p>
      </div>

      <div v-else-if="assignedPapers.length === 0" class="text-center py-12 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-sm">ยังไม่มีบทความที่ได้รับมอบหมายในขณะนี้</p>
      </div>

      <div v-else class="overflow-x-auto -mx-6">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50 border-y border-gray-100">
            <tr>
              <th class="px-6 py-3 font-bold text-gray-600">บทความ</th>
              <th class="px-6 py-3 font-bold text-gray-600">สาขา/ประเภท</th>
              <th class="px-6 py-3 font-bold text-gray-600">สถานะการตรวจ</th>
              <th class="px-6 py-3 font-bold text-gray-600 text-right">ดำเนินการ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="item in assignedPapers" :key="item.paper_id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <p class="font-bold text-gray-900 truncate max-w-xs">{{ item.papers.title_th }}</p>
                <p class="text-[10px] text-gray-400 mt-0.5">Submitted: {{ item.papers.submitted_at }}</p>
              </td>
              <td class="px-6 py-4">
                <p class="text-gray-700 text-xs">{{ item.papers.track }}</p>
                <span class="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md">{{ item.papers.article_type }}</span>
              </td>
              <td class="px-6 py-4">
                <div v-if="item.paper_reviews?.[0]" class="flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span class="text-green-700 font-bold text-xs">ตรวจแล้ว ({{ item.paper_reviews[0].result }})</span>
                </div>
                <div v-else class="flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                  <span class="text-yellow-600 font-bold text-xs">รอการตรวจสอบ</span>
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                  <a :href="item.papers.storage_url" target="_blank" v-if="item.papers.storage_url"
                    class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="ดูไฟล์บทความ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </a>
                  <button @click="openReviewModal(item)"
                    class="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                    :class="item.paper_reviews?.[0] ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' : 'bg-green-600 text-white hover:bg-green-700'">
                    {{ item.paper_reviews?.[0] ? 'แก้ไขการตรวจ' : 'เริ่มตรวจสอบ' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ─── Review Modal ────────────────────────────────────────────────── -->
    <div v-if="showReviewModal" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div class="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden font-sarabun flex flex-col max-h-[90vh]">
        <div class="p-6 bg-green-50 border-b border-green-100 flex justify-between items-center">
          <div>
            <h2 class="font-bold text-lg text-green-800">ตรวจสอบบทความ</h2>
            <p class="text-xs text-green-600 mt-0.5">ประเมินคุณภาพและให้คะแนนบทความ</p>
          </div>
          <button @click="showReviewModal = false" class="text-green-400 hover:text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-6 overflow-y-auto">
          <div class="mb-6">
            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">ข้อมูลบทความ</label>
            <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p class="font-bold text-gray-800 text-sm mb-1">{{ selectedItem?.papers.title_th }}</p>
              <p class="text-xs text-gray-500">{{ selectedItem?.papers.title_en }}</p>
              <div class="mt-3 flex gap-2">
                <span class="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-full font-bold text-gray-600">{{ selectedItem?.papers.track }}</span>
                <span class="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-full font-bold text-gray-600">{{ selectedItem?.papers.article_type }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Result Selection -->
            <div>
              <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">ผลการประเมิน <span class="text-red-500">*</span></label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button v-for="opt in reviewOptions" :key="opt.value"
                  @click="reviewForm.result = opt.value"
                  class="p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-2 group"
                  :class="reviewForm.result === opt.value ? opt.activeClass : 'border-gray-100 hover:border-gray-200 bg-gray-50'">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                    :class="reviewForm.result === opt.value ? 'bg-white/20' : 'bg-white text-gray-400'">
                    <component :is="opt.icon" class="h-5 w-5" />
                  </div>
                  <span class="text-xs font-bold">{{ opt.label }}</span>
                </button>
              </div>
            </div>

            <!-- Comments -->
            <div>
              <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">ข้อเสนอแนะเพิ่มเติม</label>
              <textarea v-model="reviewForm.comments" rows="5"
                placeholder="ระบุข้อเสนอแนะสำหรับการปรับปรุงบทความ..."
                class="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"></textarea>
            </div>
          </div>
        </div>

        <div class="p-6 bg-gray-50 border-t border-gray-100">
          <button @click="submitReview" :disabled="!reviewForm.result || isSubmitting"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-all disabled:opacity-30 flex items-center justify-center gap-2 shadow-lg shadow-green-100">
            <svg v-if="isSubmitting" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {{ isSubmitting ? 'กำลังส่งผลการตรวจ...' : 'บันทึกผลการตรวจสอบ' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Success Feedback -->
    <div v-if="showSuccess" class="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce-in z-[100]">
      <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <p class="font-bold text-sm">บันทึกเรียบร้อย!</p>
        <p class="text-[10px] opacity-70">ส่งผลการตรวจบทความแล้ว</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  XCircleIcon 
} from '@heroicons/vue/24/outline'

// layout 'sidebar' → AppSidebar จะโหลดอัตโนมัติ (layouts/sidebar.vue)
definePageMeta({ layout: 'sidebar' })

const supabase = useSupabaseClient()
const { displayName, fetchProfile } = useUserProfile()

// ─── Data & State ────────────────────────────────────────────────────────────
const assignedPapers = ref<any[]>([])
const isLoading      = ref(false)
const pendingCount   = ref(0)
const reviewedCount  = ref(0)
const completionRate = ref(0)

const fetchAssignedPapers = async () => {
  isLoading.value = true
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Fetch assigned papers + their current review by THIS reviewer
    const { data, error } = await supabase
      .from('paper_reviewers')
      .select(`
        paper_id,
        papers(*),
        paper_reviews:paper_reviews(result, comments)
      `)
      .eq('reviewer_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Filter to only get the review for this specific reviewer (should be handled by eq in nested but Supabase is tricky)
    // Actually, paper_reviews table has reviewer_id so it should be fine if we filters it.
    // Let's refine the data
    assignedPapers.value = data?.map(item => {
      // Find the review that belongs to this user
      // Note: Supabase nested filters can be complex, so we ensure here
      return item
    }) || []

    // Calculate stats
    pendingCount.value  = assignedPapers.value.filter(p => !p.paper_reviews || p.paper_reviews.length === 0).length
    reviewedCount.value = assignedPapers.value.filter(p => p.paper_reviews && p.paper_reviews.length > 0).length
    completionRate.value = assignedPapers.value.length > 0 
      ? Math.round((reviewedCount.value / assignedPapers.value.length) * 100) 
      : 0

  } catch (err) {
    console.error('Fetch assigned papers error:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProfile()
  fetchAssignedPapers()
})

// ─── Review Modal ────────────────────────────────────────────────────────────
const showReviewModal = ref(false)
const selectedItem    = ref<any>(null)
const isSubmitting    = ref(false)
const showSuccess     = ref(false)

const reviewForm = reactive({
  result: '',
  comments: ''
})

const reviewOptions = [
  { 
    label: 'ผ่าน (Pass)', 
    value: 'pass', 
    icon: CheckCircleIcon,
    activeClass: 'border-green-600 bg-green-600 text-white shadow-lg shadow-green-100'
  },
  { 
    label: 'ผ่านมีเงื่อนไข', 
    value: 'conditional_pass', 
    icon: ExclamationCircleIcon,
    activeClass: 'border-yellow-500 bg-yellow-500 text-white shadow-lg shadow-yellow-100'
  },
  { 
    label: 'ไม่ผ่าน (Reject)', 
    value: 'reject', 
    icon: XCircleIcon,
    activeClass: 'border-red-600 bg-red-600 text-white shadow-lg shadow-red-100'
  }
]

const openReviewModal = (item: any) => {
  selectedItem.value = item
  const existingReview = item.paper_reviews?.[0]
  
  reviewForm.result   = existingReview?.result || ''
  reviewForm.comments = existingReview?.comments || ''
  
  showReviewModal.value = true
}

const submitReview = async () => {
  if (!reviewForm.result || !selectedItem.value) return
  
  isSubmitting.value = true
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Session expired')

    // UPSERT review (insert or update)
    const { error } = await supabase
      .from('paper_reviews')
      .upsert({
        paper_id: selectedItem.value.paper_id,
        reviewer_id: user.id,
        result: reviewForm.result,
        comments: reviewForm.comments,
        created_at: new Date().toISOString()
      }, {
        onConflict: 'paper_id, reviewer_id'
      })

    if (error) throw error

    showReviewModal.value = false
    showSuccess.value = true
    setTimeout(() => { showSuccess.value = false }, 3000)
    
    fetchAssignedPapers() // Refresh list
  } catch (err: any) {
    alert('เกิดข้อผิดพลาดในการบันทึกผลการตรวจ: ' + err.message)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.animate-bounce-in {
  animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes bounce-in {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); opacity: 1; }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); }
}
</style>