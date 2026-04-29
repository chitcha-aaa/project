<template>
  <!-- layout 'sidebar' → AppSidebar (ซ้าย) + เนื้อหา (ขวา) -->
  <div class="p-8 font-sarabun">

    <!-- Welcome -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">
        สวัสดี, <span class="text-gray-700">{{ displayName || 'ผู้ดูแลระบบ' }}</span>
        <span class="ml-2 text-sm bg-gray-700 text-white px-2.5 py-0.5 rounded-full font-medium">Admin</span>
      </h1>
      <p class="text-gray-500 mt-1 text-sm">จัดการระบบ BRICC — ติดตามความคืบหน้าและตัดสินผลการประเมินบทความ</p>
    </div>

    <!-- ─── Stats Cards ────────────────────────────────────────────────────── -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ reviewerCount }}</p>
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
            <p class="text-2xl font-bold text-gray-900">{{ paperCount }}</p>
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
            <p class="text-2xl font-bold text-gray-900">{{ approvedCount }}</p>
            <p class="text-xs text-gray-500">อนุมัติแล้ว</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ papersNeedingDecision.length }}</p>
            <p class="text-xs text-gray-500">รอตัดสินผล</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── Tabs Navigation ──────────────────────────────────────────────── -->
    <div class="flex gap-4 mb-6 border-b border-gray-200">
      <button @click="activeTab = 'pending'" 
        class="pb-3 px-4 text-sm font-bold transition-colors relative"
        :class="activeTab === 'pending' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'">
        มอบหมาย Reviewer
        <div v-if="activeTab === 'pending'" class="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
      </button>
      <button @click="activeTab = 'decision'" 
        class="pb-3 px-4 text-sm font-bold transition-colors relative"
        :class="activeTab === 'decision' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'">
        ตัดสินผลการประเมิน (Decision)
        <div v-if="activeTab === 'decision'" class="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
        <span v-if="papersNeedingDecision.length > 0" class="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
          {{ papersNeedingDecision.length }}
        </span>
      </button>
    </div>

    <!-- ─── TAB 1: Pending Articles ───────────────────────────────────────── -->
    <div v-if="activeTab === 'pending'" class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-hidden mb-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-base font-bold text-gray-700">บทความที่รอการมอบหมาย Reviewer</h2>
      </div>

      <div v-if="isLoadingPapers" class="py-12 flex flex-col items-center justify-center text-gray-400">
        <div class="animate-spin h-8 w-8 border-4 border-gray-300 border-t-gray-800 rounded-full mb-4"></div>
        <p class="text-sm">กำลังโหลดข้อมูล...</p>
      </div>

      <div v-else-if="pendingAssignmentPapers.length === 0" class="py-12 text-center text-gray-400">
        <p class="text-sm">ไม่มีบทความที่รอการมอบหมาย</p>
      </div>

      <div v-else class="overflow-x-auto -mx-6">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50 border-y border-gray-100">
            <tr>
              <th class="px-6 py-3 font-bold text-gray-600">ชื่อบทความ</th>
              <th class="px-6 py-3 font-bold text-gray-600">ผู้ส่ง</th>
              <th class="px-6 py-3 font-bold text-gray-600">Reviewer</th>
              <th class="px-6 py-3 font-bold text-gray-600 text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="paper in pendingAssignmentPapers" :key="paper.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <p class="font-bold text-gray-900 truncate max-w-xs">{{ paper.title_th }}</p>
                <p class="text-[10px] text-gray-400">{{ paper.track }}</p>
              </td>
              <td class="px-6 py-4">
                <p class="text-gray-700">{{ paper.profiles?.firstname_th }} {{ paper.profiles?.lastname_th }}</p>
              </td>
              <td class="px-6 py-4">
                <div class="flex -space-x-2">
                  <div v-for="i in 3" :key="i" 
                    class="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-sm"
                    :class="paper.paper_reviewers?.[i-1] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'">
                    {{ paper.paper_reviewers?.[i-1] ? (paper.paper_reviewers[i-1].profiles?.firstname_th?.[0] || 'R') : '?' }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <button @click="openAssignmentModal(paper)"
                  class="text-xs font-bold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                  มอบหมาย
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ─── TAB 2: Decision Section ──────────────────────────────────────── -->
    <div v-if="activeTab === 'decision'" class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm overflow-hidden mb-6">
      <div class="mb-6 flex justify-between items-center">
        <div>
          <h2 class="text-base font-bold text-gray-700">การตัดสินผลขั้นสุดท้าย (Final Decision)</h2>
          <p class="text-xs text-gray-500 mt-1">คัดเลือก 20 บทความสุดท้ายเพื่อประกาศผล</p>
        </div>
        <div class="bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl border border-blue-100">
          <p class="text-xs font-bold">อนุมัติแล้ว: {{ approvedCount }} / 20</p>
        </div>
      </div>

      <div v-if="papersNeedingDecision.length === 0" class="py-12 text-center text-gray-400">
        <p class="text-sm">ไม่มีบทความที่รอการตัดสินในขณะนี้</p>
      </div>

      <div v-else class="overflow-x-auto -mx-6">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50 border-y border-gray-100">
            <tr>
              <th class="px-6 py-3 font-bold text-gray-600">ชื่อบทความ</th>
              <th class="px-6 py-3 font-bold text-gray-600 text-center">ผลจาก Reviewer (3)</th>
              <th class="px-6 py-3 font-bold text-gray-600 text-center">ผลลัพธ์คำนวณ</th>
              <th class="px-6 py-3 font-bold text-gray-600 text-right">การตัดสินใจ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="paper in papersNeedingDecision" :key="paper.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <p class="font-bold text-gray-900 truncate max-w-xs">{{ paper.title_th }}</p>
                <p class="text-[10px] text-gray-400">{{ paper.profiles?.firstname_th }} {{ paper.profiles?.lastname_th }}</p>
              </td>
              <td class="px-6 py-4 text-center">
                <div class="flex justify-center gap-1">
                  <div v-for="(rev, idx) in paper.paper_reviews" :key="idx" 
                    class="w-6 h-6 rounded-lg flex items-center justify-center shadow-sm"
                    :class="getResultColor(rev.result)" :title="rev.comments">
                    <svg v-if="rev.result === 'pass'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span v-else-if="rev.result === 'conditional_pass'" class="text-[10px] font-bold">!</span>
                    <span v-else class="text-[10px] font-bold">X</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="px-2 py-1 rounded-full text-[10px] font-bold" :class="getDecisionBadge(paper.paper_reviews)">
                  {{ getDecisionLabel(paper.paper_reviews) }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                  <button @click="finalizeDecision(paper, 'approved')"
                    class="bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm">
                    อนุมัติ (Pass)
                  </button>
                  <button @click="finalizeDecision(paper, 'rejected')"
                    class="bg-red-50 text-red-600 hover:bg-red-100 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-red-100">
                    ปฏิเสธ
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ─── Assignment Modal ──────────────────────────────────────────────── -->
    <div v-if="showAssignmentModal" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div class="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden font-sarabun flex flex-col max-h-[90vh]">
        <div class="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 class="font-bold text-lg text-gray-800">มอบหมาย Reviewer</h2>
            <p class="text-xs text-gray-500 mt-0.5">เลือก Reviewer จำนวน 3 ท่านสำหรับบทความนี้</p>
          </div>
          <button @click="showAssignmentModal = false" class="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-6 overflow-y-auto">
          <div class="mb-6">
            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">บทความที่เลือก</label>
            <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p class="font-bold text-gray-800 text-sm">{{ selectedPaper?.title_th }}</p>
              <p class="text-xs text-gray-500 mt-1">ผู้ส่ง: {{ selectedPaper?.profiles?.firstname_th }} {{ selectedPaper?.profiles?.lastname_th }}</p>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-3">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-widest">รายชื่อ Reviewer (เลือก {{ selectedReviewers.length }}/3)</label>
              <div v-if="selectedReviewers.length === 3" class="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold animate-pulse">
                ครบถ้วนแล้ว
              </div>
            </div>
            
            <div class="grid grid-cols-1 gap-2">
              <div v-for="rev in allReviewers" :key="rev.id" 
                @click="toggleReviewer(rev.id)"
                class="flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group"
                :class="selectedReviewers.includes(rev.id) ? 'border-gray-800 bg-gray-800 text-white shadow-md' : 'border-gray-200 hover:border-gray-400 text-gray-700'">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs"
                    :class="selectedReviewers.includes(rev.id) ? 'bg-white/20' : 'bg-gray-100'">
                    {{ rev.firstname_th?.[0] || 'R' }}
                  </div>
                  <div>
                    <p class="text-sm font-bold">{{ rev.firstname_th }} {{ rev.lastname_th }}</p>
                    <p class="text-[10px] opacity-60">{{ rev.expertise || 'ไม่ระบุความเชี่ยวชาญ' }}</p>
                  </div>
                </div>
                <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
                  :class="selectedReviewers.includes(rev.id) ? 'bg-white border-white' : 'border-gray-200 group-hover:border-gray-400'">
                  <svg v-if="selectedReviewers.includes(rev.id)" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 bg-gray-50 border-t border-gray-100">
          <button @click="saveAssignments" :disabled="selectedReviewers.length !== 3 || isSavingAssignments"
            class="w-full bg-[#1A1A1A] hover:bg-[#404040] text-white font-bold py-3 rounded-2xl transition-all disabled:opacity-30 flex items-center justify-center gap-2">
            <svg v-if="isSavingAssignments" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {{ isSavingAssignments ? 'กำลังบันทึก...' : 'บันทึกการมอบหมาย' }}
          </button>
        </div>
      </div>
    </div>

    <!-- ─── Success Modal (Shared) ─────────────────────────────────────────── -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div class="bg-white p-8 rounded-[40px] w-full max-w-[400px] shadow-2xl flex flex-col items-center font-sarabun">
        <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="font-bold text-2xl mb-2 text-gray-800 text-center">{{ successTitle }}</h2>
        <p class="text-sm text-gray-500 mb-8 text-center" v-html="successMessage"></p>
        <button @click="showSuccessModal = false"
          class="w-full bg-gray-100 text-gray-700 py-3 rounded-2xl font-bold hover:bg-gray-200 transition cursor-pointer">
          ปิดหน้าต่าง
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
// layout 'sidebar' → AppSidebar โหลดอัตโนมัติจาก layouts/sidebar.vue
definePageMeta({ layout: 'sidebar' })

const supabase = useSupabaseClient()
const { displayName, fetchProfile } = useUserProfile()

// ─── Stats & Tabs ────────────────────────────────────────────────────────────
const activeTab = ref('pending')
const reviewerCount = ref(0)
const paperCount    = ref(0)
const approvedCount = ref(0)
const pendingAssignmentPapers = ref<any[]>([])
const papersNeedingDecision   = ref<any[]>([])
const allReviewers            = ref<any[]>([])
const isLoadingPapers         = ref(false)

const fetchAllData = async () => {
  isLoadingPapers.value = true
  try {
    // 1. Stats
    const { count: revCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'reviewer')
    const { count: pCount }   = await supabase.from('papers').select('*', { count: 'exact', head: true })
    const { count: appCount } = await supabase.from('papers').select('*', { count: 'exact', head: true }).eq('status', 'approved')
    
    reviewerCount.value = revCount || 0
    paperCount.value    = pCount || 0
    approvedCount.value = appCount || 0

    // 2. Fetch all non-approved papers with details
    const { data: papers } = await supabase
      .from('papers')
      .select(`
        *,
        profiles!papers_author_id_fkey(firstname_th, lastname_th),
        paper_reviewers(reviewer_id, profiles(firstname_th, lastname_th)),
        paper_reviews(result, comments)
      `)
      .neq('status', 'approved')
      .order('submitted_at', { ascending: false })

    if (papers) {
      // Split into assignment vs decision
      pendingAssignmentPapers.value = papers.filter(p => !p.paper_reviewers || p.paper_reviewers.length < 3)
      papersNeedingDecision.value   = papers.filter(p => p.paper_reviews && p.paper_reviews.length >= 1) 
    }

    // 3. All Reviewers for selection
    const { data: reviewers } = await supabase
      .from('profiles')
      .select('id, firstname_th, lastname_th, expertise')
      .eq('role', 'reviewer')
    
    allReviewers.value = reviewers || []
  } catch (err) {
    console.error('Fetch error:', err)
  } finally {
    isLoadingPapers.value = false
  }
}

onMounted(() => {
  fetchProfile()
  fetchAllData()
})

// ─── Assignment Logic ─────────────────────────────────────────────────────────
const showAssignmentModal  = ref(false)
const selectedPaper        = ref<any>(null)
const selectedReviewers    = ref<string[]>([])
const isSavingAssignments  = ref(false)
const showSuccessModal     = ref(false)
const successTitle         = ref('')
const successMessage       = ref('')

const openAssignmentModal = (paper: any) => {
  selectedPaper.value = paper
  selectedReviewers.value = paper.paper_reviewers?.map((r: any) => r.reviewer_id) || []
  showAssignmentModal.value = true
}

const toggleReviewer = (id: string) => {
  if (selectedReviewers.value.includes(id)) {
    selectedReviewers.value = selectedReviewers.value.filter(rid => rid !== id)
  } else if (selectedReviewers.value.length < 3) {
    selectedReviewers.value.push(id)
  }
}

const saveAssignments = async () => {
  if (selectedReviewers.value.length !== 3) return
  isSavingAssignments.value = true
  try {
    await supabase.from('paper_reviewers').delete().eq('paper_id', selectedPaper.value.id)
    const toInsert = selectedReviewers.value.map(rid => ({
      paper_id: selectedPaper.value.id,
      reviewer_id: rid
    }))
    const { error } = await supabase.from('paper_reviewers').insert(toInsert)
    if (error) throw error

    showAssignmentModal.value = false
    successTitle.value   = 'มอบหมายสำเร็จ!'
    successMessage.value = `มอบหมาย Reviewer 3 ท่าน เรียบร้อยแล้ว`
    showSuccessModal.value = true
    fetchAllData()
  } catch (err: any) {
    alert('Error: ' + err.message)
  } finally {
    isSavingAssignments.value = false
  }
}

// ─── Decision Logic ───────────────────────────────────────────────────────────
const getResultColor = (res: string) => {
  if (res === 'pass') return 'bg-green-500 text-white'
  if (res === 'conditional_pass') return 'bg-yellow-400 text-white'
  return 'bg-red-500 text-white'
}

const getDecisionLabel = (reviews: any[]) => {
  if (!reviews || reviews.length === 0) return 'รอผลตรวจ'
  const passes = reviews.filter(r => r.result === 'pass').length
  const conds = reviews.filter(r => r.result === 'conditional_pass').length
  
  if (passes >= 2) return 'ผ่านเกณฑ์ (2/3)'
  if (conds > 0) return 'ผ่านมีเงื่อนไข (Admin ตรวจ)'
  if (reviews.length === 3 && passes < 2) return 'ไม่ผ่านเกณฑ์'
  return `รอตรวจ (${reviews.length}/3)`
}

const getDecisionBadge = (reviews: any[]) => {
  const label = getDecisionLabel(reviews)
  if (label.includes('ผ่านเกณฑ์')) return 'bg-green-100 text-green-700'
  if (label.includes('ผ่านมีเงื่อนไข')) return 'bg-yellow-100 text-yellow-700'
  if (label.includes('ไม่ผ่าน')) return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-500'
}

const finalizeDecision = async (paper: any, status: string) => {
  if (!confirm(`คุณแน่ใจหรือไม่ว่าต้องการ ${status === 'approved' ? 'อนุมัติ' : 'ปฏิเสธ'} บทความนี้?`)) return
  
  try {
    const { error } = await supabase
      .from('papers')
      .update({ status: status } as never)
      .eq('id', paper.id)
    
    if (error) throw error
    
    successTitle.value   = status === 'approved' ? 'อนุมัติสำเร็จ!' : 'ดำเนินการสำเร็จ'
    successMessage.value = `บทความ <strong>"${paper.title_th}"</strong> ได้ถูกตัดสินผลเรียบร้อยแล้ว`
    showSuccessModal.value = true
    fetchAllData()
  } catch (err: any) {
    alert('เกิดข้อผิดพลาด: ' + err.message)
  }
}
</script>