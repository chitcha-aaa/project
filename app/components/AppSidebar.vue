<template>
    <div class="flex flex-col w-56 h-screen border-r-1 border-[#E5E7EB]">

            <!-- ส่วนบน: Logo + ปุ่มส่งบทความ -->
            <div class="h-33 bg-white p-2 font-sarabun border-b-1 flex flex-col border-[#E5E7EB]">
                <div>
                    <span class="font-bold text-3xl mb-1">BRICC</span>
                    <span class="ml-1 text-[12px] text-[#6B7280]">(ครั้งที่12)</span>
                    <p class="text-sm text-[#6B7280]">มหาวิทยาลัยราชภัฏบุรีรัมย์</p>
                </div>

                <button class="mt-3 w-full h-10 rounded-xl
                    bg-gradient-to-r from-amber-400 to-yellow-300
                    shadow-md shadow-yellow-400/40
                    flex items-center justify-center gap-2
                    cursor-pointer
                    hover:from-amber-500 hover:to-yellow-400
                    hover:shadow-lg hover:shadow-yellow-400/60
                    hover:scale-[1.03]
                    active:scale-[0.97]
                    transition-all duration-200 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                        stroke="currentColor" class="w-4 h-4 text-amber-800">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>
                    <span class="text-sm font-bold text-amber-900 tracking-wide">ส่งบทความ</span>
                </button>
            </div>

            <!-- ส่วนกลาง: เมนู (เลื่อนได้) -->
            <div class="flex-1 overflow-y-auto bg-white p-1 pt-2 font-sarabun text-sm">

                <!-- ใช้ SidebarMenuItem แทนโค้ด dropdown ซ้ำกัน -->
                <SidebarMenuItem title="จัดการบทความ">
                    <ul class="space-y-1">
                        <li class="hover:bg-[#E5E7EB] p-1 rounded cursor-pointer">อนุมัติบทความ</li>
                        <li class="hover:bg-[#E5E7EB] p-1 rounded cursor-pointer">ดูบทความทั้งหมด</li>
                    </ul>
                </SidebarMenuItem>

                <SidebarMenuItem title="จัดการผู้ใช้">
                    <ul class="space-y-1">
                        <li class="hover:bg-[#E5E7EB] p-1 rounded cursor-pointer">รายชื่อผู้ใช้</li>
                        <li class="hover:bg-[#E5E7EB] p-1 rounded cursor-pointer">เพิ่มผู้ใช้</li>
                    </ul>
                </SidebarMenuItem>

            </div>

            <!-- ส่วนล่าง: ปุ่มเข้าสู่ระบบ -->
            <div class="h-20 bg-white border-t-1 flex items-center justify-center font-sarabun border-[#E5E7EB]">
                <button class="w-45 h-10 bg-gradient-to-r from-[#1E1E1E] to-[#393E46] rounded-xl hover:scale-[1.03] active:scale-[0.97] hover:cursor-pointer duration-100">
                    <p class="text-sm text-white">เข้าสู่ระบบ</p>
                </button>
            </div>

    </div>
</template>

<script setup lang="ts">
// ไม่มี script เพราะ logic ย้ายไปอยู่ใน SidebarMenuItem.vue แล้ว
</script>