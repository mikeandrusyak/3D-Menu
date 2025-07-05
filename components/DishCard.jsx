import Link from 'next/link';

export default function DishCard({ dish }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 transition-transform hover:scale-105 active:scale-95">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={dish.photo_url || '/placeholder-dish.jpg'}
            alt={dish.name}
            className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = '/placeholder-dish.jpg';
            }}
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
              ${dish.price.toFixed(2)}
            </span>
            <Link
              href={`/restaurant/${dish.restaurant_id}/dish/${dish.id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              View in 3D
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 