<template>
    <Navbar />
    <div class="min-h-screen bg-gray-100 font-sarabun py-6 px-4">
        <div class="max-w-5xl mx-auto flex flex-col gap-2">
            <div class="">
                <h1 class="font-semibold text-2xl">ส่งบทความใหม่</h1>
                <p class="text-sm text-gray-500">กรุณากรอกให้ครบถ้วนทั้ง 4 ขั้นตอน</p>
            </div>
            <form @submit.prevent="">
                <div class="border border-gray-300 bg-white rounded-2xl py-4 px-5">
                    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div class="flex flex-col gap-2">
                            <div>
                                <h1 class="font-semibold text-lg">ข้อมูลทั่วไป</h1>
                            </div>

                            <div class="w-full h-[1px] bg-gray-400"></div>

                            <div>
                                <label for="" class="text-sm font-semibold text-gray-700">ระดับผู้ส่งผลงาน</label>
                                <div class="flex gap-2 mt-1">
                                    <button type="button" @click="form.submitter_level = 'ปริญญาตรี'"
                                        :class="form.submitter_level === 'ปริญญาตรี' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-700'"
                                        class="p-2 flex-1 rounded-xl text-center text-sm hover:cursor-pointer hover:bg-yellow-300 transition-colors">ปริญญาตรี</button>
                                    <button type="button" @click="form.submitter_level = 'บุคคลทั่วไป / นักวิจัย'"
                                        :class="form.submitter_level === 'บุคคลทั่วไป / นักวิจัย' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-700'"
                                        class="p-2 flex-1 rounded-xl text-center text-sm hover:cursor-pointer hover:bg-yellow-300 transition-colors">บุคคลทั่วไป / นักวิจัย</button>
                                </div>
                            </div>

                            <div>
                                <label for="" class="text-sm font-semibold text-gray-700">รูปแบบการนำเสนอ</label>
                                <div class="flex gap-2 mt-1">
                                    <button type="button" @click="form.presentation_format = 'Online'"
                                        :class="form.presentation_format === 'Online' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-700'"
                                        class="p-2 flex-1 rounded-xl text-center text-sm hover:cursor-pointer hover:bg-yellow-300 transition-colors">Online</button>
                                    <button type="button" @click="form.presentation_format = 'Onsite'"
                                        :class="form.presentation_format === 'Onsite' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-700'"
                                        class="p-2 flex-1 rounded-xl text-center text-sm hover:cursor-pointer hover:bg-yellow-300 transition-colors">Onsite</button>
                                </div>
                            </div>

                            <div class="mt-2">
                                <h1 class="font-semibold text-lg">เพิ่มผู้ร่วมเขียน</h1>
                            </div>

                            <div class="w-full h-[1px] bg-gray-400"></div>

                            <!-- Author List -->
                            <div class="flex flex-col gap-2 w-full mt-2">
                                <div v-for="(author, index) in authors" :key="index" draggable="true"
                                    @dragstart="handleDragStart(index)" @dragover.prevent @drop="handleDrop(index)"
                                    class="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl shadow-sm cursor-move hover:bg-gray-50 transition-colors">

                                    <div class="flex items-center gap-3">
                                        <div
                                            class="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full text-xs font-semibold text-gray-700">
                                            {{ author.order_index }}
                                        </div>
                                        <div class="flex flex-col">
                                            <span class="text-sm font-semibold text-gray-800">
                                                <template
                                                    v-if="author.firstname_th || author.lastname_th || author.firstname_en || author.lastname_en">
                                                    {{ author.academic_position }} {{ author.title_name }}
                                                    {{ author.firstname_th || author.firstname_en }}
                                                    {{ author.lastname_th || author.lastname_en }}
                                                </template>
                                                <template v-else>
                                                    <span
                                                        class="text-gray-400 font-normal italic">(ยังไม่ระบุชื่อ-นามสกุล)
                                                        Debug: {{ debugMsg }}</span>
                                                </template>
                                            </span>
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-2">
                                        <button type="button" @click.prevent="openEditAuthorModal(index)"
                                            class="p-1 text-blue-500 hover:bg-blue-100 rounded-md transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-4">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                        <button type="button" @click.prevent="removeAuthor(index)"
                                            class="p-1 text-red-500 hover:bg-red-100 rounded-md transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-4">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div @click="openAddAuthorModal"
                                class="w-full mt-2 py-3 px-2 border border-dashed rounded-xl flex justify-center hover:cursor-pointer hover:bg-green-200 hover:border-green-500 hover:text-green-500 transition-colors">
                                <div class="w-full h-8 flex items-center gap-2 justify-center">
                                    <div class="">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="size-4">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </div>
                                    <div class="text-sm">
                                        <p>เพิ่มผู้ร่วมเขียน</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- ประเภทบทความ -->
                        <div class="flex flex-col gap-2">
                            <div>
                                <h1 class="font-semibold text-lg">ข้อมูลบทความ</h1>
                            </div>

                            <div class="w-full h-[1px] bg-gray-400"></div>

                            <div>
                                <label for="" class="text-sm font-semibold text-gray-700">ประเภทบทความ</label>
                                <AuthorArticleDropdownType v-model="form.article_type" />
                            </div>

                            <!-- กลุ่มสาขาวิชา -->
                            <div>
                                <label for="" class="text-sm font-semibold text-gray-700">กลุ่มสาขาวิชา</label>
                                <AuthorArticleDropdownmajor v-model="form.major_group" />
                            </div>

                            <div>
                                <label for="" class="text-sm font-semibold text-gray-700">keywords</label>
                                <AuthorArticleDropdownkeywords v-model="form.keywords" />
                            </div>

                            <div>
                                <label for="" class="text-sm font-semibold text-gray-700">ชื่อบทความ (ภาษาไทย)</label>
                                <input v-model="form.title_th" type="text"
                                    class="w-full p-2 mt-1 rounded-xl bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                            </div>

                            <div>
                                <label for="" class="text-sm font-semibold text-gray-700">ชื่อบทความ
                                    (ภาษาอังกฤษ)</label>
                                <input v-model="form.title_en" type="text"
                                    class="w-full mt-1 p-2 rounded-xl bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                            </div>

                            <div>
                                <label for="" class="text-sm font-semibold text-gray-700">บทคัดย่อ (ภาษาไทย)</label>
                                <textarea v-model="form.abstract_th" rows="5"
                                    class="w-full mt-1 p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-yellow-500"
                                    placeholder="ระบุบทคัดย่อภาษาไทย..."></textarea>
                            </div>

                            <div>
                                <label for="" class="text-sm font-semibold text-gray-700">บทคัดย่อ (ภาษาอังกฤษ)</label>
                                <textarea v-model="form.abstract_en" rows="5"
                                    class="w-full mt-1 p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-yellow-500"
                                    placeholder="ระบุบทคัดย่อภาษาอังกฤษ..."></textarea>
                            </div>

                            <div>
                                <label for="" class="text-sm font-semibold text-gray-700">อัพโหลดไฟล์บทความ (PDF)</label>
                                <div @click="triggerFileInput" @dragover.prevent @drop="handleFileDrop"
                                    class="w-full border-2 border-dashed rounded-[5px] mt-1 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                                    :class="file ? 'border-green-400 bg-green-50' : 'border-gray-300'">
                                    
                                    <input type="file" ref="fileInput" @change="handleFileSelect" accept="application/pdf" class="hidden">
                                    
                                    <div v-if="!file" class="w-full max-w-[250px] mx-auto text-gray-500">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-8 mx-auto">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                                            </svg>
                                        </div>
                                        <div class="mt-2">
                                            <p class="text-sm text-center font-medium">คลิกเพื่ออัพโหลด หรือ ลากไฟล์มาวาง</p>
                                        </div>
                                        <div>
                                            <p class="text-xs text-center mt-1">รองรับไฟล์ PDF ขนาดไม่เกิน 10 MB</p>
                                        </div>
                                    </div>
                                    <div v-else class="w-full px-6 flex items-center justify-between">
                                        <div class="flex items-center gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.688h1.59v1.527h-1.59v3.023h-1.611v-8.238h4.239v-1.118v1.118zm-4.706-1.118h-1.669v8.238h1.832c2.091 0 2.831-1.393 2.831-3.662v-1.189c0-1.996-.549-3.387-2.994-3.387zm-1.597 1.706h.914c.83 0 1.258.423 1.258 1.831v1.144c0 1.488-.231 1.857-1.187 1.857h-.985v-4.832zm-5.011 4.708h-1.077v1.824h-1.611v-8.238h2.955c1.921 0 2.766 1.054 2.766 3.011v.439c0 2.215-.992 2.964-3.033 2.964zm-1.077-1.424h1.161c.883 0 1.283-.418 1.283-1.613v-.357c0-1.066-.312-1.481-1.229-1.481h-1.215v3.451z"/></svg>
                                            <div class="flex flex-col">
                                                <span class="text-sm font-semibold text-gray-800">{{ file.name }}</span>
                                                <span class="text-xs text-gray-500">{{ (file.size / (1024 * 1024)).toFixed(2) }} MB</span>
                                            </div>
                                        </div>
                                        <button type="button" @click.stop="removeFile" class="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ปุ่มยกเลิก / ส่งบทความ -->
                <div class="w-full flex justify-end mt-1">
                    <div class="w-full max-w-[300px] pt-2 flex gap-2 justify-around text-sm">
                        <div class="bg-gray-200 flex-1 py-2 text-center rounded-xl hover:cursor-pointer hover:bg-red-400 hover:text-white">
                            ยกเลิก
                        </div>

                        <button type="button" @click="submitArticle" :disabled="isSubmitting"
                            class="bg-gray-200 flex-1 py-2 text-center rounded-xl hover:cursor-pointer hover:bg-yellow-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งบทความ' }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- Co-Author Modal -->
    <div v-if="showAuthorModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-sarabun">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div class="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold">{{ editingIndex > -1 ? 'แก้ไขผู้ร่วมเขียน' : 'เพิ่มผู้ร่วมเขียน' }}
                </h3>
                <button @click="showAuthorModal = false" class="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">ตำแหน่งทางวิชาการ</label>
                        <select v-model="authorForm.academic_position"
                            class="w-full p-2 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                            <option value="">ไม่มี / ไม่ระบุ</option>
                            <option v-for="pos in academicPositions" :key="pos" :value="pos">{{ pos }}</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">คำนำหน้าชื่อ</label>
                        <select v-model="authorForm.title_name"
                            class="w-full p-2 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                            <option value="">ไม่มี / ไม่ระบุ</option>
                            <option v-for="title in titleNames" :key="title" :value="title">{{ title }}</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">ชื่อ (TH)</label>
                        <input v-model="authorForm.firstname_th" type="text"
                            class="w-full p-2 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">นามสกุล (TH)</label>
                        <input v-model="authorForm.lastname_th" type="text"
                            class="w-full p-2 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">ชื่อ (EN)</label>
                        <input v-model="authorForm.firstname_en" type="text"
                            class="w-full p-2 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">นามสกุล (EN)</label>
                        <input v-model="authorForm.lastname_en" type="text"
                            class="w-full p-2 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">อีเมล</label>
                    <input v-model="authorForm.email" type="email"
                        class="w-full p-2 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                </div>
            </div>

            <div class="p-4 border-t border-gray-200 flex justify-end gap-2">
                <button @click="showAuthorModal = false" type="button"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">ยกเลิก</button>
                <button @click="saveAuthor" type="button"
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-500 rounded-xl transition-colors">บันทึก</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const { profile, fetchProfile } = useUserProfile()
const user = useSupabaseUser()

// ----------------------------------------
// Data Binding & Main Form
// ----------------------------------------
const form = ref({
    submitter_level: '',
    presentation_format: '',
    article_type: '',
    major_group: '',
    keywords: '',
    title_th: '',
    title_en: '',
    abstract_th: '',
    abstract_en: ''
})

// ----------------------------------------
// File Upload Logic
// ----------------------------------------
const file = ref(null)
const fileInput = ref(null)

const triggerFileInput = () => {
    fileInput.value.click()
}

const handleFileDrop = (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        setFile(e.dataTransfer.files[0])
    }
}

const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0])
    }
}

const setFile = (selectedFile) => {
    if (selectedFile.type !== 'application/pdf') {
        alert('กรุณาอัพโหลดไฟล์ PDF เท่านั้น')
        return
    }
    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB
        alert('ขนาดไฟล์ต้องไม่เกิน 10 MB')
        return
    }
    file.value = selectedFile
}

const removeFile = () => {
    file.value = null
    if (fileInput.value) fileInput.value.value = ''
}

// ----------------------------------------
// Dropdown Logic
// ----------------------------------------
const isOpen = ref(false)
const selectedOption = ref('')
const dropdownContainer = ref(null)

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}
const selectOption = (option) => {
    selectedOption.value = option
    isOpen.value = false
}
const handleClickOutside = (event) => {
    if (isOpen.value && dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
        isOpen.value = false
    }
}

// ----------------------------------------
// Submission Logic
// ----------------------------------------
const isSubmitting = ref(false)

const submitArticle = async () => {
    // 1. Validation
    if (!form.value.submitter_level || !form.value.presentation_format || !form.value.title_th || !file.value) {
        alert('กรุณากรอกข้อมูลที่จำเป็น (ระดับผู้ส่ง, รูปแบบ, ชื่อบทความ) และอัพโหลดไฟล์บทความให้ครบถ้วน')
        return
    }

    if (authors.value.length === 0) {
        alert('กรุณาเพิ่มผู้ร่วมเขียนอย่างน้อย 1 ท่าน (รวมตัวท่านเอง)')
        return
    }

    isSubmitting.value = true

    try {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (!authUser) {
            alert('กรุณาเข้าสู่ระบบก่อนส่งบทความ')
            isSubmitting.value = false
            return
        }

        // 2. Insert into `papers`
        const paperData = {
            author_id: authUser.id,
            submitter_level: form.value.submitter_level,
            presentation_type: form.value.presentation_format,
            article_type: form.value.article_type,
            track: form.value.major_group,
            keywords: form.value.keywords,
            title_th: form.value.title_th,
            title_en: form.value.title_en,
            abstract_th: form.value.abstract_th,
            abstrract_en: form.value.abstract_en, // Typo matches DB exactly
            status: 'pending',
            submitted_at: new Date().toISOString().split('T')[0]
        }

        const { data: insertedPaper, error: paperError } = await supabase
            .from('papers')
            .insert([paperData])
            .select()
            .single()

        if (paperError) throw new Error('ไม่สามารถบันทึกข้อมูลบทความได้: ' + paperError.message)

        const paperId = insertedPaper.id

        // 3. Upload File to Storage
        const fileExt = file.value.name.split('.').pop()
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
        const filePath = `${authUser.id}/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('paper_files') // Ensure this bucket exists in Supabase!
            .upload(filePath, file.value)

        if (uploadError) throw new Error('อัพโหลดไฟล์ไม่สำเร็จ: ' + uploadError.message)

        const { data: publicUrlData } = supabase.storage
            .from('paper_files')
            .getPublicUrl(filePath)

        // 4. Insert into `paper_files`
        const paperFileData = {
            paper_id: paperId,
            file_name: file.value.name,
            file_type: 'manuscript',
            mime_type: file.value.type,
            file_size_bytes: file.value.size,
            storage_url: publicUrlData.publicUrl
        }

        const { error: fileDbError } = await supabase
            .from('paper_files')
            .insert([paperFileData])

        if (fileDbError) throw new Error('บันทึกข้อมูลไฟล์ไม่สำเร็จ: ' + fileDbError.message)

        // 5. Insert into `paper_authors`
        const authorsData = authors.value.map(a => ({
            paper_id: paperId,
            title_name: a.title_name,
            academic_position: a.academic_position,
            firstname_th: a.firstname_th,
            lastname_th: a.lastname_th,
            firstname_en: a.firstname_en,
            lastname_en: a.lastname_en,
            email: a.email,
            order_index: a.order_index
        }))

        const { error: authorsError } = await supabase
            .from('paper_authors')
            .insert(authorsData)

        if (authorsError) throw new Error('บันทึกรายชื่อผู้ร่วมเขียนไม่สำเร็จ: ' + authorsError.message)

        // Success
        alert('ส่งบทความสำเร็จ! รอการตรวจสอบจากเจ้าหน้าที่')
        
        // Reset form or navigate away
        window.location.reload()
        
    } catch (error) {
        console.error('Error submitting article:', error)
        alert('เกิดข้อผิดพลาด: ' + error.message)
    } finally {
        isSubmitting.value = false
    }
}

// ----------------------------------------
// Co-Author Logic
// ----------------------------------------
const authors = ref([])
const showAuthorModal = ref(false)
const editingIndex = ref(-1)
const draggedIndex = ref(null)

// Form data for the modal
const authorForm = ref({
    academic_position: '',
    title_name: '',
    firstname_th: '',
    lastname_th: '',
    firstname_en: '',
    lastname_en: '',
    email: ''
})

const resetAuthorForm = () => {
    authorForm.value = {
        academic_position: '',
        title_name: '',
        firstname_th: '',
        lastname_th: '',
        firstname_en: '',
        lastname_en: '',
        email: ''
    }
}

const openAddAuthorModal = () => {
    resetAuthorForm()
    editingIndex.value = -1
    showAuthorModal.value = true
}

const openEditAuthorModal = (index) => {
    authorForm.value = { ...authors.value[index] }
    editingIndex.value = index
    showAuthorModal.value = true
}

const saveAuthor = () => {
    // Check required fields (example)
    if (!authorForm.value.firstname_th || !authorForm.value.lastname_th) {
        alert('กรุณากรอกชื่อและนามสกุล')
        return
    }

    if (editingIndex.value > -1) {
        // Edit existing
        authors.value[editingIndex.value] = { ...authorForm.value, order_index: editingIndex.value + 1 }
    } else {
        // Add new
        authors.value.push({ ...authorForm.value, order_index: authors.value.length + 1 })
    }

    showAuthorModal.value = false
    resetAuthorForm()
}

const removeAuthor = (index) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผู้ร่วมเขียนท่านนี้?')) {
        authors.value.splice(index, 1)
        updateAuthorOrder()
    }
}

// Update order_index after drag and drop or deletion
const updateAuthorOrder = () => {
    authors.value.forEach((author, index) => {
        author.order_index = index + 1
    })
}

// Drag and drop event handlers
const handleDragStart = (index) => {
    draggedIndex.value = index
}

const handleDrop = (index) => {
    if (draggedIndex.value !== null && draggedIndex.value !== index) {
        const draggedItem = authors.value.splice(draggedIndex.value, 1)[0]
        authors.value.splice(index, 0, draggedItem)
        updateAuthorOrder()
    }
    draggedIndex.value = null
}

const debugMsg = ref('')

// Dropdown options
const titleNames = [
    'นาย',
    'นาง',
    'นางสาว',
    'ดร.',
    'นพ.',
    'พญ.',
    'อื่นๆ'
]

const academicPositions = [
    'ศาสตราจารย์ (ศ.)',
    'รองศาสตราจารย์ (รศ.)',
    'ผู้ช่วยศาสตราจารย์ (ผศ.)',
    'อาจารย์',
    'อาจารย์พิเศษ',
    'นักวิจัย',
    'นักวิทยาศาสตร์',
    'นักศึกษาระดับบัณฑิตศึกษา',
    'นักศึกษา',
    'อื่นๆ',
]

// Initialize Supabase Client
const supabase = useSupabaseClient()

const populateFirstAuthor = async () => {
    // Get the authenticated user safely
    const { data: { user: authUser } } = await supabase.auth.getUser()
    if (!authUser) return;

    // Check if we already added the first author placeholder
    if (authors.value.length === 0) {
        authors.value.push({
            academic_position: '',
            title_name: '',
            firstname_th: '',
            lastname_th: '',
            firstname_en: '',
            lastname_en: '',
            email: authUser.email || '',
            order_index: 1
        })
    }

    // Direct fetch to guarantee data retrieval
    try {
        debugMsg.value = `Fetching profile... `
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();

        if (error) {
            debugMsg.value += `Error: ${error.message}`
        } else if (data) {
            debugMsg.value += `Success!`

            // Force Vue reactivity by replacing the object
            authors.value[0] = {
                ...authors.value[0],
                academic_position: data.academic_position || '',
                title_name: data.title_name || '',
                firstname_th: data.firstname_th || '',
                lastname_th: data.lastname_th || '',
                firstname_en: data.firstname_eng || '',
                lastname_en: data.lastname_eng || ''
            };

            // Clear debug message on success if you want, but leaving it to be sure
            setTimeout(() => { debugMsg.value = '' }, 3000)
        } else {
            debugMsg.value += `No data found.`
        }
    } catch (err) {
        debugMsg.value += `Exception: ${err.message}`
        console.error('Error fetching profile for author list:', err);
    }
}

// Watch user and populate
watch(user, (newUser) => {
    if (newUser) {
        populateFirstAuthor()
    }
}, { immediate: true })

// Lifecycle Hooks
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>