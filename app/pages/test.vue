<!-- pages/dashboard.vue หรือหน้าไหนก็ได้ -->
<template>
    <div class="flex">
        <AppSidebar /> <!-- ← แค่นี้พอ! -->
        <main class="flex-1 p-4">
            เนื้อหาหน้านี้
        </main>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
</script>