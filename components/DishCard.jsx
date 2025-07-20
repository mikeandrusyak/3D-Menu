import { useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
// ...existing code...

export default function DishCard({ dish, currency, primeColor = '#FF9800', restaurantSlug }) {
  const [show3DModal, setShow3DModal] = useState(false);

  // Визначаємо платформу та підтримку AR
  const isIOS = () => {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  };
  const isAndroid = () => {
    if (typeof window === 'undefined') return false;
    return /Android/.test(navigator.userAgent);
  };
  const supportsARQuickLook = () => {
    // Safari на iOS підтримує Quick Look через <a rel="ar">
    return isIOS();
  };
  const supportsSceneViewer = () => {
    // Android Chrome підтримує Scene Viewer
    return isAndroid();
  };

  const handleARClick = (e) => {
    if (supportsARQuickLook() && dish.model_usdz_url) {
      // Quick Look для iOS
      const a = document.createElement('a');
      a.setAttribute('rel', 'ar');
      a.setAttribute('href', dish.model_usdz_url);
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    if (supportsSceneViewer() && dish.model_url) {
      // Scene Viewer для Android
      const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(dish.model_url)}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(dish.model_url)};end;`;
      window.location.href = intentUrl;
      return;
    }
    // Fallback: відкриваємо 3D-модель у модалці
    setShow3DModal(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 transition-transform hover:scale-105 active:scale-95">
      <div className="flex flex-col sm:flex-row gap-4">
        
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={dish.photo_url || "/placeholder-dish.jpg"}
            alt={dish.name}
            width={96}
            height={96}
            className="w-auto max-w-full h-auto sm:w-32 sm:h-32 object-contain rounded-lg"
          />
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
            {dish.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-2">
            {dish.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-green-600 text-lg">
              {dish.price.toFixed(2)} {currency ? currency : ''}
            </span>
            <button
              type="button"
              className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border-none"
              style={{ backgroundColor: primeColor }}
              onClick={handleARClick}
            >
              Переглянути в 3D
            </button>
          </div>
        </div>
      </div>
      {/* Модальне вікно для 3D-моделі */}
      {show3DModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          style={{ backdropFilter: 'blur(2px)' }}
        >
          <div className="relative bg-transparent rounded-xl shadow-lg flex flex-col items-center p-0 max-w-full w-[90vw] h-[80vh]">
            <button
              className="absolute top-2 right-2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold shadow"
              onClick={() => setShow3DModal(false)}
            >
              Закрити
            </button>
            {/* Підключаємо model-viewer тільки на клієнті */}
            <Script
              src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
              strategy="beforeInteractive"
            />
            <model-viewer
              src={dish.model_url}
              alt={dish.name}
              ar
              camera-controls
              touch-action="pan-y"
              style={{ width: '100%', height: '100%', background: 'transparent' }}
              exposure="1"
              shadow-intensity="1"
              auto-rotate
              disable-zoom={false}
              interaction-prompt="none"
              poster=""
              background-color="transparent"
            ></model-viewer>
          </div>
        </div>
      )}
    </div>
  );
}