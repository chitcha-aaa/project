<template>
    <Navbar />
    <div class="min-h-screen bg-gray-100 font-sarabun py-6 px-4">
        <div class="max-w-5xl mx-auto flex flex-col gap-2">
            <div class="">
                <h1 class="font-semibold text-2xl">ส่งบทความใหม่</h1>
                <p class="text-sm text-gray-500">กรุณากรอกให้ครบถ้วนทั้ง 4 ขั้นตอน</p>
            </div>
            <form @submit.prevent="">
                <div class="border border-gray-300 rounded-2xl py-4 px-5">
                    <div>
                        <h1 class="font-semibold text-l">ข้อมูลทั่วไป</h1>
                    </div>
                    <div class=" grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label for="" class="text-sm font-semibold text-gray-700">ระดับผู้ส่งผลงาน</label>
                            <div class="flex gap-2 mt-1">
                                <button
                                    class="p-2 flex-1 rounded-xl text-center bg-gray-200 text-sm 
                                                focus:bg-yellow-400 focus:text-gray-900 hover:cursor-pointer hover:bg-gray-300">ปริญญาตรี</button>
                                <button
                                    class="p-2 flex-1 rounded-xl text-center bg-gray-200 text-sm 
                                                focus:bg-yellow-400 focus:text-gray-900 hover:cursor-pointer hover:bg-gray-300">บุคคลทั่วไป
                                    / นักวิจัย</button>
                            </div>
                        </div>

                        <div>
                            <label for="" class="text-sm font-semibold text-gray-700">รูปแบบการนำเสนอ</label>
                            <div class="flex gap-2 mt-1">
                                <button
                                    class="p-2 flex-1 rounded-xl text-center bg-gray-200 text-sm 
                                                focus:bg-yellow-400 focus:text-gray-900 hover:cursor-pointer hover:bg-gray-300">Online</button>
                                <button
                                    class="p-2 flex-1 rounded-xl text-center bg-gray-200 text-sm 
                                                focus:bg-yellow-400 focus:text-gray-900 hover:cursor-pointer hover:bg-gray-300">Onsite</button>
                            </div>
                        </div>

                        <!-- ประเภทบทความ -->
                        <div>
                            <label for="" class="text-sm font-semibold text-gray-700">ประเภทบทความ</label>
                            <AuthorArticleDropdownType />
                        </div>

                        <!-- กลุ่มสาขาวิชา -->
                        <div>
                            <label for="" class="text-sm font-semibold text-gray-700">กลุ่มสาขาวิชา</label>
                            <AuthorArticleDropdownmajor />
                        </div>

                        <div>
                            <label for="" class="text-sm font-semibold text-gray-700">ชื่อบทความ (ภาษาไทย)</label>
                            <input type="text" class="w-full p-2 rounded-xl bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                        </div>

                        <div>
                            <label for="" class="text-sm font-semibold text-gray-700">ชื่อบทความ (ภาษาอังกฤษ)</label>
                            <input type="text" class="w-full p-2 rounded-xl bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false) //สถานะ เปิด/ปิดเมนู
const selectedOption = ref(''); //ค่าที่ถูกเลือก
const dropdownContainer = ref(null)

const options = [
    'งานวิจัย',
    'บทความวิชาการ',
    'กรณีศึกษา'
]

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

// 3. ฟังก์ชันเมื่อผู้ใช้คลิกเลือก
const selectOption = (option) => {
    selectedOption.value = option // อัปเดตค่าที่เลือก
    isOpen.value = false // ปิดเมนู
}

// 4. ฟังก์ชันปิดเมนูเมื่อคลิกบริเวณอื่นของหน้าจอ
const handleClickOutside = (event) => {
    // ถ้าเมนูเปิดอยู่ และ จุดที่คลิก "ไม่ได้อยู่" ในกล่อง dropdownContainer
    if (isOpen.value && dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
        isOpen.value = false // สั่งปิด
    }
}

// ติดตั้ง Event Listener เมื่อ Component ถูกโหลดเสร็จ
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

// ถอด Event Listener ออกเมื่อ Component ถูกทำลาย (กันกินแรม)
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>