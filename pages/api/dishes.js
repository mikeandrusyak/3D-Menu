import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        // Fetch dishes for a specific restaurant
        const { restaurant_id } = req.query;

        if (!restaurant_id) {
          return res.status(400).json({ 
            error: 'restaurant_id query parameter is required' 
          });
        }

        // 1. Отримати всі страви ресторану
        const { data: dishes, error: getError } = await supabase
          .from('dishes')
          .select('*')
          .eq('restaurant_id', restaurant_id)
          .order('created_at', { ascending: false });

        if (getError) {
          console.error('Error fetching dishes:', getError);
          return res.status(500).json({ error: 'Failed to fetch dishes' });
        }

        if (!dishes || dishes.length === 0) {
          return res.status(200).json([]);
        }

        // 2. Отримати всі dish_filters для цих страв
        const dishIds = dishes.map(d => d.id);
        const { data: dishFilters, error: dishFiltersError } = await supabase
          .from('dish_filters')
          .select('dish_id, filter_id')
          .in('dish_id', dishIds);

        if (dishFiltersError) {
          return res.status(500).json({ error: dishFiltersError.message });
        }

        // 3. Додаємо масив filters до кожної страви
        const dishesWithFilters = dishes.map(dish => ({
          ...dish,
          filters: dishFilters
            .filter(df => df.dish_id === dish.id)
            .map(df => df.filter_id),
        }));

        return res.status(200).json(dishesWithFilters);

      case 'POST':
        // Add a new dish to a restaurant
        const { restaurant_id: postRestaurantId, name, description, price, photo_url, model_url } = req.body;

        // Validate required fields
        if (!postRestaurantId || !name || !description || price === undefined) {
          return res.status(400).json({ 
            error: 'Missing required fields: restaurant_id, name, description, price' 
          });
        }

        // Validate price is a number
        if (typeof price !== 'number' || price < 0) {
          return res.status(400).json({ 
            error: 'Price must be a positive number' 
          });
        }

        const { data: newDish, error: postError } = await supabase
          .from('dishes')
          .insert([
            {
              restaurant_id: postRestaurantId,
              name,
              description,
              price,
              photo_url: photo_url || null,
              model_url: model_url || null
            }
          ])
          .select()
          .single();

        if (postError) {
          console.error('Error creating dish:', postError);
          return res.status(500).json({ error: 'Failed to create dish' });
        }

        return res.status(201).json(newDish);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 