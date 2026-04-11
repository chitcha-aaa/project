<template>
    <!-- Navbar หลัก -->
    <div class="w-full h-20 flex justify-center relative"
        style="background: #1E1E1E; border-bottom: 2px solid #f5c400;">
        <div class="w-full max-w-[1395px] h-full flex justify-between items-center px-4">

            <!-- Logo -->
            <div class="h-full w-56 flex items-center gap-2">
                <div class="w-13 h-full py-1">
                    <img src="../assets/images/bru.png" alt="" class="w-full h-full object-contain drop-shadow-md">
                </div>
                <div class="flex flex-col font-sarabun leading-tight">
                    <span class="text-sm font-bold" style="color: #f5c400;">มหาวิทยาลัยราชภัฏบุรีรัมย์</span>
                    <span class="text-xs font-medium" style="color: #d4aa00;">Buriram Rajabhat University</span>
                </div>
            </div>

            <!-- Desktop Menu (ซ่อนบน mobile, แสดงบน lg+) -->
            <div class="hidden min-[1065px]:flex flex-1 h-full items-center font-sarabun text-xs justify-around">
                <template v-for="menu in menus" :key="menu.label">

                    <!-- ถ้ามี children → Dropdown (รองรับทั้ง hover และ tap) -->
                    <div v-if="menu.children"
                        class="relative h-full flex items-center"
                        @mouseenter="activeDropdown = menu.label"
                        @mouseleave="activeDropdown = null">
                        <!-- ปุ่ม trigger: คลิก/แตะเพื่อ toggle -->
                        <button @click.stop="toggleDesktopDropdown(menu.label)"
                            class="relative flex items-center gap-1 transition-colors duration-200 px-1 py-1 whitespace-nowrap cursor-pointer bg-transparent border-none"
                            :class="activeDropdown === menu.label ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'">
                            {{ menu.label }}
                            <svg class="w-3 h-3 transition-transform duration-200"
                                :class="activeDropdown === menu.label ? 'rotate-180' : ''"
                                fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                            <!-- เส้นใต้ -->
                            <span class="absolute bottom-0 left-0 h-[2px] transition-all duration-300"
                                :class="activeDropdown === menu.label ? 'w-full' : 'w-0'"
                                style="background: #f5c400;"></span>
                        </button>

                        <!-- Dropdown Panel: แสดงเมื่อ activeDropdown ตรงกัน -->
                        <div class="absolute top-full left-0 min-w-[170px] pt-1 z-50 transition-all duration-200"
                            :class="activeDropdown === menu.label
                                ? 'opacity-100 visible translate-y-0'
                                : 'opacity-0 invisible translate-y-1'">
                            <div class="rounded-lg overflow-hidden shadow-2xl"
                                style="background: #1E1E1E; border: 1px solid #f5c400;">
                                <a v-for="child in menu.children" :key="child.label" :href="child.href ?? '#'"
                                    class="flex items-center gap-2 px-4 py-2.5 text-gray-300 hover:text-yellow-400 hover:bg-[#2a2a2a] transition-colors duration-150 whitespace-nowrap"
                                    style="text-decoration: none;">
                                    {{ child.label }}
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- เมนูปกติ -->
                    <a v-else :href="menu.href ?? '#'"
                        class="relative text-gray-300 hover:text-yellow-400 transition-colors duration-200 px-1 py-1 group whitespace-nowrap"
                        style="text-decoration: none;">
                        {{ menu.label }}
                        <span class="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                            style="background: #f5c400;"></span>
                    </a>

                </template>
            </div>

            <!-- ขวา: ปุ่ม Login + Hamburger -->
            <div class="flex items-center gap-3">

                <!-- ปุ่ม Login (ซ่อนบนจอเล็กมาก) -->
                <NuxtLink to="/login" class="hidden sm:block">
                    <button class="font-sarabun text-sm font-semibold px-5 w-40 h-10 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 hover:cursor-pointer"
                        style="background: linear-gradient(135deg, #f5c400, #e0a800); color: #111111; box-shadow: 0 0 12px rgba(245,196,0,0.35);">
                        เข้าสู่ระบบ
                    </button>
                </NuxtLink>

                <!-- Hamburger Button (แสดงเฉพาะ < lg) -->
                <button @click="mobileOpen = !mobileOpen"
                    class="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg transition-colors duration-200 hover:bg-[#2a2a2a]"
                    aria-label="Toggle menu">
                    <span class="block w-6 h-0.5 bg-yellow-400 transition-all duration-300 origin-center"
                        :class="mobileOpen ? 'rotate-45 translate-y-2' : ''"></span>
                    <span class="block w-6 h-0.5 bg-yellow-400 transition-all duration-300"
                        :class="mobileOpen ? 'opacity-0 scale-x-0' : ''"></span>
                    <span class="block w-6 h-0.5 bg-yellow-400 transition-all duration-300 origin-center"
                        :class="mobileOpen ? '-rotate-45 -translate-y-2' : ''"></span>
                </button>

            </div>
        </div>

        <!-- Mobile Drawer (เมนูที่เปิดเมื่อกด hamburger) -->
        <div class="lg:hidden absolute top-full left-0 w-full z-50 overflow-hidden transition-all duration-300 ease-in-out"
            :style="mobileOpen ? 'max-height: 700px; opacity: 1;' : 'max-height: 0px; opacity: 0;'"
            style="background: #1E1E1E; border-bottom: 2px solid #f5c400;">
            <div class="px-5 py-3 flex flex-col font-sarabun text-sm">

                <template v-for="menu in menus" :key="menu.label">

                    <!-- Mobile: เมนูที่มี submenu -->
                    <div v-if="menu.children">
                        <button @click="toggleMobileMenu(menu.label)"
                            class="w-full flex items-center justify-between py-3 text-gray-300 hover:text-yellow-400 transition-colors duration-200 border-b border-[#2a2a2a]">
                            <span>{{ menu.label }}</span>
                            <svg class="w-4 h-4 transition-transform duration-300"
                                :class="mobileExpandedMenu === menu.label ? 'rotate-180 text-yellow-400' : ''"
                                fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                        <!-- ซับเมนู accordion -->
                        <div class="overflow-hidden transition-all duration-300 ease-in-out"
                            :style="mobileExpandedMenu === menu.label ? 'max-height: 200px;' : 'max-height: 0px;'">
                            <a v-for="child in menu.children" :key="child.label" :href="child.href ?? '#'"
                                class="flex items-center gap-2 pl-5 py-2.5 text-gray-400 hover:text-yellow-400 transition-colors duration-150 border-b border-[#252525]"
                                style="text-decoration: none;">
                                <span style="color: #f5c400;">›</span> {{ child.label }}
                            </a>
                        </div>
                    </div>

                    <!-- Mobile: เมนูทั่วไป -->
                    <a v-else :href="menu.href ?? '#'"
                        class="block py-3 text-gray-300 hover:text-yellow-400 transition-colors duration-200 border-b border-[#2a2a2a]"
                        style="text-decoration: none;">
                        {{ menu.label }}
                    </a>

                </template>

                <!-- ปุ่ม Login ใน mobile drawer -->
                <NuxtLink to="/login" class="mt-4 mb-2 sm:hidden">
                    <button class="w-full font-sarabun text-sm font-semibold h-10 rounded-full transition-all duration-200 active:scale-95"
                        style="background: linear-gradient(135deg, #f5c400, #e0a800); color: #111111;">
                        เข้าสู่ระบบ
                    </button>
                </NuxtLink>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// state ของ hamburger (เปิด/ปิด)
const mobileOpen = ref(false)

// ชื่อเมนูที่กำลัง expand อยู่ใน mobile (null = ปิดหมด)
const mobileExpandedMenu = ref(null)

// desktop dropdown: ชื่อเมนูที่เปิดอยู่ (hover หรือ tap)
const activeDropdown = ref(null)

function toggleMobileMenu(label) {
    mobileExpandedMenu.value = mobileExpandedMenu.value === label ? null : label
}

function toggleDesktopDropdown(label) {
    // tap: ถ้าเปิดอยู่แล้ว → ปิด, ถ้าปิดอยู่ → เปิด
    activeDropdown.value = activeDropdown.value === label ? null : label
}

// ปิด dropdown เมื่อคลิกที่อื่น
function handleOutsideClick() {
    activeDropdown.value = null
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))

const menus = [
    { label: 'หน้าแรก', href: '/' },
    {
        label: 'บทความ',
        children: [
            { label: 'ส่งบทความ',       href: '#' },
            { label: 'รูปแบบบทความ',    href: '#' },
            { label: 'บทความย้อนหลัง',  href: '#' },
        ]
    },
    { label: 'การชำระเงิน',         href: '#' },
    { label: 'ตารางการนำเสนอ',      href: '#' },
    { label: 'รางวัล/เกียรติบัตร',  href: '#' },
    { label: 'ดาวน์โหลดต้นแบบ',     href: '#' },
    { label: 'เกี่ยวกับงานประชุม',  href: '#' },
    { label: 'คู่มือติดต่อ',        href: '#' },
]
</script>
