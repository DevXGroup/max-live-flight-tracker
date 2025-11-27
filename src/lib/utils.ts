import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const AIRLINE_CODES: Record<string, string> = {
    'AA': 'American Airlines',
    'AC': 'Air Canada',
    'AF': 'Air France',
    'AI': 'Air India',
    'AM': 'Aeromexico',
    'AS': 'Alaska Airlines',
    'AY': 'Finnair',
    'AZ': 'ITA Airways',
    'BA': 'British Airways',
    'B6': 'JetBlue',
    'BR': 'EVA Air',
    'CA': 'Air China',
    'CI': 'China Airlines',
    'CX': 'Cathay Pacific',
    'CZ': 'China Southern',
    'DL': 'Delta Air Lines',
    'EK': 'Emirates',
    'EY': 'Etihad Airways',
    'F9': 'Frontier Airlines',
    'IB': 'Iberia',
    'JL': 'Japan Airlines',
    'KE': 'Korean Air',
    'KL': 'KLM',
    'LH': 'Lufthansa',
    'LX': 'Swiss International Air Lines',
    'MU': 'China Eastern',
    'NH': 'All Nippon Airways',
    'NK': 'Spirit Airlines',
    'NZ': 'Air New Zealand',
    'OS': 'Austrian Airlines',
    'OZ': 'Asiana Airlines',
    'QF': 'Qantas',
    'QR': 'Qatar Airways',
    'SK': 'SAS',
    'SQ': 'Singapore Airlines',
    'SU': 'Aeroflot',
    'TK': 'Turkish Airlines',
    'UA': 'United Airlines',
    'VS': 'Virgin Atlantic',
    'WN': 'Southwest Airlines',
    'WS': 'WestJet',
};

export function getAirlineName(code: string): string {
    return AIRLINE_CODES[code.toUpperCase()] || code;
}
