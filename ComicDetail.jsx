import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { api } from '../utils/api';
import LoadingSkeleton from '../components/LoadingSkeleton';
import GenreBadge from '../components/GenreBadge';

export default function ComicDetail({ slug }) {
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.detail(slug).then(data => {
      setComic(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <LoadingSkeleton type="detail" />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <img
          src={comic.cover}
          alt={comic.title}
          className="w-48 h-64 object-cover rounded shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{comic.title}</h1>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-2 py-1 rounded text-xs font-bold ${
              comic.type === 'manga' ? 'bg-red-500' :
              comic.type === 'manhwa' ? 'bg-blue-500' : 'bg-green-500'
            } text-white`}>
              {comic.type}
            </span>
            <span className="px-2 py-1 bg-amber-500 text-black text-xs font-bold">★ {comic.rating}</span>
            <span className="px-2 py-1 bg-gray-700 text-xs">{comic.status}</span>
          </div>
          <p className="text-gray-400 mb-4">{comic.synopsis}</p>
          <div>
            <strong>Genre:</strong>
            <div className="mt-1 flex flex-wrap gap-1">
              {comic.genres.map(g => <GenreBadge key={g.slug} title={g.title} />)}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6">
        <h2 className="text-xl font-bold mb-4">Daftar Chapter ({comic.chapters.length})</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
          {comic.chapters.map((ch, i) => (
            <button
              key={ch.slug}
              onClick={() => route(`/read/${ch.slug}`)}
              className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded flex justify-between items-center"
            >
              <span>Chapter {comic.chapters.length - i}</span>
              <span className="text-gray-500 text-sm">{ch.date}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
