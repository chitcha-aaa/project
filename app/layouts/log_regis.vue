<template>
    <div class="h-screen w-screen bg-gradient-to-t from-black to-yellow-500 flex items-center justify-center">

        <!-- Mobile: card กลางจอ (hidden บน lg) -->
        <div class="lg:hidden w-full h-full flex items-center justify-center px-5 py-8 overflow-y-auto">
            <div class="bg-[#F8FAFC] w-full max-w-md rounded-2xl shadow-2xl px-8 py-10">
                <slot />
            </div>
        </div>

        <!-- Desktop: split layout (hidden บนมือถือ) -->
        <div class="hidden lg:flex w-full h-full">
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