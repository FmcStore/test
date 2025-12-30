import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        route(`/search?q=${encodeURIComponent(query)}`);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Cari komik..."
        value={query}
        onInput={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
}
