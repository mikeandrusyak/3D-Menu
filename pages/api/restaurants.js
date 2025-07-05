import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        // Support search by slug: /api/restaurants?slug=...
        const { slug, name } = req.query;
        if (slug) {
          const { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .eq('slug', slug)
            .limit(1)
            .single();
          if (error) {
            return res.status(404).json({ error: 'Restaurant not found' });
          }
          return res.status(200).json(data);
        }
        if (name) {
          const { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .eq('name', name);
          if (error) {
            return res.status(404).json({ error: 'Restaurant not found' });
          }
          return res.status(200).json(data);
        }
        // Fetch all restaurants, sorted by created_at descending
        const { data: restaurants, error: getError } = await supabase
          .from('restaurants')
          .select('*')
          .order('created_at', { ascending: false });
        if (getError) {
          console.error('Error fetching restaurants:', getError);
          return res.status(500).json({ error: 'Failed to fetch restaurants' });
        }
        return res.status(200).json(restaurants);
      }
      case 'POST': {
        // Add a new restaurant with slug
        const { name, description, address, logo_url, slug } = req.body;
        if (!name || !description || !address || !slug) {
          return res.status(400).json({
            error: 'Missing required fields: name, description, address, slug'
          });
        }
        // Check slug uniqueness
        const { data: existing, error: slugError } = await supabase
          .from('restaurants')
          .select('id')
          .eq('slug', slug)
          .maybeSingle();
        if (slugError) {
          return res.status(500).json({ error: 'Failed to check slug uniqueness' });
        }
        if (existing) {
          return res.status(409).json({ error: 'Slug already exists' });
        }
        const { data: newRestaurant, error: postError } = await supabase
          .from('restaurants')
          .insert([
            {
              name,
              description,
              address,
              logo_url: logo_url || null,
              slug
            }
          ])
          .select()
          .single();
        if (postError) {
          console.error('Error creating restaurant:', postError);
          return res.status(500).json({ error: 'Failed to create restaurant' });
        }
        return res.status(201).json(newRestaurant);
      }
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 