# Video Files

## Background Video for Taj Mahal Experience

Place the Taj Mahal background video here:

**Filename**: `taj-mahal-video.mp4`
**Location**: `/public/video/taj-mahal-video.mp4`

### Video Specifications:

- **Format**: MP4 (H.264 codec recommended)
- **Resolution**: 1080p or 720p
- **Duration**: Any (will loop)
- **Content**: Taj Mahal footage - gardens, architecture, ambience

### Where to Get Video:

1. **Free Video Sources**:
   - Pexels: https://www.pexels.com/search/videos/taj%20mahal/
   - Pixabay: https://pixabay.com/videos/search/taj%20mahal/
   - Coverr: https://coverr.co/
   - Videvo: https://www.videvo.net/

2. **Download Steps**:
   - Download the MP4 file
   - Rename it to `taj-mahal-video.mp4`
   - Place it in this `/public/video/` folder

### Current Setup:

The component already looks for:
1. `/video/taj-mahal-video.mp4` (primary)
2. `/src/video/videoplayback.mp4` (fallback)

If you already have a video at `/src/video/videoplayback.mp4`, it will work!

### Video Effect:

The video will be:
- Displayed as a subtle background (15% opacity)
- Sepia-toned for vintage feel
- Looped continuously
- Muted (audio control is separate)
- Fixed position behind all content

## Current File Status

- ⚠️ `taj-mahal-video.mp4` - **Optional, will use fallback if missing**
- ✅ `/src/video/videoplayback.mp4` - Already exists (used in RetroScroll)
