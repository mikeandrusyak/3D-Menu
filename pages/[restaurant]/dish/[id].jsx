import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

export default function DishDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

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

  const isIOS = () => {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  };
  const isAndroid = () => {
    if (typeof window === 'undefined') return false;
    return /Android/.test(navigator.userAgent);
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-500">Завантаження...</div>;
  if (error || !dish) return <div className="flex items-center justify-center min-h-screen text-red-500">Помилка: {error || 'Страва не знайдена'}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <Script src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" strategy="beforeInteractive" />
      {isClient && dish.model_url ? (
        <>
          <model-viewer
            src={dish.model_url}
            alt={dish.name}
            ar
            camera-controls
            auto-rotate
            touch-action="pan-y"
            style={{ width: '100vw', maxWidth: 600, height: '70vh', background: 'transparent' }}
            shadow-intensity="1"
            exposure="1"
            disable-zoom={false}
            interaction-prompt="none"
            poster=""
            background-color="transparent"
            ios-src={dish.model_usdz_url || ''}
          >
            <div className="text-center py-8">
              <p className="text-gray-500">Завантаження 3D-моделі...</p>
            </div>
          </model-viewer>
          <div className="flex gap-2 mt-4">
            {isIOS() && dish.model_usdz_url && (
              <a
                rel="ar"
                href={dish.model_usdz_url}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium shadow transition"
              >
                Переглянути в AR (iOS)
              </a>
            )}
            {isAndroid() && dish.model_url && (
              <a
                href={`intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(dish.model_url)}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(dish.model_url)};end;`}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium shadow transition"
              >
                Переглянути в AR (Android)
              </a>
            )}
          </div>
          <div className="text-xs text-gray-400 mt-2 text-center">
            Обертайте пальцем, використовуйте pinch для zoom<br/>
            Для AR — натисніть відповідну кнопку
          </div>
        </>
      ) : (
        <div className="text-gray-600 text-center p-8">3D-модель недоступна для цієї страви</div>
      )}
    </div>
  );
} 