'use client';

import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
    onSearch: (flightNumber: string) => void;
    isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative z-10">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter Flight Number (e.g., AA123)"
                        className="w-full bg-transparent text-white px-6 py-4 outline-none placeholder:text-slate-500 font-medium tracking-wide"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-blue-400 transition-colors border-l border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={24} />
                        ) : (
                            <Search size={24} />
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
