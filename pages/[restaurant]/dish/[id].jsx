import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';

export default function DishDetail() {
  const router = useRouter();
  const { restaurant, id } = router.query;
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDish = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/dishes/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch dish');
        }
        
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

  if (loading) {
    return (
      <Layout>
        <div className="max-w-screen-sm mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-screen-sm mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Dish Details</h1>
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!dish) {
    return (
      <Layout>
        <div className="max-w-screen-sm mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Dish Not Found</h1>
            <p className="text-gray-600">The dish you're looking for doesn't exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href={`/${restaurant}`}
          className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Menu
        </Link>

        {/* Dish Image */}
        <div className="mb-6">
          <img
            src={dish.photo_url || '/placeholder-dish.jpg'}
            alt={dish.name}
            className="w-full h-64 object-cover rounded-xl shadow-lg"
            onError={(e) => {
              e.target.src = '/placeholder-dish.jpg';
            }}
          />
        </div>

        {/* Dish Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{dish.name}</h1>
          <p className="text-gray-600 text-lg mb-4">{dish.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-green-600">
              ${dish.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* 3D Model Viewer */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">3D View</h2>
          {dish.model_url ? (
            <div className="bg-gray-100 rounded-xl p-4">
              <model-viewer
                src={dish.model_url}
                alt={`3D model of ${dish.name}`}
                camera-controls
                auto-rotate
                style={{
                  width: '100%',
                  height: '300px',
                  borderRadius: '0.75rem'
                }}
              >
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading 3D model...</p>
                </div>
              </model-viewer>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-xl p-8 text-center">
              <div className="text-gray-400 text-4xl mb-4">🎲</div>
              <p className="text-gray-600">3D model not available for this dish</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 