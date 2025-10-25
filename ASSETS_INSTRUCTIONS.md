# Assets Required for Cinematic Intro

## Image File
**File:** `taj.jpeg` or `taj.jpg`
**Location:** `/public/taj.jpeg`
**Description:** A high-quality image of the Taj Mahal
**Recommended specs:**
- Resolution: 1920x1080 or higher
- Format: JPEG
- Orientation: Landscape
- Focus: Clear view of the Taj Mahal monument

## Audio File
**File:** `birds-chirping.mp3`
**Location:** `/public/birds-chirping.mp3`
**Description:** Ambient birds chirping sound for peaceful atmosphere
**Recommended specs:**
- Format: MP3
- Duration: 10-15 seconds (or longer)
- Volume: Medium (will be set to 30% in code)
- Type: Nature sounds, birds chirping

## How to Add Assets

1. **For the Image:**
   - Download or find a Taj Mahal image
   - Rename it to `taj.jpeg` (or update the code if using different extension)
   - Place it in the `public` folder: `/public/taj.jpeg`

2. **For the Audio:**
   - Download birds chirping sound effect (royalty-free)
   - Recommended sources:
     - freesound.org
     - YouTube Audio Library
     - Pixabay sounds
   - Rename to `birds-chirping.mp3`
   - Place it in the `public` folder: `/public/birds-chirping.mp3`

## Note
If assets are not found:
- The image will fallback to a vintage gradient background
- The audio will fail silently (no error shown to user)

The intro will still work beautifully without these assets, but adding them will enhance the experience significantly!
