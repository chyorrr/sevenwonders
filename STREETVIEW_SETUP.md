# Google Maps Street View Setup Guide

## ✅ Current Status
- API Key is configured in `.env` file
- `@react-google-maps/api` package is installed
- Component is ready to use

## 🔧 Setup Steps

### 1. **Restart Dev Server** (IMPORTANT!)
After adding or changing the `.env` file, you MUST restart the dev server:

```bash
# Stop the current server (Ctrl+C if running)
# Then start fresh:
npm run dev
```

### 2. **Verify API Key in Console**
Once the server restarts:
1. Click the globe icon to go to Street View
2. Open browser DevTools (F12)
3. Check the Console tab
4. You should see debug logs showing:
   - "API Key exists: true"
   - "API Key value: AIzaSy..."

### 3. **Enable Required APIs in Google Cloud Console**
Go to: https://console.cloud.google.com/

Enable these APIs:
- ✅ Maps JavaScript API
- ✅ Street View Static API
- ✅ Places API

### 4. **Check API Key Restrictions**
In Google Cloud Console > Credentials:
- Click on your API key
- Check "Application restrictions": Should be "None" or allow your domain
- Check "API restrictions": Should include Maps JavaScript API

### 5. **Enable Billing** (Required for Google Maps!)
- Google Maps requires a billing account
- Go to: https://console.cloud.google.com/billing
- Add a payment method

## 🐛 Troubleshooting

### Issue: "Maps Loading Error"
**Solution**: Check the error message in the red error screen
- Common causes:
  - Billing not enabled
  - API not enabled
  - API key invalid
  - Domain restriction blocking localhost

### Issue: Street View shows gray/blank
**Solution**: 
- The coordinates might not have Street View coverage
- Try the "Aerial" or "Satellite" view modes instead
- Some locations have limited Street View data

### Issue: "API Key: missing"
**Solution**:
1. Make sure `.env` file exists in project root
2. Restart the dev server completely
3. Check the file content matches exactly:
   ```
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyDV37nzyS-OFsiRXa4TBFjWrkR8JwAMsHI
   ```

## 📍 Test Locations

The component has 3 pre-configured viewpoints for Taj Mahal:
- Main Gate: 27.1754°N, 78.0419°E
- Front Garden: 27.1750°N, 78.0423°E  
- Rear View: 27.1746°N, 78.0420°E

## 🎮 Controls

### View Modes (Top buttons):
- 🚶 **Street View**: 360° panorama
- 🛩️ **Aerial View**: Angled satellite view
- 🛰️ **Satellite View**: Top-down satellite view

### Street View Controls (Bottom panel):
- **◀ ▶ Buttons**: Switch between viewpoints
- **Auto-Rotate Toggle**: Automatically rotate the view
- **Zoom Slider**: Control zoom level
- **Mouse/Touch**: Pan around the panorama

## 📝 Quick Commands

```bash
# Install dependencies (if needed)
npm install

# Start dev server
npm run dev

# The app will be at:
# http://localhost:5173
```

## 🌐 Navigation

1. App loads with cinematic intro (8 seconds)
2. Hero section appears
3. Click the **globe icon** (bottom-right corner)
4. Street View loads!
5. Click "← Back to Home" to return

## ⚠️ Important Notes

- **Server restart is required** after any `.env` changes
- Google Maps requires **active billing** (they won't charge much for testing)
- Street View coverage varies by location
- Console logs will help debug issues
