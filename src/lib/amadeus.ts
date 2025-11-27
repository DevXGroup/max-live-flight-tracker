// Amadeus Flight Status API integration
// Documentation: https://developers.amadeus.com/self-service/category/air/api-doc/on-demand-flight-status

const AMADEUS_API_KEY = process.env.NEXT_PUBLIC_AMADEUS_API_KEY || '';
const AMADEUS_API_SECRET = process.env.NEXT_PUBLIC_AMADEUS_API_SECRET || '';

interface AmadeusTokenResponse {
    access_token: string;
    expires_in: number;
}

interface AmadeusFlightResponse {
    data: Array<{
        type: string;
        id: string;
        flightDesignator: {
            carrierCode: string;
            flightNumber: string;
        };
        scheduledDepartureDate: string;
        flightPoints: Array<{
            iataCode: string;
            departure?: {
                timings: Array<{
                    qualifier: string;
                    value: string;
                }>;
                terminal?: {
                    code: string;
                };
                gate?: {
                    mainGate: string;
                };
            };
            arrival?: {
                timings: Array<{
                    qualifier: string;
                    value: string;
                }>;
                terminal?: {
                    code: string;
                };
                gate?: {
                    mainGate: string;
                };
            };
        }>;
        segments: Array<{
            boardPointIataCode: string;
            offPointIataCode: string;
            scheduledSegmentDuration: string;
            partnership?: {
                operatingFlight?: {
                    carrierCode: string;
                    flightNumber: string;
                };
            };
        }>;
    }>;
}

// Cache for access token
let cachedToken: { token: string; expiresAt: number } | null = null;
// Cache for airport names
const airportNameCache: Record<string, string> = {};

async function getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (cachedToken && Date.now() < cachedToken.expiresAt) {
        return cachedToken.token;
    }

    if (!AMADEUS_API_KEY || !AMADEUS_API_SECRET) {
        throw new Error('Amadeus API credentials not configured');
    }

    try {
        const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: AMADEUS_API_KEY,
                client_secret: AMADEUS_API_SECRET,
            }),
        });

        if (!response.ok) {
            throw new Error(`Amadeus auth failed: ${response.status}`);
        }

        const data: AmadeusTokenResponse = await response.json();

        // Cache token (expires in 30 minutes, we'll refresh 5 min early)
        cachedToken = {
            token: data.access_token,
            expiresAt: Date.now() + (data.expires_in - 300) * 1000,
        };

        return data.access_token;
    } catch (error) {
        console.error('Amadeus authentication error:', error);
        throw error;
    }
}

export async function getFlightStatusFromAmadeus(
    carrierCode: string,
    flightNumber: string,
    scheduledDepartureDate: string
) {
    try {
        const token = await getAccessToken();

        const url = new URL('https://test.api.amadeus.com/v2/schedule/flights');
        url.searchParams.append('carrierCode', carrierCode);
        url.searchParams.append('flightNumber', flightNumber);
        url.searchParams.append('scheduledDepartureDate', scheduledDepartureDate);

        console.log('📡 Calling Amadeus API:', url.toString().replace(token, 'HIDDEN'));

        const response = await fetch(url.toString(), {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error('Amadeus API error:', response.status);
            return null;
        }

        const data: AmadeusFlightResponse = await response.json();

        if (!data.data || data.data.length === 0) {
            console.log('❌ No flight found in Amadeus');
            return null;
        }

        const flight = data.data[0];
        const departure = flight.flightPoints[0];
        const arrival = flight.flightPoints[1];

        // Extract times
        const getTime = (timings: Array<{ qualifier: string; value: string }>, qualifier: string) => {
            const timing = timings?.find(t => t.qualifier === qualifier);
            return timing?.value || null;
        };

        console.log('🔍 Amadeus Raw Data for', flight.flightDesignator.carrierCode, flight.flightDesignator.flightNumber);
        console.log('  Departure Timings:', JSON.stringify(departure.departure?.timings));
        console.log('  Arrival Timings:', JSON.stringify(arrival.arrival?.timings));

        return {
            carrierCode: flight.flightDesignator.carrierCode,
            flightNumber: flight.flightDesignator.flightNumber,
            scheduledDepartureDate: flight.scheduledDepartureDate,
            departure: {
                iataCode: departure.iataCode,
                scheduledTime: getTime(departure.departure?.timings || [], 'STD'),
                estimatedTime: getTime(departure.departure?.timings || [], 'ETD'),
                actualTime: getTime(departure.departure?.timings || [], 'ATD'),
                terminal: departure.departure?.terminal?.code || null,
                gate: departure.departure?.gate?.mainGate || null,
            },
            arrival: {
                iataCode: arrival.iataCode,
                scheduledTime: getTime(arrival.arrival?.timings || [], 'STA'),
                estimatedTime: getTime(arrival.arrival?.timings || [], 'ETA'),
                actualTime: getTime(arrival.arrival?.timings || [], 'ATA'),
                terminal: arrival.arrival?.terminal?.code || null,
                gate: arrival.arrival?.gate?.mainGate || null,
            },
        };
    } catch (error) {
        console.error('Amadeus API error:', error);
        return null;
    }
}

export async function getAirportName(iataCode: string): Promise<string | null> {
    if (!iataCode) return null;

    // Check cache first
    if (airportNameCache[iataCode]) {
        return airportNameCache[iataCode];
    }

    try {
        const token = await getAccessToken();
        const url = new URL('https://test.api.amadeus.com/v1/reference-data/locations');
        url.searchParams.append('subType', 'AIRPORT');
        url.searchParams.append('keyword', iataCode);
        url.searchParams.append('page[limit]', '1');

        const response = await fetch(url.toString(), {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) return null;

        const data = await response.json();
        if (data.data && data.data.length > 0) {
            // Prefer detailed name or name
            const airport = data.data[0];
            // Format: "HEATHROW" or "LONDON HEATHROW"
            const name = toTitleCase(airport.name || airport.detailedName || iataCode);
            airportNameCache[iataCode] = name;
            return name;
        }
        return null;
    } catch (e) {
        console.error('Error fetching airport name:', e);
        return null;
    }
}

function toTitleCase(str: string) {
    return str.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

// Helper to extract carrier code and flight number from a flight number string
export function parseFlightNumber(flightNumber: string): { carrierCode: string; flightNum: string } | null {
    // Match both 2-letter (IATA) and 3-letter (ICAO) codes
    // Examples: BA36, UPS56, BAW36
    const match = flightNumber.match(/^([A-Z]{2,3})(\d+)$/i);
    if (!match) return null;

    return {
        carrierCode: match[1].toUpperCase(),
        flightNum: match[2],
    };
}
