<template>
    <div class="h-screen flex">
        <div class="flex flex-col w-56 h-full bg-gray-100">
            <div class="h-25 bg-gray-400 p-2 font-sarabun border-b-1">
                <span class="font-bold text-3xl mb-1">BRICC</span>
                <span class="ml-1 text-[12px]">(ครั้งที่12)</span>
                <p class="text-sm">มหาวิทยาลัยราชภัฏบุรีรัมย์</p>
            </div>
            <div class="h-full bg-gray-400 p-1 pt-2 grid grid-cols-1 font-sarabun text-sm">
                <!-- wrapper: ครอบทั้ง trigger และ dropdown ไว้ด้วยกัน -->
                <div>
                    <!-- ① กดที่ div นี้เพื่อ toggle -->
                    <div
                        @click="isOpen = !isOpen"
                        class="bg-gray-400 h-10 flex items-center border-none rounded-xl overflow-hidden justify-between cursor-pointer hover:bg-gray-200 transition-colors duration-300 ease-in-out">

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
            <div class="้ h-20 bg-gray-400 border-t-1">
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