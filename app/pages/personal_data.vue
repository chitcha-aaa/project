<template>
    <p class="text-2xl font-bold pb-1">กรอกข้อมูลส่วนตัว</p>

    <div class="bg-white p-4 border border-gray-300 rounded-2xl mt-4">
        <p class="font-sarabun text-small font-bold">ข้อมูลส่วนตัว</p>
        <div class="flex flex-col mt-2">
            <label class="font-bold text-gray-500 font-sarabun text-[13px] mb-1">คำนำหน้าชื่อ</label>
            <div class="flex  sm:flex-row">
                <div class="flex w-full gap-4 sm:w-1/2">
                    <div class="flex items-center gap-1">
                        <input type="radio" class="text-black w-4 h-4 translate-y-[1.5px]">
                        <span class="text-sm">นาย</span>
                    </div>

                    <div class="flex items-center gap-1">
                        <input type="radio" class="text-black w-4 h-4 translate-y-[1.5px]">
                        <span class="text-sm">นาง</span>
                    </div>

                    <div class="flex items-center gap-1">
                        <input type="radio" class="text-black w-4 h-4 translate-y-[1.5px]">
                        <span class="text-sm">นางสาว</span>
                    </div>
                </div>

                <div class="flex flex-col mt-2">
                    <label class="font-bold text-gray-500 font-sarabun text-[13px] mb-1">คำนำหน้าชื่อ</label>
                </div>
            </div>
        </div>



        <div class="flex flex-col sm:flex-row gap-4 mt-2">
            <!-- email -->
            <div class="flex flex-col w-full sm:w-1/2">
                <label for="email" class="font-bold text-gray-500 font-sarabun text-[13px] mb-1">ชื่อจริงภาษาไทย</label>
                <input type="email" id="email"
                    class="w-full h-10 border px-3 py-2 border-gray-300 rounded-xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            </div>

            <div class="flex flex-col w-full sm:w-1/2">
                <label for="username"
                    class="font-bold text-gray-500 font-sarabun text-[13px] mb-1">นามสกุลภาษาไทย</label>
                <input type="text" id="username"
                    class="w-full h-10 border px-3 py-2 border-gray-300 rounded-xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 mt-2">
            <!-- email -->
            <div class="flex flex-col w-full sm:w-1/2">
                <label for="email"
                    class="font-bold text-gray-500 font-sarabun text-[13px] mb-1">ชื่อจริงภาษาอังกฤษ</label>
                <input type="email" id="email"
                    class="w-full h-10 border px-3 py-2 border-gray-300 rounded-xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            </div>

            <div class="flex flex-col w-full sm:w-1/2">
                <label for="username"
                    class="font-bold text-gray-500 font-sarabun text-[13px] mb-1">นามสกุลภาษาอังกฤษ</label>
                <input type="text" id="username"
                    class="w-full h-10 border px-3 py-2 border-gray-300 rounded-xl font-sarabun text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            </div>
        </div>

        <div class="w-full max-w-md mx-auto p-4">
            <div class="relative">

                <button @click="isOpen = !isOpen" type="button"
                    class="w-full bg-[#C2C2C2] hover:bg-[#B0B0B0] cursor-pointer transition-colors rounded-2xl px-6 py-4 flex items-center justify-between focus:outline-none">
                    <span class="text-gray-700 font-medium">
                        {{ selectedPrefix || 'เลือกคำนำหน้าชื่อ' }}
                    </span>

                    <svg class="w-6 h-6 text-gray-800 transition-transform duration-200"
                        :class="{ 'rotate-180': isOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <div v-if="isOpen"
                    class="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                    <ul class="py-1">
                        <li v-for="option in options" :key="option" @click="selectOption(option)"
                            class="px-6 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 transition-colors">
                            {{ option }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
    layout: 'log-regis'
})

// สถานะการเปิด/ปิด
const isOpen = ref(false)

// ค่าที่เลือก
const selectedPrefix = ref('')

// รายการตัวเลือก
const options = ['นาย', 'นาง', 'นางสาว', 'ดร.', 'ศาสตราจารย์']

// ฟังก์ชันเลือกค่า
const selectOption = (val : string) => {
  selectedPrefix.value = val
  isOpen.value = false
}

</script>