<!-- pages/dashboard.vue หรือหน้าไหนก็ได้ -->
<template>
    <div class="min-h-screen bg-gray-300 flex items-center">
        <div ref="dropdownContainer" class="w-full max-w-[200px] p-3 bg-white mx-auto flex items-center relative">
            <div :class="isselect ? 'text-black' : 'text-gray-600'">
                <p>{{ isselect || 'โปรดเลือกประเภท' }}</p>
            </div>
            <div @click="toggledropdown()" class="w-5 h-5 rounded-full bg-black ml-auto"></div>

            <!-- กล่องเมนูด้านล่าง -->
            <div v-show="isopen" 
                class="absolute bg-amber-200 w-full overflow-hidden left-0 top-full mt-1 z-10 p-3">
                <ul class="text-black font-sarabun">
                    <li v-for="(menu, index) in source" :key="index" @click="selectOption(menu)"
                        class="p-1 hover:cursor-pointer hover:bg-amber-300 rounded-xl"
                        >
                        {{ menu }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const isselect = ref('')
const isopen = ref(false)
const dropdownContainer = ref(null)

const source = [
    'เก๊กฮวย',
    'โอวัลติน',
    'โอเลี้ยง'
]

//function เปิดปิดเมนู
const toggledropdown = () => {
    isopen.value = !isopen.value
}

const selectOption = (menu) => {
    isselect.value = menu;
    isopen.value = false;
};

</script>