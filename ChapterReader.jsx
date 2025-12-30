import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { api } from '../utils/api';
import ImageSlider from '../components/ImageSlider';

export default function ChapterReader({ slug }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.chapter(slug).then(res => {
      setData(res);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  const { navigation } = data;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between mb-4">
        {navigation.prev && (
          <button
            onClick={() => route(`/read/${navigation.prev}`)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            ← Sebelumnya
          </button>
        )}
        <span className="font-bold">{data.title}</span>
        {navigation.next && (
          <button
            onClick={() => route(`/read/${navigation.next}`)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Berikutnya →
          </button>
        )}
      </div>

      <ImageSlider images={data.images} />

      <div className="flex justify-between mt-6">
        {navigation.prev && (
          <button
            onClick={() => route(`/read/${navigation.prev}`)}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium"
          >
            ← Chapter Sebelumnya
          </button>
        )}
        {navigation.next && (
          <button
            onClick={() => route(`/read/${navigation.next}`)}
            className="ml-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
          >
            Chapter Berikutnya →
          </button>
        )}
      </div>
    </div>
  );
}
