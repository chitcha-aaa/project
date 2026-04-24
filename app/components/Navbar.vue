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

                        <!-- Dropdown Panel -->
                        <div class="absolute top-full left-0 min-w-[170px] pt-1 z-50 transition-all duration-200"
                            :class="activeDropdown === menu.label
                                ? 'opacity-100 visible translate-y-0'
                                : 'opacity-0 invisible translate-y-1'">
                            <div class="rounded-lg overflow-hidden shadow-2xl"
                                style="background: #1E1E1E; border: 1px solid #f5c400;">
                                <button v-for="child in menu.children" :key="child.label" 
                                    @click="handleMenuClick(child)"
                                    class="flex items-center gap-2 px-4 py-2.5 w-full text-gray-300 hover:text-yellow-400 hover:bg-[#2a2a2a] transition-colors duration-150 whitespace-nowrap hover:cursor-pointer"
                                    style="text-decoration: none;">
                                    {{ child.label }}
                                </button>
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

            <!-- ขวา: Auth State + Hamburger -->
            <div class="flex items-center gap-3">

                <!-- ─── กรณีที่ 1: Login แล้ว → แสดงชื่อ + Dropdown ─── -->
                <div v-if="isLoggedIn"
                    class="hidden sm:block relative"
                    @mouseenter="userDropdownOpen = true"
                    @mouseleave="userDropdownOpen = false">

                    <!-- User Button -->
                    <button @click.stop="userDropdownOpen = !userDropdownOpen"
                        class="flex items-center gap-2 font-sarabun text-sm font-semibold px-4 h-10 rounded-full transition-all duration-200 hover:scale-105 cursor-pointer"
                        style="background: linear-gradient(135deg, #f5c400, #e0a800); color: #111111; box-shadow: 0 0 12px rgba(245,196,0,0.35);">
                        <!-- Avatar Initial -->
                        <span class="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center text-xs font-bold">
                            {{ avatarInitial }}
                        </span>
                        <span class="max-w-[120px] truncate">{{ displayName }}</span>
                        <svg class="w-3 h-3 transition-transform duration-200 flex-shrink-0"
                            :class="userDropdownOpen ? 'rotate-180' : ''"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>

                    <!-- User Dropdown Panel -->
                    <div class="absolute top-full right-0 min-w-[180px] pt-2 z-50 transition-all duration-200"
                        :class="userDropdownOpen
                            ? 'opacity-100 visible translate-y-0'
                            : 'opacity-0 invisible translate-y-1'">
                        <div class="rounded-xl overflow-hidden shadow-2xl"
                            style="background: #1E1E1E; border: 1px solid #f5c400;">

                            <!-- ชื่อ + role -->
                            <div class="px-4 py-3 border-b border-[#333]">
                                <p class="text-white text-sm font-bold truncate">{{ displayName }}</p>
                                <p class="text-yellow-400 text-xs capitalize">{{ userRole }}</p>
                            </div>

                            <!-- เมนู: แก้ไขโปรไฟล์ -->
                            <NuxtLink :to="profileEditPath"
                                class="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-yellow-400 hover:bg-[#2a2a2a] transition-colors duration-150"
                                style="text-decoration: none;">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span class="text-sm font-sarabun">แก้ไขโปรไฟล์</span>
                            </NuxtLink>

                            <!-- Divider -->
                            <div class="border-t border-[#333]"></div>

                            <!-- เมนู: ออกจากระบบ -->
                            <button @click="logout"
                                class="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-[#2a2a2a] transition-colors duration-150">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span class="text-sm font-sarabun">ออกจากระบบ</span>
                            </button>

                        </div>
                    </div>
                </div>

                <!-- ─── กรณีที่ 2: ยังไม่ login → แสดงปุ่มเข้าสู่ระบบ ──────────── -->
                <NuxtLink v-else-if="!isLoggedIn" to="/login" class="hidden sm:block">
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

        <!-- Mobile Drawer -->
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
                        <div class="overflow-hidden transition-all duration-300 ease-in-out"
                            :style="mobileExpandedMenu === menu.label ? 'max-height: 200px;' : 'max-height: 0px;'">
                            <button v-for="child in menu.children" :key="child.label"
                                @click="handleMenuClick(child)"
                                class="w-full flex items-center gap-2 pl-5 py-2.5 text-gray-400 hover:text-yellow-400 transition-colors duration-150 border-b border-[#252525] cursor-pointer">
                                <span style="color: #f5c400;">›</span> {{ child.label }}
                            </button>
                        </div>
                    </div>

                    <!-- Mobile: เมนูทั่วไป -->
                    <a v-else :href="menu.href ?? '#'"
                        class="block py-3 text-gray-300 hover:text-yellow-400 transition-colors duration-200 border-b border-[#2a2a2a]"
                        style="text-decoration: none;">
                        {{ menu.label }}
                    </a>
                </template>

                <!-- Mobile: Auth Section -->
                <div class="mt-4 mb-2">
                    <!-- Login แล้ว -->
                    <div v-if="isLoggedIn" class="space-y-2">
                        <div class="text-white text-sm font-bold py-2">{{ displayName }}</div>
                        <NuxtLink :to="profileEditPath"
                            class="block py-2.5 text-gray-300 hover:text-yellow-400 border-b border-[#2a2a2a]"
                            style="text-decoration: none;">
                            แก้ไขโปรไฟล์
                        </NuxtLink>
                        <button @click="logout" class="w-full text-left py-2.5 text-red-400 hover:text-red-300">
                            ออกจากระบบ
                        </button>
                    </div>
                    <!-- ยังไม่ login -->
                    <NuxtLink v-else-if="!isLoggedIn" to="/login" class="sm:hidden">
                        <button class="w-full font-sarabun text-sm font-semibold h-10 rounded-full transition-all duration-200 active:scale-95"
                            style="background: linear-gradient(135deg, #f5c400, #e0a800); color: #111111;">
                            เข้าสู่ระบบ
                        </button>
                    </NuxtLink>
                </div>

            </div>
        </div>

    </div>

    <!-- ─── Auth Required Modal ──────────────────────────────────────────────── -->
    <Teleport to="body">
        <Transition name="modal-fade">
            <div v-if="showAuthModal"
                class="fixed inset-0 z-[9999] flex sm:items-center sm:justify-center items-end"
                style="background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);"
                @click.self="showAuthModal = false">

                <!-- Mobile: bottom sheet / Desktop: center card -->
                <Transition name="modal-up">
                    <div v-if="showAuthModal"
                        class="w-full sm:max-w-sm sm:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl font-sarabun"
                        style="background: #1E1E1E; border: 1px solid #f5c400;">

                        <!-- Drag handle (มือถือเท่านั้น) -->
                        <div class="sm:hidden flex justify-center pt-3 pb-1">
                            <div class="w-10 h-1 rounded-full" style="background:#444;"></div>
                        </div>

                        <!-- Header -->
                        <div class="px-5 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 flex flex-col items-center gap-2 sm:gap-3">
                            <!-- Icon -->
                            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
                                style="background: rgba(245,196,0,0.15); border: 2px solid #f5c400;">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="#f5c400" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <!-- Title -->
                            <h2 class="text-white text-base sm:text-lg font-bold text-center">
                                โปรดทำการเข้าสู่ระบบก่อน
                            </h2>
                            <p class="text-gray-400 text-xs sm:text-sm text-center leading-relaxed">
                                คุณต้องเข้าสู่ระบบเพื่อเข้าถึงฟีเจอร์นี้
                            </p>
                        </div>

                        <!-- Divider -->
                        <div class="border-t border-[#333]"></div>

                        <!-- Actions -->
                        <div class="px-4 sm:px-6 py-4 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
                            <!-- ปุ่มยกเลิก -->
                            <button
                                @click="showAuthModal = false"
                                class="flex-1 h-11 py-2 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                                style="background: #2a2a2a; color: #9ca3af; border: 1px solid #444;">
                                ยกเลิก
                            </button>
                            <!-- ปุ่มเข้าสู่ระบบ -->
                            <button
                                @click="goToLogin"
                                class="flex-1 h-11 py-2 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                                style="background: linear-gradient(135deg, #f5c400, #e0a800); color: #111111; box-shadow: 0 0 12px rgba(245,196,0,0.35);">
                                เข้าสู่ระบบ
                            </button>
                        </div>

                        <!-- Safe area padding (iOS) -->
                        <div class="sm:hidden h-safe-area-inset-bottom" style="padding-bottom: env(safe-area-inset-bottom);"></div>

                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>

</template>

<script setup>
// Nuxt 3 auto-imports: ref, onMounted, onUnmounted

// ─── useUserProfile composable ─────────────────────────────────────────────────
const {
    displayName,
    avatarInitial,
    isLoggedIn,
    isProfileComplete,
    userRole,
    profileEditPath,
    fetchProfile,
    logout,
} = useUserProfile()

// ─── Mobile Drawer State ───────────────────────────────────────────────────────
const mobileOpen = ref(false)
const mobileExpandedMenu = ref(null)
const activeDropdown = ref(null)
const userDropdownOpen = ref(false)

function toggleMobileMenu(label) {
    mobileExpandedMenu.value = mobileExpandedMenu.value === label ? null : label
}

function toggleDesktopDropdown(label) {
    activeDropdown.value = activeDropdown.value === label ? null : label
}

function handleOutsideClick() {
    activeDropdown.value = null
    userDropdownOpen.value = false
}

// รวม onMounted เป็นตัวเดียว
onMounted(() => {
    fetchProfile()  // โหลด profile
    document.addEventListener('click', handleOutsideClick)  // ปิด dropdown เมื่อคลิกที่อื่น
})
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))

// ─── Menu Data ─────────────────────────────────────────────────────────────────
const menus = [
    { label: 'หน้าแรก', href: '/' },
    {
        label: 'บทความ',
        children: [
            { label: 'ส่งบทความ',       href: '/author/SubmitArticle', requiresAuth: true },
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

const user = useSupabaseUser()

// ─── Auth Modal State ──────────────────────────────────────────────────────────
const showAuthModal = ref(false)

function goToLogin() {
    showAuthModal.value = false
    navigateTo('/login')
}

const handleMenuClick = (menu) => {
    activeDropdown.value = null
    mobileOpen.value = false

    if (menu.requiresAuth && !user.value) {
        showAuthModal.value = true
        return
    }

    navigateTo(menu.href)
}
</script>

<style scoped>
/* Modal backdrop fade */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

/*
  modal-up:
  - มือถือ (< 640px)  → slide ขึ้นจากด้านล่าง
  - tablet / desktop  → scale + fade จากกลางจอ
*/
.modal-up-enter-active,
.modal-up-leave-active {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
}

/* Mobile: slide from bottom */
@media (max-width: 639px) {
    .modal-up-enter-from,
    .modal-up-leave-to {
        transform: translateY(100%);
        opacity: 1;
    }
}

/* Tablet / Desktop: scale from center */
@media (min-width: 640px) {
    .modal-up-enter-from,
    .modal-up-leave-to {
        transform: scale(0.85);
        opacity: 0;
    }
}
</style>
