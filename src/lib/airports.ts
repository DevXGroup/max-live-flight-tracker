// Airport coordinates database for accurate positioning
export const AIRPORT_COORDS: Record<string, { lat: number; lng: number; name: string }> = {
    // Major US Airports
    'JFK': { lat: 40.6413, lng: -73.7781, name: 'John F. Kennedy International' },
    'LAX': { lat: 33.9416, lng: -118.4085, name: 'Los Angeles International' },
    'ORD': { lat: 41.9742, lng: -87.9073, name: "O'Hare International" },
    'DFW': { lat: 32.8998, lng: -97.0403, name: 'Dallas/Fort Worth International' },
    'ATL': { lat: 33.6407, lng: -84.4277, name: 'Hartsfield-Jackson Atlanta' },
    'MIA': { lat: 25.7959, lng: -80.2870, name: 'Miami International' },

    'SFO': { lat: 37.6213, lng: -122.3790, name: 'San Francisco International' },
    'EWR': { lat: 40.6895, lng: -74.1745, name: 'Newark Liberty International' },
    'DAL': { lat: 32.8471, lng: -96.8518, name: 'Dallas Love Field' },
    'HOU': { lat: 29.6454, lng: -95.2788, name: 'William P. Hobby' },
    'DEL': { lat: 28.5562, lng: 77.1000, name: 'Indira Gandhi International' },
    'BOM': { lat: 19.0896, lng: 72.8656, name: 'Chhatrapati Shivaji Maharaj International' },
    'SEA': { lat: 47.4502, lng: -122.3088, name: 'Seattle-Tacoma International' },
    'LAS': { lat: 36.0840, lng: -115.1537, name: 'Harry Reid International' },
    'BOS': { lat: 42.3656, lng: -71.0096, name: 'Boston Logan International' },

    // European Airports
    'LHR': { lat: 51.4700, lng: -0.4543, name: 'London Heathrow' },
    'CDG': { lat: 49.0097, lng: 2.5479, name: 'Paris Charles de Gaulle' },
    'FRA': { lat: 50.0379, lng: 8.5622, name: 'Frankfurt Airport' },
    'AMS': { lat: 52.3105, lng: 4.7683, name: 'Amsterdam Schiphol' },
    'MAD': { lat: 40.4983, lng: -3.5676, name: 'Madrid-Barajas' },
    'FCO': { lat: 41.8003, lng: 12.2389, name: 'Rome Fiumicino' },
    'IST': { lat: 41.2753, lng: 28.7519, name: 'Istanbul Airport' },
    'ZRH': { lat: 47.4647, lng: 8.5492, name: 'Zurich Airport' },

    // Asian Airports
    'HND': { lat: 35.5494, lng: 139.7798, name: 'Tokyo Haneda' },
    'NRT': { lat: 35.7720, lng: 140.3929, name: 'Tokyo Narita' },
    'ICN': { lat: 37.4602, lng: 126.4407, name: 'Seoul Incheon' },
    'PEK': { lat: 40.0799, lng: 116.6031, name: 'Beijing Capital' },
    'PVG': { lat: 31.1443, lng: 121.8083, name: 'Shanghai Pudong' },
    'HKG': { lat: 22.3080, lng: 113.9185, name: 'Hong Kong International' },
    'SIN': { lat: 1.3644, lng: 103.9915, name: 'Singapore Changi' },
    'BKK': { lat: 13.6900, lng: 100.7501, name: 'Bangkok Suvarnabhumi' },
    'DXB': { lat: 25.2532, lng: 55.3657, name: 'Dubai International' },
    'KUL': { lat: 2.7456, lng: 101.7072, name: 'Kuala Lumpur International' },

    // South American Airports
    'GRU': { lat: -23.4356, lng: -46.4731, name: 'São Paulo Guarulhos' },
    'GIG': { lat: -22.8089, lng: -43.2436, name: 'Rio de Janeiro Galeão' },
    'EZE': { lat: -34.8222, lng: -58.5358, name: 'Buenos Aires Ezeiza' },
    'BOG': { lat: 4.7016, lng: -74.1469, name: 'Bogotá El Dorado' },
    'LIM': { lat: -12.0219, lng: -77.1143, name: 'Lima Jorge Chávez' },

    // Oceania Airports
    'SYD': { lat: -33.9399, lng: 151.1753, name: 'Sydney Kingsford Smith' },
    'MEL': { lat: -37.6690, lng: 144.8410, name: 'Melbourne Airport' },
    'AKL': { lat: -37.0082, lng: 174.7850, name: 'Auckland Airport' },

    // African Airports
    'JNB': { lat: -26.1392, lng: 28.2460, name: 'Johannesburg OR Tambo' },
    'CAI': { lat: 30.1219, lng: 31.4056, name: 'Cairo International' },

    // Middle East
    'DOH': { lat: 25.2731, lng: 51.6080, name: 'Doha Hamad International' },
    'AUH': { lat: 24.4330, lng: 54.6511, name: 'Abu Dhabi International' },

    // Additional Asian


    // Southeast Asia
    'MNL': { lat: 14.5086, lng: 121.0194, name: 'Manila Ninoy Aquino' },
    'CGK': { lat: -6.1256, lng: 106.6559, name: 'Jakarta Soekarno-Hatta' },
    'CEB': { lat: 10.3075, lng: 123.9790, name: 'Mactan-Cebu International' },
};

// Calculate great circle distance between two points (in km)
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Calculate bearing (heading) between two points
export function calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const dLon = toRad(lon2 - lon1);
    const y = Math.sin(dLon) * Math.cos(toRad(lat2));
    const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
        Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
    const bearing = Math.atan2(y, x);
    return (toDeg(bearing) + 360) % 360;
}

// Interpolate position along great circle route
export function interpolatePosition(
    lat1: number, lon1: number,
    lat2: number, lon2: number,
    fraction: number
): { lat: number; lng: number } {
    const φ1 = toRad(lat1);
    const λ1 = toRad(lon1);
    const φ2 = toRad(lat2);
    const λ2 = toRad(lon2);

    const d = 2 * Math.asin(Math.sqrt(
        Math.pow(Math.sin((φ1 - φ2) / 2), 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.pow(Math.sin((λ1 - λ2) / 2), 2)
    ));

    const a = Math.sin((1 - fraction) * d) / Math.sin(d);
    const b = Math.sin(fraction * d) / Math.sin(d);

    const x = a * Math.cos(φ1) * Math.cos(λ1) + b * Math.cos(φ2) * Math.cos(λ2);
    const y = a * Math.cos(φ1) * Math.sin(λ1) + b * Math.cos(φ2) * Math.sin(λ2);
    const z = a * Math.sin(φ1) + b * Math.sin(φ2);

    const φ3 = Math.atan2(z, Math.sqrt(x * x + y * y));
    const λ3 = Math.atan2(y, x);

    return {
        lat: toDeg(φ3),
        lng: toDeg(λ3)
    };
}

function toRad(degrees: number): number {
    return degrees * Math.PI / 180;
}

function toDeg(radians: number): number {
    return radians * 180 / Math.PI;
}

// Get airport coordinates by IATA code
export function getAirportCoords(iataCode: string): { lat: number; lng: number; name: string } | null {
    return AIRPORT_COORDS[iataCode] || null;
}
