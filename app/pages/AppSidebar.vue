<template>
    <div class="h-screen flex">
        <div class="flex flex-col w-56 h-screen bg-gray-100">
            <div class="h-33 bg-gray-400 p-2 font-sarabun border-b-1 flex flex-col">
                <div>
                    <span class="font-bold text-3xl mb-1">BRICC</span>
                    <span class="ml-1 text-[12px]">(ครั้งที่12)</span>
                    <p class="text-sm">มหาวิทยาลัยราชภัฏบุรีรัมย์</p>
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
            <!-- ส่วนกลาง: เลื่อนได้ (scrollable) -->
            <div class="flex-1 overflow-y-auto bg-gray-400 p-1 pt-2  font-sarabun text-sm">
                <!-- wrapper: ครอบทั้ง trigger และ dropdown ไว้ด้วยกัน -->
                <div>
                    <!-- ① กดที่ div นี้เพื่อ toggle -->
                    <div @click="isOpen = !isOpen"
                        class="bg-gray-400 h-10 flex items-center border-none rounded-xl overflow-hidden justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-300 ease-in-out ">

                        <!-- ฝั่งซ้าย: ข้อความ -->
                        <div class=" w-6/7 h-full flex items-center pl-3">จัดการบทความ</div>

                        <!-- ฝั่งขวา: ไอคอนลูกศร -->
                        <div class=" w-1/7 h-full flex items-center justify-center">
                            <!-- ② :class จะหมุน SVG 180° เมื่อ isOpen = true -->
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor"
                                :class="['w-4 h-4 text-black transition-transform duration-200 ', isOpen ? 'rotate-180' : '']">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>

                    <!-- ③ dropdown จะโผล่ต่อจาก trigger ตรง ๆ เพราะอยู่ใน wrapper เดียวกัน -->
                    <div v-show="isOpen" class="bg-gray-400 border-none rounded-md p-2">
                        <p>นี่คือเมนูที่โผล่ออกมา!</p>
                        <hr class="my-1">
                        <ul class="space-y-1">
                            <li class="hover:bg-blue-50 p-1 rounded cursor-pointer">เมนูที่ 1</li>
                            <li class="hover:bg-blue-50 p-1 rounded cursor-pointer">เมนูที่ 2</li>
                        </ul>
                    </div>
                </div>

            </div>
            <div class="้ h-15 bg-gray-400 border-t-1">
                <div></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// ① สร้างตัวแปร isOpen เริ่มต้นเป็น false (ปิด)
const isOpen = ref(false)
// เมื่อกด: isOpen = !isOpen จะสลับระหว่าง true/false
// template จะอ่านค่านี้แล้วแสดงผลอัตโนมัติ ไม่ต้องแตะ DOM เอง
</script>


<!-- <div class="h-screen flex ">
        <aside class="w-56 h-full bg-gray-300 flex flex-col p-2">
            <div class="font-sarabun">
                <span class="font-bold text-3xl mb-1">BRICC</span>
                <span class="ml-1 text-[12px]">(ครั้งที่12)</span>
                <p class="text-sm">มหาวิทยาลัยราชภัฏบุรีรัมย์</p>
            </div>

            <div class="flex items-center my-3">
                <div class="flex-grow border-t border-gray-500"></div>
                <div class="flex-grow border-t border-gray-500"></div>
            </div>

          
            <div class="flex flex-col">
                <div class="bg-gray-200 w-full h-10">

                </div>
            </div>
        </aside>
    </div>
-->