# Audio Files

## Required Audio File

Place the birds chirping audio file here:

**Filename**: `birds-chirping.mp3`
**Location**: `/public/audio/birds-chirping.mp3`

### Where to Get Birds Chirping Audio:

1. **Free Audio Sources**:
   - Pixabay: https://pixabay.com/sound-effects/search/birds/
   - Freesound: https://freesound.org/search/?q=birds+chirping
   - YouTube Audio Library: https://studio.youtube.com/
   - Uppbeat: https://uppbeat.io/

2. **Search Terms**:
   - "birds chirping morning"
   - "nature ambience birds"
   - "peaceful birds sounds"
   - "garden birds ambient"

3. **Download Steps**:
   - Download the MP3 file
   - Rename it to `birds-chirping.mp3`
   - Place it in this `/public/audio/` folder

### Alternative: Use a Free CDN URL

If you don't want to download, you can use a URL directly. 
Edit `TajMahalExperience.jsx` and change the audio source:

```javascript
audioRef.current = new Audio('https://your-cdn-url/birds-chirping.mp3');
```

## Current File Status

- ❌ `birds-chirping.mp3` - **Please add this file**

Once added, the audio toggle button (bottom-left) will work!
