<template>
  <div class="">
    <Navbar />
    <main class="mt-5">
      div
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'

definePageMeta({
  layout: false
})

const supabase = useSupabaseClient()
const dashboardPath = ref<string | null>(null)

// ตรวจสอบ session ตอนที่ component mount บน client
onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return

  // ดึง role จาก user_metadata หรือ profiles table
  let roleStr = session.user.user_metadata?.role
  if (!roleStr) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single() as { data: { role: string } | null }
    roleStr = profile?.role
  }

  const role = roleStr?.toLowerCase()?.trim() || ''
  if (role === 'admin') dashboardPath.value = '/admin/home'
  else if (role === 'reviewer') dashboardPath.value = '/reviewer/home'
  else if (role === 'author') dashboardPath.value = '/author/home'
})
</script>