import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Link from 'next/link';

export default function DishDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  // Додаємо useEffect для встановлення --vh
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchDish = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/dishes/${id}`);
        if (!response.ok) throw new Error('Failed to fetch dish');
        const data = await response.json();
        setDish(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDish();
  }, [id]);

  useEffect(() => {
    // Додаємо скрипт model-viewer лише на клієнті, якщо його ще немає
    if (typeof window !== 'undefined' && !document.querySelector('script[src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      document.body.appendChild(script);
    }
  }, []);

  const isIOS = () => {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  };
  const isAndroid = () => {
    if (typeof window === 'undefined') return false;
    return /Android/.test(navigator.userAgent);
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-500">Loading...</div>;
  if (error || !dish) return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error || 'Dish not found'}</div>;

  return (
    <div className="flex flex-col items-center justify-center custom-vh bg-black">
      <div className="absolute top-4 left-4">
        <Link href={`/${router.query.restaurant || ''}`}>
          <button className="bg-white text-black px-4 py-2 mt-3 ml-3 rounded shadow hover:bg-gray-200 transition">Menu</button>
        </Link>
      </div>
      {isClient && dish.model_url ? (
        <>
          <model-viewer
            src={dish.model_url}
            alt={dish.name}
            ar
            camera-controls
            auto-rotate
            touch-action="pan-y"
            style={{ width: '100vw', maxWidth: 600, height: '70vh', background: 'transparent', marginTop: '70px'}}
            shadow-intensity="1"
            exposure="1"
            disable-zoom={false}
            interaction-prompt="none"
            poster=""
            background-color="transparent"
          >
          </model-viewer>
          <div className="text-xs text-gray-400 mt-2 text-center">
            Rotate with your finger, use Pinch to zoom<br/>
            For AR - click the right button
          </div>
        </>
      ) : (
        <div className="text-gray-600 text-center p-8">3D model is not available for this dish</div>
      )}
    </div>
  );
} 