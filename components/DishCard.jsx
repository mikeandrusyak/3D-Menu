export default function DishCard({ dish }) {
  return (
    <div className="dish-card">
      <h3>{dish.name}</h3>
      <p>{dish.description}</p>
      <p>Ціна: {dish.price} грн</p>
    </div>
  );
} 