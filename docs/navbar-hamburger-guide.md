# 📘 คู่มือ: Hamburger Menu (Responsive Navbar) ด้วย Tailwind CSS + Vue 3

## ภาพรวม

Hamburger Menu คือ ปุ่ม ☰ ที่โผล่บนหน้าจอมือถือ เมื่อกด จะเปิด menu แบบ drawer ลงมา  
บน desktop จะแสดง menu แถบปกติแทน

---

## 🗺️ แผนผังโครงสร้าง (Layout)

```
Navbar
├── Logo
├── Desktop Menu     ← แสดงเฉพาะ lg+ (hidden บน mobile)
└── Right Section
    ├── ปุ่ม Login   ← แสดงเฉพาะ sm+ 
    └── Hamburger    ← แสดงเฉพาะ < lg (hidden บน desktop)

Mobile Drawer        ← อยู่ใต้ Navbar, เปิด/ปิดด้วย state
├── เมนูแต่ละรายการ
│   ├── เมนูปกติ
│   └── เมนู Dropdown (accordion)
└── ปุ่ม Login (เฉพาะ mobile เล็กมาก < sm)
```

---

## 🔑 Concept ที่ 1: Breakpoints (Responsive)

Tailwind ใช้ prefix กำหนดว่า class จะทำงานที่ขนาดจอไหน

| Prefix | ขนาดจอขั้นต่ำ | ใช้แทน |
|---|---|---|
| (ไม่มี) | ทุกขนาด (mobile first) | — |
| `sm:` | 640px+ | tablet เล็ก |
| `md:` | 768px+ | tablet |
| `lg:` | 1024px+ | desktop |
| `xl:` | 1280px+ | desktop ใหญ่ |

### ตัวอย่าง: ซ่อน/แสดงตามขนาดจอ

```html
<!-- Desktop Menu: ซ่อนบน mobile, แสดงบน lg+ -->
<div class="hidden lg:flex ...">
    เมนู desktop
</div>

<!-- Hamburger: แสดงบน mobile, ซ่อนบน lg+ -->
<button class="lg:hidden ...">
    ☰
</button>
```

> **หลัก**: Tailwind เป็น **mobile-first** → เขียน class สำหรับมือถือก่อน แล้วค่อย override ด้วย `lg:` สำหรับ desktop

---

## 🔑 Concept ที่ 2: Hamburger Animation (3 เส้น → X)

ปุ่ม hamburger ทำจาก `<span>` 3 เส้น แล้ว animate ด้วย CSS Transform

```html
<button @click="mobileOpen = !mobileOpen">
    <!-- เส้นบน: หมุน +45° และเลื่อนลง เมื่อเปิด -->
    <span :class="mobileOpen ? 'rotate-45 translate-y-2' : ''"></span>
    
    <!-- เส้นกลาง: หายไปเมื่อเปิด -->
    <span :class="mobileOpen ? 'opacity-0 scale-x-0' : ''"></span>
    
    <!-- เส้นล่าง: หมุน -45° และเลื่อนขึ้น เมื่อเปิด -->
    <span :class="mobileOpen ? '-rotate-45 -translate-y-2' : ''"></span>
</button>
```

### ทำไม 3 เส้นกลายเป็น X ได้?

```
ปกติ (☰):          เมื่อเปิด (✕):
───────             \
───────    →          (หายไป)
───────             /
```

- เส้นบน: หมุน 45° + เลื่อนลง 8px → เป็นเส้น `\`
- เส้นกลาง: โปร่งใสหายไป
- เส้นล่าง: หมุน -45° + เลื่อนขึ้น 8px → เป็นเส้น `/`

---

## 🔑 Concept ที่ 3: Drawer Animation ด้วย `max-height`

ไม่สามารถ animate `height: auto` ด้วย CSS ได้โดยตรง แก้โดยใช้ `max-height` แทน

```html
<div
    :style="mobileOpen ? 'max-height: 700px; opacity: 1;' : 'max-height: 0px; opacity: 0;'"
    class="overflow-hidden transition-all duration-300 ease-in-out">
    ...เนื้อหา menu...
</div>
```

### ทำไมต้องใช้ `max-height` ไม่ใช่ `height`?

| วิธี | ปัญหา |
|---|---|
| `height: 0 → auto` | ❌ CSS ไม่รู้ค่า `auto` → animate ไม่ได้ |
| `max-height: 0 → 700px` | ✅ CSS รู้ทั้งสองค่า → animate ได้ |

> ⚠️ ตั้ง `max-height` ให้สูงกว่าเนื้อหาจริงพอสมควร (เช่น 700px สำหรับเมนู 8 รายการ)

---

## 🔑 Concept ที่ 4: Accordion Submenu บน Mobile

เมนูที่มีรายการย่อยบน mobile ใช้ pattern accordion (กดเปิด ผลัดกันแสดง)

```js
// state: เก็บชื่อเมนูที่กำลัง expand
const mobileExpandedMenu = ref(null)

function toggleMobileMenu(label) {
    // ถ้ากดเมนูเดิม → ปิด (null)
    // ถ้ากดเมนูใหม่ → เปิดอันใหม่ (ปิดอันเก่าอัตโนมัติ)
    mobileExpandedMenu.value = mobileExpandedMenu.value === label ? null : label
}
```

```html
<!-- ปุ่ม toggle -->
<button @click="toggleMobileMenu(menu.label)">
    {{ menu.label }}
    <!-- ลูกศรหมุนเมื่อ expand -->
    <svg :class="mobileExpandedMenu === menu.label ? 'rotate-180' : ''">...</svg>
</button>

<!-- ซับเมนู: เปิด/ปิดด้วย max-height -->
<div :style="mobileExpandedMenu === menu.label ? 'max-height: 200px;' : 'max-height: 0px;'"
     class="overflow-hidden transition-all duration-300">
    <a v-for="child in menu.children">{{ child.label }}</a>
</div>
```

---

## 📦 State ที่ใช้ใน Script

```js
import { ref } from 'vue'

// ควบคุมการเปิด/ปิด drawer ทั้งหมด
const mobileOpen = ref(false)

// ชื่อเมนูที่กำลัง expand อยู่ (null = ปิดหมด)
const mobileExpandedMenu = ref(null)
```

---

## 📐 โครงสร้าง Navbar ทั้งหมด (สรุป)

```
relative               ← จำเป็น! ให้ drawer วางตำแหน่ง absolute ได้ถูกต้อง
│
├── flex (desktop layout)
│   ├── Logo
│   ├── Desktop Menu (hidden lg:flex)
│   └── Right Section
│       ├── Login Button (hidden sm:block)
│       └── Hamburger (lg:hidden)
│
└── Mobile Drawer (lg:hidden absolute top-full)
    ├── เมนูรายการ
    └── Login Button (sm:hidden)
```

---

## ➕ วิธีเพิ่มเมนูที่มี Dropdown บน Mobile

เพิ่ม `children` ใน `menus` array เหมือนเดิม — ระบบจะจัดการให้อัตโนมัติทั้ง desktop (hover) และ mobile (tap accordion):

```js
const menus = [
    { label: 'หน้าแรก', href: '/' },
    {
        label: 'บทความ',      // ← มี dropdown ทั้งบน desktop และ mobile
        children: [
            { label: 'ส่งบทความ',      href: '#' },
            { label: 'รูปแบบบทความ',   href: '#' },
            { label: 'บทความย้อนหลัง', href: '#' },
        ]
    },
    { label: 'การชำระเงิน', href: '#' },  // ← เมนูปกติ
]
```

---

## 🗂️ ไฟล์ที่เกี่ยวข้อง

- `app/components/Navbar.vue` — component ที่ใช้งาน hamburger menu
- `docs/navbar-dropdown-guide.md` — คู่มือ dropdown บน desktop
