<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()

const users = ref([])
const errorMsg = ref('')


async function getUsers() {
  const { data, error } = await supabase.from('users').select('*')
  
  if (error) {
    errorMsg.value = error.message
    console.error('ดึงข้อมูลไม่ได้:', error.message)
  } else if (data) {
    users.value = data
  }
}


onMounted(() => {
  getUsers()
})
</script>
