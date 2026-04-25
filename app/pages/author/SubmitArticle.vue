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
                            <div ref="dropdownContainer" @click="toggleDropdown"
                                class="relative bg-slate-300 w-full max-w-[300px] h-10 p-2 rounded-xl flex items-center mt-1 hover:cursor-pointer">
                                <div class="text-sm"
                                    :class="selectedOption ? 'text-gray-900 font-medium' : 'text-slate-600'">
                                    <p>{{ selectedOption || 'โปรดเลือกประเภท' }}</p>
                                </div>
                                <div id="dropdown_icon" class="w-5 h-5 ml-auto flex justify-center items-center transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6"
                                        :class="{ 'rotate-180': isOpen }">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>

                                <!-- กล่องเมนู -->
                                <div v-show="isOpen"
                                    class="absolute left-0 top-full mt-1 w-full bg-slate-300 rounded-xl shadow-lg z-10 overflow-hidden p-2">
                                    <ul class="text-sm text-black">
                                        <li v-for="(option, index) in options" :key="index"
                                            @click.stop="selectOption(option)"
                                            class="px-4 py-2 hover:bg-slate-100 cursor-pointer transition-colors rounded-xl ">
                                            {{ option }}
                                        </li>
                                    </ul>
                                </div>
                            </div>


                        </div>

                        <!-- กลุ่มสาขาวิชา -->
                        <div>
                            <label for="" class="text-sm font-semibold text-gray-700">กลุ่มสาขาวิชา</label>
                            <div ref="dropdownContainer" @click="toggleDropdown"
                                class="relative bg-slate-300 w-full max-w-[300px] h-10 p-2 rounded-xl flex items-center mt-1 hover:cursor-pointer">
                                <div class="text-sm"
                                    :class="selectedOption ? 'text-gray-900 font-medium' : 'text-slate-600'">
                                    <p>{{ selectedOption || 'โปรดเลือกกลุ่มสาขาวิชา' }}</p>
                                </div>
                                <div id="dropdown_icon" class="w-5 h-5 ml-auto flex justify-center items-center transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6"
                                        :class="{ 'rotate-180': isOpen }">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>

                                <!-- กล่องเมนู -->
                                <div v-show="isOpen"
                                    class="absolute left-0 top-full mt-1 w-full bg-slate-300 rounded-xl shadow-lg z-10 overflow-hidden p-2">
                                    <ul class="text-sm text-black">
                                        <li v-for="(option, index) in options" :key="index"
                                            @click.stop="selectOption(option)"
                                            class="px-4 py-2 hover:bg-slate-100 cursor-pointer transition-colors rounded-xl ">
                                            {{ option }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
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