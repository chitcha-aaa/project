<template>
    <!-- Desktop: h-screen lock, Mobile: min-h-screen ให้ยืดตามเนื้อหาได้ -->
    <div class="min-h-screen w-screen bg-gradient-to-t from-black to-yellow-500">

        <!-- Mobile: card กลางจอ (hidden บน lg) -->
        <!-- ใช้ min-h-screen + native scroll แทน overflow-y-auto + flex items-center -->
        <div class="lg:hidden w-full min-h-screen flex flex-col items-center justify-center px-5 py-8">
            <div class="bg-[#F8FAFC] w-full max-w-md rounded-2xl shadow-2xl px-8 py-10">
                <slot />
            </div>
        </div>

        <!-- Desktop: split layout (hidden บนมือถือ) -->
        <div class="hidden lg:flex w-full h-screen">
            <!-- left decorative -->
            <div class="bg-gradient-to-t from-black to-yellow-500 w-1/2 h-full"></div>
            <!-- right form -->
            <div class="bg-[#F8FAFC] w-1/2 h-full pt-5 px-10 overflow-y-auto pb-10">
                <div class="w-full pt-2">
                    <slot />
                </div>
            </div>
        </div>

    </div>
</template>


<script setup lang="ts">

</script>