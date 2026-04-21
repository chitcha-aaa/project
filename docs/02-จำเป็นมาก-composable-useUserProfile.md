# 📖 [จำเป็นมาก] Composable — useUserProfile

## ไฟล์ที่เกี่ยวข้อง
- `app/composables/useUserProfile.ts`

---

## Composable คืออะไร?

**Composable** คือฟังก์ชัน Vue 3 ที่ห่อหุ้ม logic ที่ใช้ซ้ำกันในหลาย Component เป็น pattern แทนที่ Mixin เดิมของ Vue 2

```
Component A (Navbar.vue)    ──┐
Component B (AppSidebar.vue) ──┤── ใช้ useUserProfile() ร่วมกัน
Component C (author/home.vue) ─┘
```

ปกติถ้าไม่ใช้ composable จะต้องเขียน supabase fetch และ logout logic ในทุก Component ซึ่งซ้ำและดูแลยาก

---

## useState vs ref — ความแตกต่างสำคัญ

```typescript
// ref ปกติ → แต่ละ Component ที่เรียก composable จะได้ state ตัวเอง (ไม่แชร์)
const profile = ref(null)

// useState ของ Nuxt → state เดียวกันทุก Component (แชร์กัน)
const profile = useState('userProfile', () => null)
//                         ↑ key สำหรับ identify state นี้
```

### ทำไมใช้ useState?

เพราะ `Navbar.vue` และ `AppSidebar.vue` ต่างก็เรียก `fetchProfile()` แต่ถ้าใช้ `useState` จะ fetch แค่ครั้งแรก ครั้งต่อไปจะใช้ state ที่แชร์กันอยู่แล้ว

---

## โครงสร้างของ useUserProfile

```typescript
export const useUserProfile = () => {
  // 1. ดึง Supabase client
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()  // reactive: อัปเดตอัตโนมัติเมื่อ login/logout

  // 2. State ที่แชร์ข้าม component
  const profile = useState('userProfile', () => null)

  // 3. Computed properties (คำนวณจาก state)
  const displayName = computed(() => {
    // ลำดับ: ชื่อไทย → ชื่ออังกฤษ → email
    const first = profile.value?.firstname_th || profile.value?.firstname_eng || ''
    const last  = profile.value?.lastname_th  || profile.value?.lastname_eng  || ''
    return `${first} ${last}`.trim() || user.value?.email || ''
  })

  // 4. Functions
  const fetchProfile = async () => { /* ดึงข้อมูลจาก DB */ }
  const logout = async () => { /* signOut + redirect */ }

  // 5. Return ทุกอย่างที่ Component ต้องการ
  return { profile, displayName, isLoggedIn, fetchProfile, logout, ... }
}
```

---

## การใช้งานใน Component

```vue
<script setup>
// เรียก composable — ได้ทุกอย่างกลับมาทันที
const {
  displayName,      // ชื่อ (computed)
  isLoggedIn,       // boolean
  isProfileComplete, // boolean
  fetchProfile,     // function: ดึง profile
  logout,           // function: logout
} = useUserProfile()

// fetch ตอน component mount
onMounted(() => {
  fetchProfile()
})
</script>

<template>
  <!-- ใช้ใน template ได้เลย -->
  <span>{{ displayName }}</span>
  <button v-if="isLoggedIn" @click="logout">ออกจากระบบ</button>
</template>
```

---

## ตาราง Properties ที่ return

| Property | Type | คำอธิบาย |
|----------|------|---------|
| `profile` | `Ref<Profile \| null>` | ข้อมูล profile ทั้งหมด |
| `displayName` | `ComputedRef<string>` | ชื่อสำหรับแสดง (ไทย หรือ อังกฤษ) |
| `avatarInitial` | `ComputedRef<string>` | อักษรแรกของชื่อ (ใช้ใน avatar) |
| `isLoggedIn` | `ComputedRef<boolean>` | `true` ถ้า login แล้ว |
| `isProfileComplete` | `ComputedRef<boolean>` | `true` ถ้า `is_profile_complete = true` |
| `userRole` | `ComputedRef<string>` | 'admin', 'reviewer', 'author' |
| `profileEditPath` | `ComputedRef<string>` | path ไปยังหน้า setup ของ role นั้น |
| `fetchProfile` | `Function` | ดึงข้อมูล profile จาก Supabase |
| `logout` | `Function` | sign out + redirect ไป '/' |

---

## ข้อควรระวัง

### 1. ต้องเรียก fetchProfile() ใน onMounted()
```typescript
// ✅ ถูกต้อง
onMounted(() => {
  fetchProfile()
})

// ❌ ผิด — เรียกนอก lifecycle hook
fetchProfile()  // อาจรันก่อน component พร้อม
```

### 2. useState key ต้องไม่ซ้ำกันทั่วทั้งแอป
```typescript
// ✅ ถูกต้อง
useState('userProfile', () => null)

// ❌ อันตราย — ถ้า key ซ้ำกับอีก composable จะได้ state ปะปนกัน
useState('profile', () => null)
```

### 3. Computed ไม่ใช่ ref — ไม่ต้อง .value เมื่อใช้ใน template
```vue
<!-- ✅ ถูกต้องใน template -->
<span>{{ displayName }}</span>

<!-- ✅ ถูกต้องใน script -->
console.log(displayName.value)
```
