import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      },
      { rootMargin: '500px' }
    );

    const imgs = containerRef.current?.querySelectorAll('img');
    imgs?.forEach(img => observer.observe(img));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="space-y-3 pb-20">
      {images.map((url, i) => (
        <img
          key={i}
          data-src={url.trim()}
          alt={`Halaman ${i + 1}`}
          className="w-full rounded-lg shadow-md bg-gray-200 animate-pulse"
          style={{ aspectRatio: '3/4', objectFit: 'contain' }}
          onError={(e) => e.target.style.display = 'none'}
        />
      ))}
    </div>
  );
}
