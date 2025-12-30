import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

const TYPE_COLORS = {
  manga: 'bg-red-500',
  manhwa: 'bg-blue-500',
  manhua: 'bg-green-500'
};

export default function ComicCard({ comic, onClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="w-32 sm:w-40 flex-shrink-0" onClick={() => onClick(comic.slug)}>
      <div className="relative rounded overflow-hidden shadow-lg">
        {!imgLoaded && <div className="bg-gray-200 w-full h-48 animate-pulse"></div>}
        <img
          src={comic.cover}
          alt={comic.title}
          className={`w-full h-48 object-cover transition-opacity ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />
        <div className={`absolute top-2 right-2 px-1.5 py-0.5 text-xs font-bold text-white rounded ${TYPE_COLORS[comic.type] || 'bg-gray-700'}`}>
          {comic.type}
        </div>
        {comic.chapter && (
          <div className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
            {comic.chapter.replace('Ch.', 'Ch ')}
          </div>
        )}
      </div>
      <p className="mt-2 text-sm line-clamp-2 font-medium text-gray-100">{comic.title}</p>
      {comic.rating && (
        <div className="flex items-center mt-1">
          <span className="text-amber-400 text-xs">★ {comic.rating}</span>
        </div>
      )}
    </div>
  );
}
