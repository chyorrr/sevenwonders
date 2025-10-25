# Visual Features Guide

## 🎬 What You'll See

### 1. **Loading Screen** (0-2 seconds)
```
┌─────────────────────────────┐
│                             │
│        ⟲ Spinning Logo      │
│     "Seven Wonders"         │
│   (Gold & Bronze rings)     │
│                             │
└─────────────────────────────┘
```

### 2. **Hero Section** (First Screen)
```
┌─────────────────────────────────────────┐
│  🌟 3D Wonders Floating in Background   │
│                                         │
│      ✨ Seven Wonders ✨               │
│         of the World                    │
│                                         │
│  "Journey through time and space..."    │
│                                         │
│  [Begin Journey] [Discover More]        │
│                                         │
│         ↓ Scroll to explore             │
└─────────────────────────────────────────┘
```

### 3. **3D Scene** (Fixed Background - Always Visible)
```
      🏛️ Petra                🕌 Taj Mahal (CENTER)              🏛️ Great Wall
         (Left)                   ✨ Glowing ✨                      (Right)
                                  (Largest)
                                     
   ⛰️ Machu Picchu                                            🗿 Christ Redeemer
      (Bottom Left)                                              (Bottom Right)

           🏛️ Colosseum                                    🏛️ Chichen Itza
            (Far Left)                                         (Far Right)

  ✦ ✦ ✦  Particles floating everywhere  ✦ ✦ ✦
  ⭐ ⭐ ⭐  Stars twinkling in background  ⭐ ⭐ ⭐
```

**Interactions:**
- **Mouse Drag**: Rotate camera 360°
- **Scroll**: Zoom in/out
- **Hover**: Models scale up and glow
- **Click**: Open detailed info panel
- **Auto-Rotate**: Scene slowly spins

### 4. **Story Section** (Scroll Down)
```
┌─────────────────────────────────────────┐
│       Dark Background (Navy/Brown)      │
│                                         │
│         " Quote Mark                    │
│    "These monuments are not merely      │
│     stone and mortar..."                │
│                           " Quote Mark  │
│                                         │
│      ══════ TIMELINE ══════            │
│                                         │
│   🏛️ 312 BC ─────●───── Petra          │
│                  │                      │
│   ⚔️ 70-80 AD ───●───── Colosseum      │
│                  │                      │
│   ⛰️ 1450 ───────●───── Machu Picchu   │
│                  │                      │
│   💎 1653 ───────●───── Taj Mahal      │
│                  │                      │
│   ✨ 1931 ───────●───── Christ         │
│                                         │
└─────────────────────────────────────────┘
```

### 5. **Journey Section** (Continue Scrolling)
```
┌─────────────────────────────────────────┐
│      Embark on a Journey                │
│   Through Time • Culture • Wonder       │
│                                         │
│  ╔═══════════════════════════════════╗ │
│  ║  🕌  Taj Mahal                     ║ │
│  ║  📍 Agra, India                    ║ │
│  ║                                    ║ │
│  ║  "A symphony of love carved..."   ║ │
│  ║                                    ║ │
│  ║  Culture: Mughal Architecture     ║ │
│  ║  Did you know? Changes color...   ║ │
│  ║                                    ║ │
│  ║  [Explore This Wonder →]          ║ │
│  ╚═══════════════════════════════════╝ │
│                                         │
│  (2 more wonder cards...)              │
└─────────────────────────────────────────┘
```

### 6. **Wonder Cards** (All 7 Wonders)
```
┌────────┬────────┬────────┐
│ Taj    │ Great  │ Colos- │
│ Mahal  │ Wall   │ seum   │
│        │        │        │
│ 1653   │ 7th BC │ 80 AD  │
│ [→]    │ [→]    │ [→]    │
└────────┴────────┴────────┘

┌────────┬────────┬────────┬────────┐
│ Petra  │ Machu  │ Chichen│ Christ │
│        │ Picchu │ Itza   │        │
│ 312 BC │ 1450   │ 600 AD │ 1931   │
│ [→]    │ [→]    │ [→]    │ [→]    │
└────────┴────────┴────────┴────────┘
```

### 7. **Info Panel** (Slides from Right on Click)
```
                    ┌───────────────┐
                    │      ✕        │
                    │               │
                    │  TAJ MAHAL    │
                    │  📍 Agra      │
                    │               │
                    │  Overview     │
                    │  ─────────    │
                    │  "An immac-   │
                    │   ulate..."   │
                    │               │
                    │  Built: 1632  │
                    │  Builder: ... │
                    │  Dimensions...│
                    │               │
                    │  Facts:       │
                    │  ✦ 22 years   │
                    │  ✦ Marble     │
                    │  ✦ Changes... │
                    │               │
                    └───────────────┘
```

### 8. **Visual Effects**

**Lighting:**
- ☀️ Main Sun (top right) - warm white
- ✨ Spotlight (top center) - ivory on Taj Mahal
- 💫 Accent Lights - gold, bronze, terracotta
- 🌙 Rim Lights - burgundy, navy for silhouettes

**Particles:**
- 600 floating orbs
- Colors: gold, bronze, terracotta, cream
- Slow upward drift
- Additive glow

**Animations:**
- Models breathe (scale 0.98 - 1.02)
- Camera sways gently (sin/cos waves)
- Hover: scale to 1.3x + glow
- Cards: stagger fade-in
- Timeline: items slide from sides
- Decorative circles: rotate slowly

---

## 🎨 Color Usage

### Primary Colors (Models)
- **Taj Mahal**: Ivory white (#FFFFF0) - CENTER, largest
- **Great Wall**: Terracotta (#D4725B) - Defensive structure
- **Colosseum**: Sand (#E8D4B8) - Ancient arena
- **Petra**: Bronze (#CD7F32) - Rose-red cliffs
- **Machu Picchu**: Burgundy (#8B3A3A) - Mountain city
- **Chichen Itza**: Gold (#D4AF37) - Pyramid temple
- **Christ Redeemer**: Mahogany (#5C3317) - Modern statue

### Background Colors
- **Hero**: Transparent over gradient
- **Story**: Navy to Brown gradient (0.95 opacity)
- **Journey**: Cream gradient (0.98 opacity)
- **Cards**: Cream to Sand gradient (0.95 opacity)

---

## 📱 Responsive Breakpoints

- **Desktop** (1920px+): Full experience, all effects
- **Laptop** (1024px+): Slightly reduced particle count
- **Tablet** (768px+): Single column cards, smaller 3D
- **Mobile** (320px+): Touch controls, simplified decorations

---

## ⚡ Performance Indicators

**Good Performance:**
- Smooth 60fps camera rotation
- Particles flow without lag
- Instant hover responses
- Quick page loads (< 3s)

**If Slow:**
- Reduce particle count (line 51 in Particles.jsx)
- Disable auto-rotate (Scene3D.jsx line 40)
- Lower shadow quality (Scene3D.jsx lines 29-35)

---

## 🎯 Navigation Hint (Bottom Right)
```
┌──────────────────────────┐
│  ✕                       │
│  👆  Explore in 3D       │
│  Drag to rotate •        │
│  Scroll to zoom •        │
│  Click wonders for       │
│  details                 │
└──────────────────────────┘
```
*Disappears after 5 seconds or on close*

---

## 🌟 Scroll Progress Bar (Top)
```
████████████░░░░░░░░░░░░░  (Gold/Bronze gradient)
```
*Fills as you scroll down the page*

---

This visual guide helps you understand what the experience looks like!
