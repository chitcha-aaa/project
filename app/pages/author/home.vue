<template>
    <div class="p-8 flex flex-col items-start gap-4">
        <h1 class="font-sarabun text-3xl font-bold text-gray-800">แดชบอร์ดผู้แต่ง (Author Home)</h1>
        
        <button 
          @click="handleLogout" 
          :disabled="isLoading"
          class="bg-red-500 hover:bg-red-600 text-white font-sarabun font-bold py-2.5 px-6 rounded-2xl shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {{ isLoading ? 'กำลังออกจากระบบ...' : 'ออกจากระบบ (Log Out)' }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const supabase = useSupabaseClient()
const isLoading = ref(false)

const handleLogout = async () => {
    isLoading.value = true
    try {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error getting out:', error)
            alert('ล้มเหลวในการออกจากระบบ โปรดลองอีกครั้ง')
            return
        }
        
        // เมื่อนำกุญแจออกสำเร็จ พาเด้งกลับไปหน้าเข้าสู่ระบบทันที
        navigateTo('/login')
    } catch (err) {
        console.error(err)
    } finally {
        isLoading.value = false
    }
}
</script>