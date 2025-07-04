# TraceGreen Deployment Guide

## 🚀 Frontend Deployment (Netlify)

### Option 1: Auto-Deploy from GitHub
1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub account
4. Select the `TraceGreen` repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 2: Manual Deploy
```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

## 🗄️ Backend Deployment Options

### Option 1: Railway (Recommended)
1. Go to [Railway](https://railway.app)
2. Connect GitHub repository
3. Select the TraceGreen repo
4. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: 5000
   - `NODE_ENV`: production

### Option 2: Heroku
```bash
# Install Heroku CLI
# Create Heroku app
heroku create tracegreen-backend

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Option 3: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🔧 Environment Variables Needed

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tracegreen_auth
NODE_ENV=production
JWT_SECRET=your_jwt_secret_here
```

### Frontend (Update API URL)
Update `src/pages/ManufacturerAuth.jsx` to use production API URL:
```javascript
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com' 
  : 'http://localhost:5000';
```

## 📋 Pre-Deployment Checklist

- ✅ Build successful (`npm run build`)
- ✅ All merge conflicts resolved
- ✅ Environment variables configured
- ✅ MongoDB database set up
- ✅ API endpoints tested
- ✅ Frontend connects to backend API

## 🌐 Post-Deployment

1. **Test the deployment**:
   - Frontend should load at your Netlify URL
   - Backend should respond at your hosting URL
   - Authentication should work end-to-end

2. **Update CORS settings** in `server.js`:
   ```javascript
   app.use(cors({
     origin: ['https://your-netlify-url.netlify.app', 'http://localhost:5173']
   }));
   ```

3. **Monitor logs** for any deployment issues

## 🔗 Useful Links

- **Frontend**: Will be deployed to Netlify
- **Backend**: Choose Railway, Heroku, or Vercel
- **Database**: MongoDB Atlas (recommended)
- **Repository**: https://github.com/Sunalsaha/TraceGreen.git
