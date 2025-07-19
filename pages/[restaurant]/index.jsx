import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import DishCard from '../../components/DishCard';
import Image from 'next/image';

export default function RestaurantMenu() {
  const router = useRouter();
  const { restaurant } = router.query;
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantPhoto, setRestaurantPhoto] = useState('');
  const [currency, setCurrency] = useState('');
  const [filters, setFilters] = useState([]); // список фільтрів
  const [selectedFilters, setSelectedFilters] = useState([]); // id вибраних фільтрів
  const filterRefs = useRef({});

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
        setRestaurantPhoto(rest.restaurant_photo);
        setCurrency(rest.currency);
        // 2. Get dishes by restaurant_id
        const dishesRes = await fetch(`/api/dishes?restaurant_id=${rest.id}`);
        if (!dishesRes.ok) throw new Error('Failed to fetch dishes');
        const dishesData = await dishesRes.json();
        setDishes(dishesData);
        // 3. Get filters for this restaurant
        const filtersRes = await fetch(`/api/filters?restaurant_id=${rest.id}`);
        if (filtersRes.ok) {
          const filtersData = await filtersRes.json();
          setFilters(filtersData);
        } else {
          setFilters([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDishesBySlug();
  }, [restaurant]);

  // Фільтрація страв за вибраними фільтрами
  const filteredDishes = selectedFilters.length === 0
    ? dishes
    : dishes.filter(dish => {
        if (!dish.filters || !Array.isArray(dish.filters)) return false;
        // Має містити всі вибрані фільтри
        return selectedFilters.every(fId => dish.filters.includes(fId));
      });

  // Обробка вибору фільтра
  const toggleFilter = (filterId) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
    // scrollIntoView для кнопки
    if (filterRefs.current[filterId]) {
      filterRefs.current[filterId].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

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
      <div className="max-w-screen-sm mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl text-center font-bold text-gray-900 m-2">{restaurantName || 'Restaurant Menu'}</h1>
          {/* Hero Image */}
          <div className="w-full h-auto overflow-hidden mb-4">
            <Image src={restaurantPhoto || "/hero-restaurant.jpg"} alt="Restaurant photo" width={400} height={200} className="w-full object-cover" />
          </div>
        </div>

        {/* UI фільтрів */}
        {filters.length > 0 && (
          <div className="sticky top-0 z-10 bg-white shadow-sm mb-6 -mx-4 px-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-none py-2 whitespace-nowrap">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  ref={el => filterRefs.current[filter.id] = el}
                  className={`px-4 py-2 rounded-full border font-medium transition-colors text-sm whitespace-nowrap
                    ${selectedFilters.includes(filter.id)
                      ? 'bg-orange-100 text-brand-orange border-brand-orange'
                      : 'bg-white text-brand-orange border-brand-orange hover:bg-brand-orange hover:text-white'}`}
                  onClick={() => toggleFilter(filter.id)}
                  type="button"
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {filteredDishes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No dishes found</h2>
            <p className="text-gray-600">This restaurant doesn't have any dishes yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} currency={currency} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}