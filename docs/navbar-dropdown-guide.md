# 📘 คู่มือ: Dropdown Menu ใน Navbar ด้วย Tailwind CSS

## ภาพรวม

Dropdown ที่ทำใน `Navbar.vue` ทำงานโดยใช้ **CSS `group` และ `group-hover`** ของ Tailwind CSS  
โดยไม่ต้องใช้ JavaScript ในการ toggle เปิด/ปิด

---

## 🏗️ โครงสร้าง HTML

```html
<!-- wrapper หลัก: ต้องใส่ class="group" เพื่อให้ลูกใช้ group-hover ได้ -->
<div class="relative h-full flex items-center group">

    <!-- ปุ่มเมนู (trigger) -->
    <a href="#">
        บทความ
        <svg>...</svg>  <!-- ลูกศรชี้ลง -->
    </a>

    <!-- Dropdown Panel (ซ่อนอยู่ตอนแรก) -->
    <div class="absolute top-full left-0
                opacity-0 invisible        ← ← ← ซ่อนตอนปกติ
                group-hover:opacity-100
                group-hover:visible        ← ← ← โผล่เมื่อ hover ที่ group">
        <a>รูปแบบบทความ</a>
        <a>บทความของฉัน</a>
        <a>บทความย้อนหลัง</a>
    </div>

</div>
```

---

## 🔑 Concept สำคัญ: `group` และ `group-hover`

### 1. `group` — กำหนดพื้นที่ trigger

```html
<div class="group">  ← ใส่ที่ element แม่
```

เมื่อ user วาง mouse ที่ `div` นี้ **ทุก element ลูก** ที่มี prefix `group-hover:` จะทำงาน

---

### 2. `group-hover:` — สิ่งที่จะเกิดขึ้นเมื่อ hover

| Class ตอนปกติ | Class เมื่อ hover | ความหมาย |
|---|---|---|
| `opacity-0` | `group-hover:opacity-100` | โปร่งใส → มองเห็น |
| `invisible` | `group-hover:visible` | ไม่นับพื้นที่ → นับพื้นที่ |
| `translate-y-1` | `group-hover:translate-y-0` | เลื่อนลง 4px → ตำแหน่งปกติ |

> ⚠️ **ทำไมต้องใช้ทั้ง `opacity` และ `invisible` ?**
> - `opacity-0` คือโปร่งใส แต่ยังมีพื้นที่ → ยังคลิกได้
> - `invisible` คือซ่อนและไม่นับพื้นที่ → คลิกไม่ได้
> - ใช้คู่กันเพื่อให้ซ่อนสนิทเมื่อไม่ hover

---

### 3. `transition-all duration-200` — Animation เนียน

```html
<div class="... transition-all duration-200">
```

ทำให้การเปลี่ยนแปลงทุก property มี animation 200ms แทนที่จะเปลี่ยนทันที

---

## 📐 การจัดตำแหน่ง Dropdown

```html
<div class="absolute top-full left-0 ...">
```

| Class | ความหมาย |
|---|---|
| `absolute` | วางตำแหน่งแบบ absolute ภายใน parent ที่มี `relative` |
| `top-full` | เริ่มต้นที่ขอบล่างของ parent (ใต้ navbar ทันที) |
| `left-0` | ชิดซ้ายของ parent |

> ⚠️ parent ต้องมี `relative` ไม่งั้น dropdown จะลอยผิดที่!

---

## 🔄 ลูกศรหมุน

```html
<svg class="w-3 h-3 transition-transform duration-200 group-hover:rotate-180">
```

- ปกติ: ชี้ลง (0°)
- เมื่อ hover: หมุน 180° → ชี้ขึ้น

---

## 📦 โครงสร้าง Data (`menus` array)

```js
const menus = [
    // เมนูปกติ: มีแค่ label และ href
    { label: 'หน้าแรก', href: '/' },

    // เมนู dropdown: มี children เพิ่มมา
    {
        label: 'บทความ',
        children: [
            { label: 'รูปแบบบทความ',  href: '#' },
            { label: 'บทความของฉัน',   href: '#' },
            { label: 'บทความย้อนหลัง', href: '#' },
        ]
    },

    { label: 'การชำระเงิน', href: '#' },
    // ...
]
```

### Logic ใน Template

```html
<!-- ถ้า menu มี children → render แบบ dropdown -->
<div v-if="menu.children" class="group ...">
    ...
</div>

<!-- ถ้าไม่มี children → render แบบปกติ -->
<a v-else ...>{{ menu.label }}</a>
```

---

## ➕ วิธีเพิ่ม Dropdown ให้เมนูอื่น

แค่เพิ่ม `children` ใน object ของเมนูที่ต้องการ:

```js
{ 
    label: 'รางวัล/เกียรติบัตร',  // เมนูที่อยากให้มี dropdown
    children: [
        { label: 'รางวัลดีเด่น',   href: '#' },
        { label: 'เกียรติบัตรออนไลน์', href: '#' },
    ]
}
```

---

## 🗂️ ไฟล์ที่เกี่ยวข้อง

- `app/components/Navbar.vue` — component หลักที่ใช้งาน dropdown นี้
