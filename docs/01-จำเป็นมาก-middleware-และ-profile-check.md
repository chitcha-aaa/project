# 📖 [จำเป็นมาก] Middleware และ Profile Check

## ไฟล์ที่เกี่ยวข้อง
- `app/middleware/auth.global.ts`

---

## Middleware คืออะไร?

**Middleware** คือโค้ดที่รันก่อนที่หน้าใดๆ จะโหลด ใช้สำหรับ "เฝ้าประตู" — เช็คว่าผู้ใช้มีสิทธิ์เข้าหน้านั้นหรือไม่

| ชื่อไฟล์ | ทำงานเมื่อ |
|--------|---------|
| `auth.global.ts` | ทุกครั้งที่มีการเปลี่ยนหน้า (`.global` = global middleware) |
| `auth.ts` (ถ้าไม่มี global) | เฉพาะหน้าที่ระบุ `definePageMeta({ middleware: 'auth' })` |

---

## โค้ดที่เราเขียน

```typescript
// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  // รันเฉพาะฝั่ง Client เท่านั้น (SSR ไม่มี Supabase session)
  if (process.server) return

  const supabase = useSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  // หน้าที่ต้อง login ก่อน
  const protectedPrefixes = ['/admin', '/author', '/reviewer']
  const isProtected = protectedPrefixes.some(prefix => to.path.startsWith(prefix))

  // หน้า setup → ต้อง whitelist ไว้ (ไม่งั้น redirect วนไม่หยุด)
  const isSetupPage = to.path.endsWith('/setup')

  // กรณีที่ 1: ยังไม่ login + เป็น protected route
  if (!session && isProtected) {
    return navigateTo('/login')
  }

  // กรณีที่ 2: Login แล้ว → เช็ค is_profile_complete
  if (session && isProtected) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, is_profile_complete')
      .eq('id', session.user.id)
      .single()

    const role = (profile?.role || '').toLowerCase()
    const isComplete = profile?.is_profile_complete === true

    // profile ยังไม่ครบ + ไม่ได้อยู่ setup → บังคับไปกรอก
    if (!isComplete && !isSetupPage) {
      if (role === 'admin')    return navigateTo('/admin/setup')
      if (role === 'reviewer') return navigateTo('/reviewer/setup')
      if (role === 'author')   return navigateTo('/author/setup')
    }
  }
})
```

---

## ทำไมต้อง Whitelist หน้า Setup?

ถ้าไม่ whitelist จะเกิด **Infinite Redirect Loop** เช่น:

```
/author/home → [profile ไม่ครบ] → redirect /author/setup
/author/setup → [profile ไม่ครบ] → redirect /author/setup ← วนซ้ำ!
```

การเช็ค `isSetupPage = to.path.endsWith('/setup')` แก้ปัญหานี้ได้:

```
/author/home → [profile ไม่ครบ] → redirect /author/setup
/author/setup → [isSetupPage = true] → ปล่อยผ่าน ✅
```

---

## Flow ทั้งหมด

```
User พิมพ์ URL /_*/home
         ↓
middleware รัน
         ↓
  session มีไหม?
  ├─ ไม่มี → redirect /login
  └─ มี → ดึง profile จาก DB
              ↓
        is_profile_complete = true?
        ├─ ใช่  → เข้าหน้านั้นได้ ✅
        └─ ไม่ใช่ → redirect /_role_/setup
```

---

## สิ่งที่ต้องรู้เพิ่มเติม

### `process.server`
Nuxt 3 รันโค้ดทั้ง Server (SSR) และ Client Middleware ของ Supabase ต้องรันเฉพาะ Client เท่านั้น เพราะ session อยู่ใน browser ไม่ใช่ server

### `navigateTo()`
ฟังก์ชัน built-in ของ Nuxt ใช้ redirect ใน middleware (ต่างจาก `useRouter().push()` ที่ใช้ใน component)

### `.single()`
ใช้กับ Supabase query เมื่อต้องการ row เดียว ถ้าไม่เจอจะ return `data = null` ไม่ throw error (ถ้าใช้กับ `.maybeSingle()`)
