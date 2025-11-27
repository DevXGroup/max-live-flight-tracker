# 🛫 Live Flight Tracker

A professional, real-time flight tracking application built with Next.js, featuring live position updates, interactive maps, and accurate flight data.

![Flight Tracker](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- 🗺️ **Interactive Map** - Beautiful, animated flight paths with real-time position
- 📡 **Live Data** - Auto-updates every 30 seconds using OpenSky Network
- 🌍 **Timezone Aware** - Shows all times in correct local timezones
- 📊 **Accurate Progress** - Real distance-based calculations
- ⏱️ **Time Remaining** - Calculated from current speed and distance
- 🎨 **Modern UI** - Glassmorphism design with smooth animations
- 📱 **Responsive** - Works perfectly on all devices

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) and search for any flight!

## 🔑 API Configuration (Optional)

The app works out-of-the-box with free APIs. For enhanced data, add to `.env.local`:

```env
# Optional: AviationStack for better route metadata
NEXT_PUBLIC_AVIATION_STACK_KEY=your_key_here

# Optional: Amadeus for real-time schedule updates
NEXT_PUBLIC_AMADEUS_API_KEY=your_key_here
NEXT_PUBLIC_AMADEUS_API_SECRET=your_secret_here
```

### Get API Keys:
- **OpenSky Network**: No key needed (free, unlimited)
- **AviationStack**: https://aviationstack.com (100 requests/month free)
- **Amadeus**: https://developers.amadeus.com (unlimited test environment)

## 📖 Usage

1. **Search** for a flight by number (e.g., "BA36", "AA123")
2. **View** live position on the interactive map
3. **Monitor** auto-updates every 30 seconds
4. **Click** the "Refresh Position" button for instant updates
5. **Zoom** using the blue +/- buttons
6. **Explore** by clicking markers for detailed information

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with Turbopack
- **Maps**: React Leaflet with OpenStreetMap
- **Styling**: Tailwind CSS
- **APIs**: 
  - OpenSky Network (live position)
  - AviationStack (route metadata)
  - Amadeus (optional, enhanced schedules)
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main page with search
│   └── layout.tsx            # Root layout
├── components/
│   ├── FlightCard.tsx        # Flight details display
│   ├── FlightMap.tsx         # Interactive map
│   ├── SearchBar.tsx         # Flight search input
│   └── InteractiveBackground.tsx
├── lib/
│   ├── api.ts                # Main API integration
│   ├── opensky.ts            # OpenSky Network API
│   ├── amadeus.ts            # Amadeus API (optional)
│   └── airports.ts           # Airport coordinates & calculations
└── app/globals.css           # Global styles
```

## 🎯 Key Features Explained

### Auto-Refresh System
- Automatically updates flight data every 30 seconds
- Visual indicator (pulsing green dot) shows active updates
- Manual refresh button for instant updates

### Map Visualization
- **Blue solid line**: Distance already traveled
- **Gray dashed line**: Remaining distance (animated)
- **Green marker**: Origin airport
- **Red marker**: Destination airport
- **Blue plane icon**: Current position (rotates with heading)

### Timezone Display
- Shows departure and arrival timezones
- All times displayed in local timezone
- Clear timezone abbreviations (e.g., "IST", "GMT")

### Progress Calculation
- Based on actual great-circle distance
- Updates in real-time as plane moves
- Accounts for current speed and position

## 🔧 Development

```bash
# Run with type checking
npm run build

# Run development server
npm run dev

# Lint code
npm run lint
```

## 📊 Data Sources

1. **OpenSky Network** (Primary)
   - Real-time aircraft positions
   - Speed, altitude, heading
   - 100% free, no API key needed

2. **AviationStack** (Metadata)
   - Airport codes and names
   - Airline information
   - Gate and terminal data

3. **Local Database**
   - Major airport coordinates
   - Fallback for missing API data

## 🌟 Example Flights to Try

- **BA36** - British Airways (Chennai → London)
- **AA123** - American Airlines
- **LH400** - Lufthansa (Frankfurt → New York)
- **UA2** - United Airlines
- **DL1** - Delta Airlines

## 📝 License

MIT License - feel free to use this project for any purpose!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 👨‍💻 Built By

**Devx Group LLC**
- Professional software solutions
- Real-time data visualization
- Modern web applications

---

**Powered by OpenSky Network & Amadeus APIs**

For detailed feature documentation, see [FEATURES.md](./FEATURES.md)
