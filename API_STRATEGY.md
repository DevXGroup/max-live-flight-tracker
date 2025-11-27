# Live Flight Tracker - API Strategy

## Current Situation
- **OpenSky**: Rate limited (429 error) - 400 credits/day for anonymous users
- **Amadeus**: Working, provides schedule data but NO live position
- **Need**: Live position data for map visualization

## Solution: Smart Fallback System

### Priority Order:
1. **Amadeus** (always try first) → Schedule, gates, times
2. **OpenSky** (if available) → Live position
3. **Calculated Position** (fallback) → Interpolate based on schedule

### Implementation:
```typescript
async function getFlightData(flightNumber: string) {
  // 1. Get schedule from Amadeus
  const amadeusData = await getAmadeusSchedule(flightNumber);
  
  // 2. Try to get live position from OpenSky
  let livePosition;
  try {
    livePosition = await getOpenSkyPosition(flightNumber);
  } catch (rateLimitError) {
    // 3. Calculate position from schedule
    livePosition = calculatePositionFromSchedule(amadeusData);
  }
  
  // 4. Merge data
  return {
    ...amadeusData,  // Schedule, gates, times
    ...livePosition  // Lat/long, speed, altitude
  };
}
```

### Benefits:
- ✅ Works even when OpenSky is rate-limited
- ✅ Always shows accurate schedule data
- ✅ Graceful degradation
- ✅ User can still track flights

### Next Steps:
Implement calculated position fallback using:
- Departure time + current time = elapsed time
- Great circle distance between airports
- Average cruising speed (500 knots)
- Interpolate position along route
