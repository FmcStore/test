import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { api } from '../utils/api';
import ComicCard from '../components/ComicCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function Home() {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.latest().then(({ list }) => {
      setLatest(list);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {/* Latest */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="bg-blue-600 w-2 h-6 rounded mr-2"></span>
          Komik Terbaru
        </h2>
        {loading ? (
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {[...Array(10)].map((_, i) => <LoadingSkeleton key={i} />)}
          </div>
        ) : (
          <div className="flex space-x-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
            {latest.map(comic => (
              <ComicCard key={comic.slug} comic={comic} onClick={(slug) => location.href = `/comic/${slug}`} />
            ))}
          </div>
        )}
      </section>

      {/* Populer — dummy sementara */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="bg-amber-600 w-2 h-6 rounded mr-2"></span>
          Populer Minggu Ini
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {latest.slice(0, 10).map(comic => (
            <ComicCard key={comic.slug} comic={comic} onClick={(slug) => location.href = `/comic/${slug}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
