import Link from 'next/link';
// ...existing code...

export default function DishCard({ dish, currency, primeColor = '#FF9800' }) {
  console.log(dish);
  console.log('currency:', currency);
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
            <Link
              href={`/restaurant/${dish.restaurant_id}/dish/${dish.id}`}
              className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border-none"
              style={{ backgroundColor: primeColor }}
            >
              View in 3D
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}