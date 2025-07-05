import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import DishCard from '../../components/DishCard';

export default function RestaurantMenu() {
  const router = useRouter();
  const { restaurant } = router.query;
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantName, setRestaurantName] = useState('');

  useEffect(() => {
    if (!restaurant) return;

    const fetchDishesBySlug = async () => {
      try {
        setLoading(true);
        // 1. Get restaurant by slug
        const res = await fetch(`/api/restaurants?slug=${encodeURIComponent(restaurant)}`);
        if (!res.ok) throw new Error('Restaurant not found');
        const rest = await res.json();
        if (!rest || !rest.id) throw new Error('Restaurant not found');
        setRestaurantName(rest.name);
        // 2. Get dishes by restaurant_id
        const dishesRes = await fetch(`/api/dishes?restaurant_id=${rest.id}`);
        if (!dishesRes.ok) throw new Error('Failed to fetch dishes');
        const dishesData = await dishesRes.json();
        setDishes(dishesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDishesBySlug();
  }, [restaurant]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-screen-sm mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-32 rounded-xl"></div>
              ))}
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Restaurant Menu</h1>
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurantName || 'Restaurant Menu'}</h1>
          <p className="text-gray-600">Discover our delicious dishes</p>
        </div>

        {dishes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No dishes found</h2>
            <p className="text-gray-600">This restaurant doesn't have any dishes yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {dishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
} 