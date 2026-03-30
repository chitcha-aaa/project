<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- ส่วนเทสต์ดึงข้อมูล Users -->
    <div class="mt-10 p-5 bg-gray-100 rounded-lg max-w-2xl mx-auto">
      <p class="font-bold text-lg mb-4 text-blue-600">สถานะเชื่อมต่อ Supabase:</p>
      
      <!-- ถ้ามี Error (เช่น ติด RLS หรือไม่มีตาราง) -->
      <div v-if="errorMsg" class="bg-red-100 text-red-600 p-3 rounded mb-2">
        <strong>เกิดข้อผิดพลาด:</strong> {{ errorMsg }}
        <p class="text-sm mt-1">* ลองเช็คในตารางตรงเมนู RLS ว่าได้เปิดการมองเห็นสาธารณะ หรือลืมสร้างตาราง `users` หรือเปล่านะครับ</p>
      </div>

      <!-- ถ้าฐานข้อมูลโหลดสำเร็จแต่ไม่มีข้อมูลเลย -->
      <div v-else-if="users && users.length === 0" class="text-gray-500">
        ✅ เชื่อมต่อฐานข้อมูลสำเร็จ! (แต่ในตาราง `users` ตอนนี้ยังไม่มีข้อมูลให้แสดงผลครับ ลองเพิ่มข้อมูลซัก 1 บรรทัดดูนะ)
      </div>

      <!-- โชว์เมื่อมีข้อมูล -->
      <ul v-else class="list-disc pl-5">
        <li v-for="user in users" :key="user.id" class="text-gray-800">
          <strong>อีเมล:</strong> {{ user.email }} | <strong>ชื่อ:</strong> {{ user.firstname }} {{ user.lastname }}
        </li>
      </ul>
    </div>

    <div class="flex gap-4">
      <button @click="add" class="bg-gray-200 font-sarabun text-2xl text-black">
      บวก
    </button>

    <button @click="lob" class="bg-gray-200 font-sarabun text-2xl text-black">
      ลบ
    </button>
    </div>

    <div>
      <p>ตัวเลขปัจจุบันคือ : {{ count }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()

const users = ref([])
const errorMsg = ref('')

const count = ref(0)

async function getUsers() {
  const { data, error } = await supabase.from('users').select('*')
  
  if (error) {
    errorMsg.value = error.message
    console.error('ดึงข้อมูลไม่ได้:', error.message)
  } else if (data) {
    users.value = data
  }
}

function add() {
  count.value++;
}

function lob() {
  count.value--
}

onMounted(() => {
  getUsers()
})
</script>
