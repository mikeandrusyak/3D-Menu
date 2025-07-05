import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Restaurant ID is required' });
  }

  try {
    switch (method) {
      case 'GET':
        // Get restaurant by ID with all related dishes
        const { data: restaurant, error: getError } = await supabase
          .from('restaurants')
          .select(`
            *,
            dishes (*)
          `)
          .eq('id', id)
          .single();

        if (getError) {
          if (getError.code === 'PGRST116') {
            return res.status(404).json({ error: 'Restaurant not found' });
          }
          console.error('Error fetching restaurant:', getError);
          return res.status(500).json({ error: 'Failed to fetch restaurant' });
        }

        return res.status(200).json(restaurant);

      case 'PUT':
        // Update restaurant
        const { name, description, address, logo_url } = req.body;

        // Validate that at least one field is provided
        if (!name && !description && !address && logo_url === undefined) {
          return res.status(400).json({ 
            error: 'At least one field must be provided for update' 
          });
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (address !== undefined) updateData.address = address;
        if (logo_url !== undefined) updateData.logo_url = logo_url;

        const { data: updatedRestaurant, error: putError } = await supabase
          .from('restaurants')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        if (putError) {
          if (putError.code === 'PGRST116') {
            return res.status(404).json({ error: 'Restaurant not found' });
          }
          console.error('Error updating restaurant:', putError);
          return res.status(500).json({ error: 'Failed to update restaurant' });
        }

        return res.status(200).json(updatedRestaurant);

      case 'DELETE':
        // Delete restaurant
        const { error: deleteError } = await supabase
          .from('restaurants')
          .delete()
          .eq('id', id);

        if (deleteError) {
          console.error('Error deleting restaurant:', deleteError);
          return res.status(500).json({ error: 'Failed to delete restaurant' });
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