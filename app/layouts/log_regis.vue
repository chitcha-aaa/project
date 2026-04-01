<template>
    <div class="h-screen w-screen flex">
        <!-- left -->
        <div class="bg-gradient-to-t from-black to-yellow-500 w-1/2 h-full">
            
        </div>
        <!-- right -->
        <div class="bg-[#F8FAFC] w-full lg:w-1/2 h-full pt-5 px-10 overflow-y-auto pb-10">
            <div class="w-full pt-2">
                <slot />
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

</script>