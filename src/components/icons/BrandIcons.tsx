import React from 'react';

export const AirplaneIcon = ({ className, size = 24 }: { className?: string; size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Modern airplane silhouette */}
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
);

export const DevxLogo = ({ className, size = 120 }: { className?: string; size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Modern tech logo for Devx Group */}
        <circle cx="100" cy="100" r="90" fill="url(#devx-gradient)" />
        <defs>
            <linearGradient id="devx-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
        </defs>
        {/* DX letters */}
        <text x="100" y="120" fontSize="60" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="sans-serif">
            DX
        </text>
    </svg>
);
