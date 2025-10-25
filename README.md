# Seven Wonders of the World - Cinematic Digital Storytelling Experience

An immersive, interactive 3D travel website that takes users on a **cinematic journey** through the Seven Wonders of the World. This is not just a travel site—it's a digital storytelling experience that blends culture, history, and emotion.

## 🎬 Cinematic Features

### ✨ **Immersive 3D Environment**
- **Detailed 3D Models**: Each wonder features architecturally accurate 3D representations:
  - **Taj Mahal**: Dome, minarets, marble details with emissive glow
  - **Great Wall**: Watchtowers, crenellations, and defensive structures
  - **Colosseum**: Multi-tiered arches, arena floor, decorative rings
  - **Petra**: Rose-red cliff carvings, Treasury facade, columns
  - **Machu Picchu**: Terraced levels, Incan temples, mountain peaks
  - **Chichen Itza**: Stepped pyramid, serpent heads, temple structures
  - **Christ the Redeemer**: Detailed statue with robes, halo, and pedestal

### 🎭 **Dynamic Animations**
- **Breathing Effect**: Models subtly expand and contract, appearing alive
- **Cinematic Camera**: Gentle automated sway and rotation
- **Hover Interactions**: Models scale and glow when hovered
- **Floating Motion**: Each wonder floats independently in 3D space
- **Particle System**: 600+ colored particles create atmospheric depth
- **Starfield**: 3,000 stars with fade and movement effects

### 📖 **Storytelling Sections**

#### 1. **Hero Section**
- Dramatic entrance with fade-in animations
- Parallax scrolling effects
- Vintage-themed call-to-action buttons
- Animated scroll indicators

#### 2. **Story Section** (NEW!)
- Cinematic quote presentation
- **Interactive Timeline**: Visual journey through history
  - 312 BC: Petra
  - 70-80 AD: Colosseum
  - 1450: Machu Picchu
  - 1653: Taj Mahal
  - 1931: Christ the Redeemer
- Animated decorative elements
- Scroll-triggered reveals

#### 3. **Journey Section** (NEW!)
- **Emotionally Engaging Cards** featuring:
  - Cultural insights
  - Historical context
  - Travel stories
  - "Did you know?" facts
- Hover effects with glowing borders
- Call-to-action for each wonder

#### 4. **Wonder Cards**
- Detailed information cards
- Scroll-reveal animations
- Location markers
- Year built indicators
- Interactive explore buttons

### 💡 **Advanced Lighting System**
- **Multiple Light Sources**:
  - Ambient light for overall illumination
  - Directional sun with realistic shadows
  - Accent point lights in vintage colors (gold, bronze, terracotta)
  - Dramatic spotlight on center (Taj Mahal)
  - Rim lights for silhouette effects
- **Emissive Materials**: Models glow subtly on hover
- **Shadow Casting**: Realistic shadows enhance depth
- **Tone Mapping**: Cinematic color grading (ACES Filmic)

### 🎨 **Vintage Aesthetic**
- Carefully curated color palette inspired by antique maps and sepia photography
- Georgian serif typography for elegance
- Ornamental decorative elements
- Custom scrollbar design
- Gradient backgrounds with texture

### � **Interactive Elements**
- **Click Wonders**: Open detailed information panels
- **Drag to Explore**: Orbit controls for 360° viewing
- **Zoom Controls**: Scroll to zoom in/out (12-35 units range)
- **Auto-Rotation**: Gentle automatic scene rotation
- **Navigation Hints**: Helpful tooltips for first-time users
- **Smooth Transitions**: Damped camera movements
- **Responsive Touch**: Works on mobile and tablet devices

### �🏛️ The Seven Wonders
1. **Taj Mahal** (Center) - Agra, India
2. **Great Wall of China** - China
3. **Colosseum** - Rome, Italy
4. **Petra** - Jordan
5. **Machu Picchu** - Peru
6. **Chichen Itza** - Mexico
7. **Christ the Redeemer** - Rio de Janeiro, Brazil

### 🎬 **Animation Details**
- **Loading Screen**: Animated spinning logo with dual rings
- **Scroll Progress Bar**: Gold/bronze gradient indicator
- **Fade-in on Scroll**: Content reveals as you scroll
- **Parallax Layers**: Multi-depth scrolling effect
- **Bounce Indicators**: Animated scroll prompts
- **Card Stagger**: Sequential card animations
- **Hover Glows**: Dynamic lighting on interaction
- **Button Ripples**: Shine effects on CTAs
- **Background Particles**: Constantly moving ambient effects
- **Cinematic Breathing**: Models pulse subtly

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🛠️ Technologies Used

- **React 19** - Latest UI framework
- **Vite 7** - Lightning-fast build tool
- **Three.js** - WebGL 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers (OrbitControls, Text, Environment, etc.)
- **Framer Motion** - Production-ready animation library with scroll hooks
- **Custom Shaders** - Enhanced materials and lighting

## 🎯 **Storytelling Elements**

This project goes beyond a typical travel website by incorporating:

1. **Emotional Engagement**: Personal stories and cultural significance
2. **Historical Context**: Timeline showing when each wonder was built
3. **Cultural Insights**: Information about the civilizations that created them
4. **Travel Inspiration**: Beautiful visuals that make users want to visit
5. **Educational Value**: "Did you know?" facts and architectural details
6. **Cinematic Presentation**: Movie-like camera work and lighting
7. **Interactive Discovery**: Users explore at their own pace

## 🎨 Color Scheme

```css
--vintage-cream: #FFF8E7
--vintage-sand: #E8D4B8
--vintage-terracotta: #D4725B
--vintage-burgundy: #8B3A3A
--vintage-gold: #D4AF37
--vintage-bronze: #CD7F32
--vintage-sepia: #704214
--vintage-navy: #2C3E50
--vintage-ivory: #FFFFF0
--vintage-mahogany: #5C3317
```

## 📱 Responsive Design

Fully responsive design that works on:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

## 🎯 Performance Optimizations

- **Lazy Loading**: 3D components load on demand with Suspense
- **Optimized Particle Count**: Balanced visual quality and performance (600 particles)
- **Efficient Geometry**: Reused geometries and materials
- **LOD (Level of Detail)**: Models optimized for performance
- **CSS Animations**: Hardware-accelerated transforms
- **Code Splitting**: Dynamic imports for faster initial load
- **Shadow Optimization**: Carefully tuned shadow map sizes
- **Damping**: Smooth camera movements reduce re-renders
- **Tone Mapping**: Cinematic color without performance hit

## 🌟 **Design Philosophy**

**"Transport users through time and space"**

Every element is designed to create an emotional connection:
- **Vintage colors** evoke nostalgia and timelessness
- **Smooth animations** create a premium, polished feel
- **3D models** provide tactile, explorable experiences
- **Storytelling** gives context and meaning
- **Lighting** sets the mood and atmosphere
- **Typography** adds elegance and readability

## 🚀 **User Journey**

1. **Arrival**: Loading animation builds anticipation
2. **Hero**: Dramatic introduction with floating 3D scene
3. **Story**: Emotional quote and historical timeline
4. **Journey**: Featured wonders with cultural context
5. **Explore**: All seven wonders with detailed cards
6. **Interaction**: Click any wonder for in-depth information
7. **Discovery**: Navigate the 3D scene freely

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by the magnificence of the Seven Wonders of the World
- Three.js community for excellent 3D tools
- React and Framer Motion teams for amazing libraries

---

**Explore the timeless beauty of humanity's greatest achievements** ✨

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
