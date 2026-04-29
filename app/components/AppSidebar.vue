<template>
    <div class="flex flex-col w-56 h-screen border-r border-[#E5E7EB] bg-white">

        <!-- ─── ส่วนบน: Logo + Action Button ────────────────────────────── -->
        <div class="h-33 bg-white p-3 font-sarabun border-b border-[#E5E7EB] flex flex-col justify-center">
            <div>
                <span class="font-bold text-3xl">BRICC</span>
                <span class="ml-1 text-[12px] text-[#6B7280]">(ครั้งที่12)</span>
                <p class="text-sm text-[#6B7280]">มหาวิทยาลัยราชภัฏบุรีรัมย์</p>
            </div>

            <!-- ปุ่ม Action บนสุด (ต่างกันตาม role) -->
            <NuxtLink :to="topActionLink"
                class="mt-3 w-full h-10 rounded-xl
                    bg-gradient-to-r from-amber-400 to-yellow-300
                    shadow-md shadow-yellow-400/40
                    flex items-center justify-center gap-2
                    cursor-pointer
                    hover:from-amber-500 hover:to-yellow-400
                    hover:shadow-lg hover:shadow-yellow-400/60
                    hover:scale-[1.03]
                    active:scale-[0.97]
                    transition-all duration-200 ease-in-out"
                style="text-decoration: none;">
                <!-- SVG: Reviewer — แว่นขยาย (ตรวจสอบ) -->
                <svg v-if="userRole === 'reviewer'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="2" stroke="currentColor" class="w-4 h-4 text-amber-800">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
                </svg>
                <!-- SVG: Admin — เอกสาร/ส่ง -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="2.5" stroke="currentColor" class="w-4 h-4 text-amber-800">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                </svg>
                <span class="text-sm font-bold text-amber-900 tracking-wide">{{ topActionLabel }}</span>
            </NuxtLink>
        </div>

        <!-- ─── ส่วนกลาง: เมนู (เลื่อนได้) ─────────────────────────────── -->
        <div class="flex-1 overflow-y-auto bg-white p-1 pt-2 font-sarabun text-sm">
            <SidebarMenuItem
                v-for="group in currentMenus"
                :key="group.title"
                :title="group.title">
                <ul class="space-y-1">
                    <li v-for="item in group.items" :key="item.label">
                        <NuxtLink :to="item.href"
                            class="block hover:bg-[#E5E7EB] p-1 rounded cursor-pointer transition-colors duration-150"
                            style="text-decoration: none; color: inherit;">
                            {{ item.label }}
                        </NuxtLink>
                    </li>
                </ul>
            </SidebarMenuItem>
        </div>

        <!-- ─── ส่วนล่าง: User Info / Login Button ───────────────────────── -->
        <div class="border-t border-[#E5E7EB] bg-white">

            <!-- กรณี: Login แล้ว → แสดงชื่อ + dropdown -->
            <div v-if="isLoggedIn" class="p-3">

                <!-- User Card -->
                <div class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-150">
                    <!-- Avatar Initial -->
                    <div class="w-9 h-9 bg-gradient-to-br from-amber-400 to-yellow-300 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span class="text-amber-900 font-bold text-sm">{{ avatarInitial }}</span>
                    </div>
                    <!-- Name + Role -->
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold text-gray-800 truncate">{{ displayName }}</p>
                        <p class="text-xs text-gray-400 capitalize">{{ userRole }}</p>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="mt-2 flex flex-col gap-1">
                    <NuxtLink :to="profileEditPath"
                        class="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-150 cursor-pointer"
                        style="text-decoration: none;">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>แก้ไขโปรไฟล์</span>
                    </NuxtLink>
                    <button @click="logout"
                        class="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-150 cursor-pointer w-full text-left">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>ออกจากระบบ</span>
                    </button>
                </div>

            </div>

            <!-- กรณี: ยังไม่ login → ปุ่มเข้าสู่ระบบ -->
            <div v-else class="h-20 flex items-center justify-center">
                <NuxtLink to="/login" style="text-decoration: none;">
                    <button class="w-45 h-10 bg-gradient-to-r from-[#1E1E1E] to-[#393E46] rounded-xl hover:scale-[1.03] active:scale-[0.97] hover:cursor-pointer duration-100">
                        <p class="text-sm text-white font-sarabun">เข้าสู่ระบบ</p>
                    </button>
                </NuxtLink>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
// Nuxt 3 auto-imports: computed, onMounted — ไม่ต้อง import เอง

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

onMounted(() => {
    fetchProfile()
})

// ─── เมนูแต่ละ Role ────────────────────────────────────────────────────────────
type MenuItem = { label: string; href: string }
type MenuGroup = { title: string; items: MenuItem[] }

const menusByRole: Record<string, MenuGroup[]> = {
    admin: [
        {
            title: 'จัดการบทความ',
            items: [
                { label: 'อนุมัติบทความ', href: '/admin/home' },
                { label: 'ดูบทความทั้งหมด', href: '/admin/home' },
            ],
        },
        {
            title: 'จัดการผู้ใช้',
            items: [
                { label: 'รายชื่อผู้ใช้', href: '/admin/home' },
                { label: 'เชิญ Reviewer', href: '/admin/invite' },
            ],
        },
    ],
    reviewer: [
        {
            title: 'งานของฉัน',
            items: [
                { label: 'บทความรอตรวจ', href: '/reviewer/home' },
                { label: 'ประวัติการตรวจ', href: '/reviewer/home' },
            ],
        },
        {
            title: 'รายงาน',
            items: [
                { label: 'สรุปผลการตรวจ', href: '/reviewer/home' },
            ],
        },
    ],
}

// เมนูที่แสดงตาม role
const currentMenus = computed<MenuGroup[]>(() => (menusByRole[userRole.value] || menusByRole['admin']) as MenuGroup[])

// ─── ปุ่มบนสุด ─────────────────────────────────────────────────────────────────
const topActionConfig = computed(() => {
    if (userRole.value === 'reviewer') {
        return { label: 'บทความรอตรวจ', href: '/reviewer/home' }
    }
    return { label: 'จัดการระบบ', href: '/admin/home' }
})

const topActionLabel = computed(() => topActionConfig.value.label)
const topActionLink  = computed(() => topActionConfig.value.href)

</script>