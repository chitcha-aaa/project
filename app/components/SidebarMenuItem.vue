<template>
    <div>
        <!-- กดที่ div นี้เพื่อ toggle -->
        <div @click="isOpen = !isOpen"
            class="h-10 flex items-center border-none rounded-xl overflow-hidden justify-between cursor-pointer hover:bg-[#E5E7EB] transition-colors duration-300 ease-in-out">

            <!-- ฝั่งซ้าย: ชื่อเมนู (มาจาก props) -->
            <div class="w-6/7 h-full flex items-center pl-3 font-semibold font-sarabun text-sm">
                {{ title }}
            </div>

            <!-- ฝั่งขวา: ลูกศร หมุน 180° เมื่อเปิด -->
            <div class="w-1/7 h-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor"
                    :class="['w-4 h-4 text-black transition-transform duration-200', isOpen ? 'rotate-180' : '']">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </div>

        <!-- เนื้อหาที่จะโผล่ออกมา (มาจาก slot) -->
        <div v-show="isOpen" class="bg-white border-none rounded-md p-2">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// รับ props: title คือชื่อเมนูที่แสดงในหัว
defineProps<{
    title: string
}>()

// state ของ dropdown นี้เป็นของตัวเอง แต่ละ SidebarMenuItem จะมี isOpen แยกกัน
const isOpen = ref(false)
</script>
