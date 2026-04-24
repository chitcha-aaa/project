<template>
    <Navbar />

    <!-- <div class="mt-2 w-full h-20  flex justify-center items-center">
        <div class="px-4 font-sarabun w-full max-w-[1395px]">
            <p class="font-semibold text-xl">ส่งบทความ</p>
            <p class="text-sm">กรุณากรอกข้อมูลให้ครบ 4 ขั้นตอน</p>
        </div>
    </div>

    <div class="bg-gray-200 h-15 w-full flex justify-center">
        <div class="bg-gray-300 w-full h-full max-w-[1395px] px-4">
            เป็นการบอกลำดับขัั้นตอน 1-4 
        </div>
    </div>

    <div class="w-full h-30  mt-2 px-4 font-sarabun flex justify-center">
        <div class="border border-gray-300 rounded-xl w-full">
            g
        </div>
    </div> -->

    <div class="min-h-screen bg-gray-50 py-6 px-4 md:py-10 font-sarabun text-slate-800">
        <div class="max-w-5xl mx-auto flex flex-col gap-8">

            <header class="flex items-center gap-4">
                <button
                    class="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition">
                    <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </button>
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">ส่งบทความใหม่ (New Submission)</h1>
                    <p class="text-gray-500 text-sm">กรุณากรอกข้อมูลให้ครบถ้วนทั้ง 4 ขั้นตอน</p>
                </div>
            </header>

            <div class="flex items-center justify-between w-full max-w-4xl mx-auto px-4 mt-4">
                <div class="flex flex-col items-center relative">
                    <div
                        class="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg z-10 shadow-md">
                        1</div>
                    <span
                        class="absolute top-14 text-indigo-700 font-bold text-sm whitespace-nowrap">ข้อมูลทั่วไป</span>
                </div>
                <div class="flex-1 h-1 bg-gray-200 mx-2 md:mx-4"></div>
                <div class="flex flex-col items-center relative">
                    <div
                        class="w-12 h-12 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-bold text-lg z-10">
                        2</div>
                    <span
                        class="absolute top-14 text-gray-400 font-medium text-sm whitespace-nowrap hidden sm:block">ผู้แต่ง</span>
                </div>
            </div>

            <div class="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-10 mt-8">
                <div class="flex items-center gap-3 mb-8">
                    <h2 class="text-xl font-bold text-gray-800">ข้อมูลทั่วไป (General Info)</h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">

                    <div class="flex flex-col gap-2">
                        <label class="font-bold text-gray-700">ระดับผู้ส่งผลงาน</label>
                        <div class="flex gap-4">
                            <button
                                class="flex-1 py-3 border border-gray-200 rounded-xl hover:border-indigo-500 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition">ปริญญาตรี</button>
                            <button
                                class="flex-1 py-3 border border-gray-200 rounded-xl hover:border-indigo-500 transition">บุคคลทั่วไป
                                / นักวิจัย</button>
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="font-bold text-gray-700">รูปแบบการนำเสนอ</label>
                        <div class="flex gap-4">
                            <button class="flex-1 py-3 border border-gray-200 rounded-xl transition">On-site</button>
                            <button class="flex-1 py-3 border border-gray-200 rounded-xl transition">Online</button>
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="font-bold text-gray-700">ประเภทบทความ</label>
                        <select
                            class="w-full bg-gray-200/60 border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500">
                            <option>Oral Presentation</option>
                        </select>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="font-bold text-gray-700">กลุ่มสาขาวิชา</label>
                        <select
                            class="w-full bg-gray-200/60 border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500">
                            <option>Computer Science & IT</option>
                        </select>
                    </div>

                </div>

                <div class="h-px bg-gray-100 my-8"></div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    <div class="flex flex-col gap-2">
                        <label class="font-bold text-gray-700">ชื่อบทความ (ภาษาไทย)</label>
                        <input type="text"
                            class="w-full bg-transparent border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label class="font-bold text-gray-700">ชื่อบทความ (ภาษาอังกฤษ)</label>
                        <input type="text"
                            class="w-full bg-transparent border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500" />
                    </div>
                </div>

            </div>

            <div class="flex justify-between items-center px-2">
                <button class="text-gray-500 font-bold hover:text-gray-800 transition">ยกเลิก</button>
                <button
                    class="bg-[#5C45FD] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition flex items-center gap-2">
                    ถัดไป
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>

        </div>
    </div>
</template>