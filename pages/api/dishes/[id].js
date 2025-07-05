import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Dish ID is required' });
  }

  try {
    switch (method) {
      case 'GET':
        // Get dish by ID
        const { data: dish, error: getError } = await supabase
          .from('dishes')
          .select('*')
          .eq('id', id)
          .single();

        if (getError) {
          if (getError.code === 'PGRST116') {
            return res.status(404).json({ error: 'Dish not found' });
          }
          console.error('Error fetching dish:', getError);
          return res.status(500).json({ error: 'Failed to fetch dish' });
        }

        return res.status(200).json(dish);

      case 'PUT':
        // Update dish
        const { restaurant_id, name, description, price, photo_url, model_url } = req.body;

        // Validate that at least one field is provided
        if (!restaurant_id && !name && !description && price === undefined && 
            photo_url === undefined && model_url === undefined) {
          return res.status(400).json({ 
            error: 'At least one field must be provided for update' 
          });
        }

        // Validate price if provided
        if (price !== undefined && (typeof price !== 'number' || price < 0)) {
          return res.status(400).json({ 
            error: 'Price must be a positive number' 
          });
        }

        const updateData = {};
        if (restaurant_id !== undefined) updateData.restaurant_id = restaurant_id;
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (price !== undefined) updateData.price = price;
        if (photo_url !== undefined) updateData.photo_url = photo_url;
        if (model_url !== undefined) updateData.model_url = model_url;

        const { data: updatedDish, error: putError } = await supabase
          .from('dishes')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        if (putError) {
          if (putError.code === 'PGRST116') {
            return res.status(404).json({ error: 'Dish not found' });
          }
          console.error('Error updating dish:', putError);
          return res.status(500).json({ error: 'Failed to update dish' });
        }

        return res.status(200).json(updatedDish);

      case 'DELETE':
        // Delete dish
        const { error: deleteError } = await supabase
          .from('dishes')
          .delete()
          .eq('id', id);

        if (deleteError) {
          console.error('Error deleting dish:', deleteError);
          return res.status(500).json({ error: 'Failed to delete dish' });
        }

        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 