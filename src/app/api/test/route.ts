import { NextResponse } from 'next/server';
import { getFlightData } from '@/lib/api';

export async function GET() {
    try {
        const data = await getFlightData('WN1918');
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
