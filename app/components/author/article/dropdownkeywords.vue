<template>
    <div ref="dropdownContainer" @click="toggleDropdown"
        class="relative bg-slate-300 w-full max-w-[300px] p-2 rounded-xl flex items-center mt-1 hover:cursor-pointer">
        <div class="text-sm" :class="modelValue ? 'text-gray-900 font-medium' : 'text-slate-600'">
            <p>{{ modelValue || 'โปรดเลือกคีย์เวิร์ด' }}</p>
        </div>
        <div id="dropdown_icon"
            class="w-5 h-5 ml-auto flex justify-center items-center transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6" :class="{ 'rotate-180': isOpen }">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </div>

        <!-- กล่องเมนู -->
        <div v-show="isOpen"
            class="absolute left-0 top-full mt-1 w-full bg-slate-300 rounded-xl shadow-lg z-10 overflow-hidden p-2">
            <ul class="text-sm text-black">
                <li v-for="(option, index) in options" :key="index" @click.stop="selectOption(option)"
                    class="px-4 py-2 hover:bg-slate-100 cursor-pointer transition-colors rounded-xl ">
                    {{ option }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false) //สถานะ เปิด/ปิดเมนู
const dropdownContainer = ref(null)

const options = [
    'คอมพิวเตอร์',
    'ปัญญาประดิษฐ์',
    'ชีววิทยา',
    'เคมี',
]

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

// 3. ฟังก์ชันเมื่อผู้ใช้คลิกเลือก
const selectOption = (option) => {
    emit('update:modelValue', option) // อัปเดตค่าที่เลือก
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